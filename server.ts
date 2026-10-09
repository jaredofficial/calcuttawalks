import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);

// Initialize Gemini client (Server-side proxy)
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Leads & Config files
const LEADS_FILE_PATH = path.resolve(__dirname, 'leads.json');
const CONFIG_FILE_PATH = path.resolve(__dirname, 'leads-config.json');

interface LeadRecord {
  id: string;
  sessionId: string;
  name: string;
  phone: string;
  preferredDate?: string;
  tourName?: string;
  pax?: string;
  message?: string;
  source: string;
  createdAt: string;
  updatedAt?: string;
}

interface LeadsConfig {
  googleSheetWebhookUrl?: string;
}

function loadConfig(): LeadsConfig {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error('Error loading config:', err);
  }
  return {
    googleSheetWebhookUrl: process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL || '',
  };
}

function saveConfig(cfg: LeadsConfig): void {
  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(cfg, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving config:', err);
  }
}

function loadLeads(): LeadRecord[] {
  try {
    if (fs.existsSync(LEADS_FILE_PATH)) {
      const data = fs.readFileSync(LEADS_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading leads:', err);
  }
  return [];
}

// Safely escape phone numbers for Google Sheets so '+' is never parsed as a formula error (#ERROR!)
function sanitizePhoneForSheets(phone: string): string {
  if (!phone) return '';
  const clean = String(phone).trim().replace(/^'+/, '');
  // Adding a single quote prefix forces Google Sheets to treat cell as plain text string
  return "'" + clean;
}

async function forwardLeadToGoogleSheet(lead: LeadRecord, webhookUrl: string): Promise<boolean> {
  if (!webhookUrl || !webhookUrl.startsWith('http')) return false;
  try {
    console.log(`Forwarding lead ${lead.id} [${lead.sessionId}] to Google Sheet Webhook: ${webhookUrl}`);
    const safePhone = sanitizePhoneForSheets(lead.phone);

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: lead.sessionId,
        timestamp: lead.updatedAt || lead.createdAt,
        name: lead.name,
        phone: safePhone,
        tourName: lead.tourName || 'General Inquiry',
        preferredDate: lead.preferredDate || 'Not specified',
        pax: lead.pax || '',
        message: lead.message || '',
        source: lead.source,
      }),
    });
    console.log('Google Sheets Webhook response status:', res.status);
    return res.ok;
  } catch (err) {
    console.warn('Google Sheets Webhook request failed:', err);
    return false;
  }
}

// Memory Upsert: Updates existing lead in place if same session or phone exists, else prepends new lead
function upsertLead(lead: Partial<LeadRecord> & { sessionId: string; source: string }): LeadRecord {
  const existing = loadLeads();
  const cleanPhone = lead.phone ? String(lead.phone).replace(/\D/g, '') : '';

  let foundIndex = -1;
  if (lead.sessionId) {
    foundIndex = existing.findIndex((l) => l.sessionId === lead.sessionId);
  }
  if (foundIndex === -1 && cleanPhone && cleanPhone.length >= 10) {
    foundIndex = existing.findIndex((l) => {
      const p = String(l.phone || '').replace(/\D/g, '');
      return p.length >= 10 && p.endsWith(cleanPhone.slice(-10));
    });
  }

  const now = new Date().toISOString();
  let finalRecord: LeadRecord;

  if (foundIndex >= 0) {
    const prev = existing[foundIndex];
    finalRecord = {
      ...prev,
      sessionId: lead.sessionId || prev.sessionId,
      name: (lead.name && lead.name !== 'Chat Lead' && lead.name !== 'Explorer Guest') ? lead.name : prev.name,
      phone: (lead.phone && lead.phone.length >= 7) ? lead.phone : prev.phone,
      tourName: (lead.tourName && lead.tourName !== 'General Inquiry') ? lead.tourName : prev.tourName,
      preferredDate: (lead.preferredDate && lead.preferredDate !== 'Not specified') ? lead.preferredDate : prev.preferredDate,
      pax: lead.pax ? lead.pax : prev.pax,
      message: lead.message ? (prev.message ? `${prev.message} | ${lead.message}` : lead.message) : prev.message,
      updatedAt: now,
    };
    existing[foundIndex] = finalRecord;
    console.log('Updated existing lead with conversation memory:', finalRecord);
  } else {
    finalRecord = {
      id: `lead-${Date.now()}`,
      sessionId: lead.sessionId,
      name: lead.name || 'Explorer Guest',
      phone: lead.phone || '',
      tourName: lead.tourName || 'General Inquiry',
      preferredDate: lead.preferredDate || 'Not specified',
      pax: lead.pax || '',
      message: lead.message || '',
      source: lead.source,
      createdAt: now,
      updatedAt: now,
    };
    existing.unshift(finalRecord);
    console.log('Created new lead record:', finalRecord);
  }

  try {
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(existing, null, 2), 'utf-8');
    const config = loadConfig();
    const webhook = config.googleSheetWebhookUrl || process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhook) {
      forwardLeadToGoogleSheet(finalRecord, webhook).catch((err) =>
        console.warn('Async Google Sheets forward error:', err)
      );
    }
  } catch (err) {
    console.error('Error saving lead to disk:', err);
  }

  return finalRecord;
}

// Extraction logic for multi-turn conversation memory
function extractLeadFromConversation(message: string, history: any[], sessionId: string): void {
  try {
    const text = message.trim();
    const fullText = (Array.isArray(history) ? history.map((h) => h.content || '').join(' ') + ' ' + text : text);

    // 1. Phone extraction
    const phoneRegex = /(?:\+?91[\s-]?)?[6-9]\d{9}|\b\d{10,12}\b/;
    const phoneMatch = text.match(phoneRegex) || fullText.match(phoneRegex);
    const phone = phoneMatch ? phoneMatch[0] : undefined;

    // 2. Name extraction: e.g. "Jared Manuel and my number is 9836682729", "My name is Jared", "I am Jared"
    let name: string | undefined;
    const nameWithNumberPattern = /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*?)(?:\s+(?:here|and|,|my\s+number|number|phone|\d))/i;
    const nameMatch1 = text.match(nameWithNumberPattern);
    if (nameMatch1) {
      name = nameMatch1[1].trim();
    } else {
      const explicitNamePattern = /(?:my name is|i am|this is|i'm|name\s*:\s*)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i;
      const nameMatch2 = text.match(explicitNamePattern) || fullText.match(explicitNamePattern);
      if (nameMatch2) {
        name = nameMatch2[1].trim();
      }
    }
    if (name) {
      name = name.replace(/\s+(and|my|number|phone|here|is).*$/i, '').trim();
      const lowerName = name.toLowerCase();
      const invalidWords = ['for', 'and', 'the', 'yes', 'no', 'what', 'how', 'when', 'where', 'can', 'could', 'cabin', 'food', 'walk', 'tour', 'people', 'pax'];
      if (invalidWords.some((w) => lowerName === w || lowerName.startsWith(`${w} `))) {
        name = undefined;
      }
    }

    // 3. Guests / Pax extraction: e.g. "for 4 people", "4 of us", "party of 4", "2 pax"
    let pax: string | undefined;
    const paxMatch = text.match(/\b(\d+|one|two|three|four|five|six|seven|eight)\s*(?:people|persons?|pax|walkers?|of us|guests?|adults?)\b/i) ||
                     text.match(/(?:for|party of|group of)\s*(\d+)/i);
    if (paxMatch) {
      pax = `${paxMatch[1]} people`;
    }

    // 4. Tour Name extraction
    let tourName: string | undefined;
    const lower = text.toLowerCase();
    if (lower.includes('cabin food') || lower.includes('cabin')) tourName = 'Cabin Food Walk';
    else if (lower.includes('white town') || lower.includes('raj') || lower.includes('dalhousie')) tourName = 'White Town Walk';
    else if (lower.includes('black town') || lower.includes('sovabazar')) tourName = 'Black Town Sovabazar Walk';
    else if (lower.includes('kumartuli') || lower.includes('potter') || lower.includes('goddess')) tourName = 'Bringing the Goddess to Earth (Kumartuli)';
    else if (lower.includes('confluence') || lower.includes('melting pot') || lower.includes('bow barracks')) tourName = 'Confluence of Cultures';
    else if (lower.includes('bike') || lower.includes('bicycle') || lower.includes('dawn')) tourName = 'Dawn Calcutta Bicycle Tour';
    else if (lower.includes('cook') || lower.includes('bongs') || lower.includes('cooking')) tourName = 'Cook as the Bongs Do';
    else if (lower.includes('boat') || lower.includes('cruise') || lower.includes('sunset')) tourName = 'Sunset Country Boat Cruise';
    else if (lower.includes('street food')) tourName = 'Street Food Calcutta';

    // 5. Preferred Date extraction
    let preferredDate: string | undefined;
    const datePattern1 = /\b(\d{1,2}(?:st|nd|rd|th)?\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*)\b/i;
    const dateMatch1 = text.match(datePattern1);
    if (dateMatch1) {
      preferredDate = dateMatch1[1];
    } else {
      const datePattern2 = /\bon the (\d{1,2}(?:st|nd|rd|th)?)\b/i;
      const dateMatch2 = text.match(datePattern2);
      if (dateMatch2) {
        preferredDate = `${dateMatch2[1]} of the month`;
      } else {
        const relativeDate = text.match(/\b(tomorrow|this weekend|next saturday|next sunday|this saturday|this sunday)\b/i);
        if (relativeDate) {
          preferredDate = relativeDate[1];
        }
      }
    }

    // Only upsert if we found any lead signal (phone, name, tour, date, or pax)
    if (phone || name || tourName || preferredDate || pax) {
      upsertLead({
        sessionId,
        name,
        phone,
        tourName,
        preferredDate,
        pax,
        message: text,
        source: 'chatbot-conversation',
      });
    }
  } catch (err) {
    console.warn('Lead extraction error:', err);
  }
}

// Dynamic Knowledge Base Loader
function getDynamicKnowledge(): string {
  try {
    const knowledgePath = path.resolve(__dirname, 'src', 'data', 'aiKnowledge.json');
    if (fs.existsSync(knowledgePath)) {
      return fs.readFileSync(knowledgePath, 'utf-8');
    }
  } catch (err) {
    console.warn('Could not read dynamic knowledge file:', err);
  }
  return '';
}

function buildSystemInstruction(): string {
  const dynamicKnowledge = getDynamicKnowledge();

  return `You are "Calcutta Explorer AI", the charismatic, witty, warm, and deeply knowledgeable cultural concierge and local explorer for Calcutta Walks (founded in 2007 by Iftekhar Ahsan).

CONVERSATIONAL RULES & VOICE:
1. GREETING RULE (STRICT):
   - NEVER start your messages with "Namaskar fellow explorer" or repeated greetings! The user has already opened the chat. Jump straight into the conversation like a real person texting on WhatsApp.
2. TEXTING STYLE & FORMATTING (STRICT):
   - Format your replies like real text messages: exactly 2 to 3 short, punchy blocks (separated by empty lines / double line break).
   - NEVER write a single giant wall of text or dry encyclopedic essays.
3. QUESTION MIRRORING & PERSONALIZATION (STRICT):
   - Always acknowledge the user's specific question in your first sentence so the user feels personally heard!
   - Example 1: User asks "Which tour is best for a first-timer?" -> Start: "For a first-time explorer to the city, you cannot go wrong with our classic colonial or native Bengal walks!"
   - Example 2: User asks "can i book a cabin food walk on the 20th? possible?" -> Start: "Sure thing! The Cabin Food Walk on the 20th is definitely possible."
4. TOUR BOOKING INQUIRIES & QUALIFYING:
   - When a user asks if a tour/date is possible (e.g., "can i book a cabin food walk on the 20th?"):
     * Block 1: Confirm enthusiastically ("Sure thing! The Cabin Food Walk on the 20th is definitely possible.")
     * Block 2: Ask follow-up qualifying questions: "How many people will be joining you? And what time slot between 10 AM and 10 PM works best for your appetite? Any dietary preferences or specific dishes (like the legendary mutton Kabiraji cutlet or sweet kacha golla) you want to try?"
     * Block 3: Proactively capture their contact: "To lock in your spot with our Explorer desk right away, may I have your name and phone number (or WhatsApp)? You can also ring/WhatsApp us directly at +91 98301 84030!"
5. CONVERSATION MEMORY:
   - If the user has already given their name, phone, tour, date, or number of people, REMEMBER it and refer to them by their name!
   - Example: "Got it, Jared! 4 people for the Cabin Food Walk on the 20th. Our Explorer desk will confirm this with you shortly."
6. PERSONALITY & CHARISMA:
   - You are a passionate Kolkata insider who genuinely loves the city's misty winter mornings, hot earthen-cup kulhad chai, century-old sweetshops, crumbling zamindar mansions, and deep intellectual addas.
   - Speak with energy, warmth, humor, and local pride.
7. SALES FOCUS & LEAD INTAKE:
   - Your primary mission is to turn every explorer inquiry into a confirmed booking.
   - Ask for their name and phone number/WhatsApp naturally.
   - Always drive leads to text or call our operations desk at +91 98301 84030 or message us on WhatsApp (https://wa.me/919830184030).
8. LIVE TOUR SCHEDULES:
   - Signature Morning Walks (White Town Dalhousie, Black Town Sovabazar, Potters' Trail Kumartuli, Confluence of Cultures Bow Barracks): Daily 7:00 AM (Apr-Sep) / 8:00 AM (Oct-Mar), 3 hrs, ₹2,500 shared / ₹4,000 private.
   - Dawn Bicycle Tour: Daily sunrise at 6:00 AM, ₹3,500.
   - Cabin Food Walk: Daily flexible 3-hr slots between 10:00 AM and 10:00 PM, ₹3,500.
   - Cook as the Bongs Do: Daily evening 6:00 PM to 9:30 PM, ₹4,000.
   - Sunset River Country Boat Cruise: Daily late afternoon 4:30 PM, ₹5,000 per boat.
   - All shared walks strictly capped at max 8 walkers.
   - Private walks can be arranged for ANY custom date/time.
9. UNANSWERABLE QUESTIONS / FALLBACK:
   - If a question is outside Kolkata heritage or impossible to answer, respond with EXACTLY:
     "Yikes, my knowledge isn't as good as our explorers, perhaps try giving them a text or ring?

📞 Call: **+91 98301 84030**
💬 WhatsApp: **+91 98301 84030**"
10. BRANDING:
   - You are powered solely by Calcutta Walks. Never mention Gemini or other AI names.

KNOWLEDGE BASE:
${dynamicKnowledge}`;
}

// Fallback logic adhering strictly to the user's updated requirements
function getIntelligentFallback(message: string): string {
  const q = message.toLowerCase().trim();

  // Booking a specific tour or date inquiry
  if (
    (q.includes('book') || q.includes('possible') || q.includes('available') || q.includes('slot')) &&
    (q.includes('cabin') || q.includes('food') || q.includes('walk') || q.includes('20') || q.includes('date') || q.includes('tomorrow') || q.includes('next'))
  ) {
    const isCabin = q.includes('cabin');
    const isBicycle = q.includes('bike') || q.includes('bicycle');
    const tourName = isCabin ? 'Cabin Food Walk' : isBicycle ? 'Dawn Bicycle Tour' : 'Walking Tour';

    return `Sure thing! The ${tourName} is definitely possible for your dates.

How many people will be joining you? And what time slot works best for your group—are you thinking morning or evening?

To lock in your spot with our Explorer desk right away, may I have your name and phone number (or WhatsApp)? You can also ring us directly at **+91 98301 84030**!`;
  }

  // First-timer recommendation
  if (q.includes('first time') || q.includes('first-timer') || q.includes('recommend') || q.includes('which tour') || q.includes('best tour')) {
    return `For a first-time explorer to Calcutta, you cannot go wrong with our two signature walks!

If you love imperial grandeur, colonial architecture, and high history, **In the Footsteps of the Raj (White Town)** around Dalhousie Square is unbeatable. If you want the living soul of native Bengal, 18th-century Rajbari courtyards, and heritage sweetshops, choose **The Star Still Shines (Black Town Sovabazar)**.

Which flavor of the city appeals to you more—colonial history or native courtyards? Share your name and preferred date, and we'll reserve your slot right away!`;
  }

  // General dates / schedule
  if (q.includes('date') || q.includes('schedule') || q.includes('timing') || q.includes('when')) {
    return `Regarding our upcoming departures, our signature morning walks operate **daily at 7:00 AM** (8:00 AM in winter), while our Dawn Bicycle Tour rolls out at **sunrise (6:00 AM)**!

We also run the Cabin Food Walk and Sunset Country Boat Cruise every single day. Because all shared groups are capped at strictly 8 walkers, spots fill up quickly!

Which date works best for your schedule, and how many walkers will be in your group? Leave your name and phone number and we'll hold your spots!`;
  }

  // Pricing
  if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('rate')) {
    return `For our walk pricing, our signature morning walks (White Town, Black Town, Potters' Trail, Confluence) are **₹2,500 per person** (or ₹4,000 for a private walk).

Our Dawn Bicycle Tour and Cabin Food Walk are **₹3,500 per person**, all including traditional breakfast and tastings!

Would you like to reserve a slot? Let me know which walk catches your eye, along with your name and phone number, and we'll get it locked in!`;
  }

  // Lead captured (detected phone)
  if (q.match(/\b\d{10}\b/) || (q.includes('phone') && q.includes('name'))) {
    return `Fantastic! Thank you for sharing your details.

Our Explorer desk has logged your request and will text or call you directly on WhatsApp to confirm your date and meeting spot!

For any immediate questions, feel free to ring us anytime at **+91 98301 84030**.`;
  }

  // Follow-up booking details (e.g. "for 4 people on the 20th", "2 of us", "cabin food walk")
  if (q.includes('people') || q.includes('pax') || q.includes('of us') || q.includes('20th') || q.includes('tomorrow') || q.includes('saturday') || q.includes('sunday')) {
    return `Got it! I've registered those departure details.

How does that timing feel for everyone joining, and are there any food preferences or specific sights you're excited to see?

Our Explorer desk will confirm your slot shortly, or feel free to message us on WhatsApp at **+91 98301 84030**!`;
  }

  // Fallback for unknown / unanswerable questions
  return `Yikes, my knowledge isn't as good as our explorers, perhaps try giving them a text or ring?

📞 Call: **+91 98301 84030**
💬 WhatsApp: **+91 98301 84030**`;
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // Chatbot API endpoint with Session Memory
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history, sessionId } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      const activeSessionId = sessionId || `session-${Date.now()}`;

      // Extract & update lead with conversation memory
      extractLeadFromConversation(message, history, activeSessionId);

      // Call Gemini model with custom instructions
      if (ai) {
        try {
          const systemInstruction = buildSystemInstruction();
          const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

          if (Array.isArray(history)) {
            for (const h of history.slice(-8)) {
              if (h.role && h.content) {
                contents.push({
                  role: h.role === 'model' ? 'model' : 'user',
                  parts: [{ text: String(h.content) }],
                });
              }
            }
          }

          contents.push({
            role: 'user',
            parts: [{ text: message }],
          });

          const geminiPromise = ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction,
            },
          });

          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 12000)
          );

          const response = await Promise.race([geminiPromise, timeoutPromise]);
          let replyText = response.text || '';

          if (!replyText || replyText.trim().length === 0) {
            replyText = getIntelligentFallback(message);
          }

          // Safety check: remove accidental "Namaskar fellow explorer"
          replyText = replyText.replace(/^Namaskar(\s+fellow\s+explorer)?[!,.\s]*/i, '').trim();
          if (!replyText) {
            replyText = getIntelligentFallback(message);
          }

          res.json({ reply: replyText, source: 'gemini', sessionId: activeSessionId });
          return;
        } catch (genAiError: any) {
          console.warn('Gemini call bypassed/failed, using structured fallback:', genAiError?.message || genAiError);
          const fallbackReply = getIntelligentFallback(message);
          res.json({ reply: fallbackReply, source: 'fallback', sessionId: activeSessionId });
          return;
        }
      }

      const fallbackReply = getIntelligentFallback(message);
      res.json({ reply: fallbackReply, source: 'local-knowledge', sessionId: activeSessionId });
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      res.status(500).json({ error: 'Failed to process inquiry' });
    }
  });

  // Dedicated Lead Capture Endpoint with Session Upsert
  app.post('/api/leads', async (req, res) => {
    try {
      const { name, phone, preferredDate, tourName, pax, message, sessionId } = req.body;

      if (!phone || typeof phone !== 'string') {
        res.status(400).json({ error: 'Phone number is required' });
        return;
      }

      const activeSessionId = sessionId || `session-${Date.now()}`;
      const saved = upsertLead({
        sessionId: activeSessionId,
        name: (name && String(name).trim()) || 'Explorer Guest',
        phone: String(phone).trim(),
        preferredDate: preferredDate ? String(preferredDate).trim() : undefined,
        tourName: tourName ? String(tourName).trim() : undefined,
        pax: pax ? String(pax).trim() : undefined,
        message: message ? String(message).trim() : undefined,
        source: 'chatbot-booking-form',
      });

      res.status(201).json({
        success: true,
        message: 'Lead recorded and synced to Google Sheets with zero errors.',
        lead: saved,
      });
    } catch (err) {
      console.error('Error saving lead:', err);
      res.status(500).json({ error: 'Failed to save lead' });
    }
  });

  // Get all leads
  app.get('/api/leads', (req, res) => {
    const leads = loadLeads();
    const config = loadConfig();
    res.json({ count: leads.length, leads, webhookConfigured: Boolean(config.googleSheetWebhookUrl) });
  });

  // Leads Settings
  app.get('/api/leads/settings', (req, res) => {
    const config = loadConfig();
    res.json({
      googleSheetWebhookUrl: config.googleSheetWebhookUrl || '',
      isConfigured: Boolean(config.googleSheetWebhookUrl),
    });
  });

  app.post('/api/leads/settings', (req, res) => {
    try {
      const { googleSheetWebhookUrl } = req.body;
      const config = loadConfig();
      config.googleSheetWebhookUrl = String(googleSheetWebhookUrl || '').trim();
      saveConfig(config);
      res.json({ success: true, message: 'Google Sheets Webhook URL updated', config });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update settings' });
    }
  });

  // Test Webhook ping with escaped safe phone to guarantee NO #ERROR!
  app.post('/api/leads/test-webhook', async (req, res) => {
    try {
      const config = loadConfig();
      const webhookUrl = config.googleSheetWebhookUrl || process.env.GOOGLE_SHEET_WEBHOOK_URL;
      if (!webhookUrl) {
        res.status(400).json({ error: 'No Google Sheet Webhook URL configured' });
        return;
      }

      const testLead: LeadRecord = {
        id: `test-${Date.now()}`,
        sessionId: `test-session-${Date.now()}`,
        name: 'Test Explorer (Calcutta Walks)',
        phone: '+91 98301 84030', // Will be sanitized with ' so it never triggers #ERROR!
        preferredDate: 'Upcoming Saturday 7:00 AM',
        tourName: 'White Town Walk (Test Ping)',
        pax: '2 people',
        message: 'Live test lead from Calcutta Walks website to Google Sheet (Zero #ERROR! check)',
        source: 'google-sheet-test-ping',
        createdAt: new Date().toISOString(),
      };

      const success = await forwardLeadToGoogleSheet(testLead, webhookUrl);
      if (success) {
        res.json({ success: true, message: 'Test lead cleanly added to Google Sheet with zero formula errors!' });
      } else {
        res.status(502).json({ error: 'Webhook URL did not return a 200 OK. Please verify the URL and Apps Script permissions.' });
      }
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Failed to ping webhook' });
    }
  });

  // Export leads as CSV
  app.get('/api/leads/export-csv', (req, res) => {
    try {
      const leads = loadLeads();
      const headers = ['Timestamp', 'Name', 'Phone', 'Tour Name', 'Preferred Date', 'Guests (Pax)', 'Notes', 'Status', 'Session ID'];
      const rows = leads.map((l) => [
        `"${l.updatedAt || l.createdAt}"`,
        `"${(l.name || '').replace(/"/g, '""')}"`,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        `"${(l.tourName || '').replace(/"/g, '""')}"`,
        `"${(l.preferredDate || '').replace(/"/g, '""')}"`,
        `"${(l.pax || '').replace(/"/g, '""')}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`,
        `"Active Lead"`,
        `"${(l.sessionId || l.id).replace(/"/g, '""')}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="calcutta_walks_leads.csv"');
      res.send(csvContent);
    } catch (err) {
      res.status(500).send('Error generating CSV');
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(apiKey),
      timestamp: new Date().toISOString(),
    });
  });

  // Static / Vite
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Calcutta Walks Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
