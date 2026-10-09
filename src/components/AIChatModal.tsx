import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Compass, RotateCcw, Phone, MessageCircle, 
  CheckCircle2, User, ChevronRight, Clock, ArrowRight
} from 'lucide-react';
import { 
  playChatOpenSound, 
  playChatCloseSound, 
  playChatEnterSound 
} from '../utils/soundEffects';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isPendingBatch?: boolean;
}

interface AIChatModalProps {
  onNavigate?: (tab: string, tourSlug?: string) => void;
  onOpenInquire?: (tourSlug?: string) => void;
}

const PHONE_NUMBER = '+91 98301 84030';
const WHATSAPP_LINK = 'https://wa.me/919830184030?text=Namaskar%20Calcutta%20Walks%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20walk.';

const SUGGESTED_PROMPTS = [
  'Which tour is best for a first-timer?',
  'Can I book a Cabin Food Walk on the 20th?',
  'Upcoming tour dates & timings'
];

export const AIChatModal: React.FC<AIChatModalProps> = ({ onNavigate, onOpenInquire }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Persistent session ID for tracking leads across turns
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: `Namaskar fellow explorer! Welcome to Calcutta Walks.\n\nHow may I guide your journey through Kolkata today? Ask me about tour dates, recommended walks, pricing, or let me know when you'd like to reserve a slot.`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [pendingUserTexts, setPendingUserTexts] = useState<string[]>([]);
  
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadDate, setLeadDate] = useState('');
  const [leadPax, setLeadPax] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Debounce timer for multi-message queuing
  const batchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingQueueRef = useRef<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, pendingUserTexts]);

  // Keep pendingQueueRef in sync
  useEffect(() => {
    pendingQueueRef.current = pendingUserTexts;
  }, [pendingUserTexts]);

  const handleToggleOpen = () => {
    if (!isOpen) {
      playChatOpenSound();
      setIsOpen(true);
    } else {
      playChatCloseSound();
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    playChatCloseSound();
    setIsOpen(false);
  };

  // Dispatch the queued messages to the AI backend
  const dispatchBatchedMessages = async () => {
    const queue = [...pendingQueueRef.current];
    if (queue.length === 0 || isLoading) return;

    // Clear queue
    pendingQueueRef.current = [];
    setPendingUserTexts([]);
    setIsLoading(true);

    const combinedMessage = queue.join('\n');

    try {
      // Build history for backend, filtering out initial welcome
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: combinedMessage,
          history: historyPayload,
          sessionId: sessionId
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply || "Yikes, my knowledge isn't as good as our explorers, perhaps try giving them a text or ring?",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `model-err-${Date.now()}`,
        role: 'model',
        content: "Yikes, my knowledge isn't as good as our explorers, perhaps try giving them a text or ring?",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // User sends a message (can send 2-3 in succession without locking!)
  const handleUserSend = (textToSend?: string, immediate = false) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    playChatEnterSound();

    // Immediately display the user's message bubble
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);

    // Keep input field ready for immediate next message!
    if (!textToSend) {
      setInputValue('');
      setIsUserTyping(false);
    }

    // Add to pending queue
    const updatedQueue = [...pendingQueueRef.current, text];
    pendingQueueRef.current = updatedQueue;
    setPendingUserTexts(updatedQueue);

    // Clear any previous debounce timer
    if (batchTimerRef.current) {
      clearTimeout(batchTimerRef.current);
      batchTimerRef.current = null;
    }

    if (immediate) {
      dispatchBatchedMessages();
    } else {
      // 2.6s debounce timer: allows user to send 2-3 texts or keep typing before AI answers
      batchTimerRef.current = setTimeout(() => {
        dispatchBatchedMessages();
      }, 2600);
    }
  };

  // Detect when user is typing in the input: pauses AI reply so user is never interrupted
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const typing = val.trim().length > 0;
    setIsUserTyping(typing);

    // If there are pending messages queued and user is currently typing text, reset the timer
    if (typing && batchTimerRef.current) {
      clearTimeout(batchTimerRef.current);
      // Wait for user to finish typing plus pause
      batchTimerRef.current = setTimeout(() => {
        dispatchBatchedMessages();
      }, 3500);
    }
  };

  const handleClearChat = () => {
    playChatOpenSound();
    if (batchTimerRef.current) {
      clearTimeout(batchTimerRef.current);
    }
    setPendingUserTexts([]);
    pendingQueueRef.current = [];
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: `What would you like to explore next? Ask me about tour dates, pricing, or share your contact details to reserve a slot.`,
        timestamp: new Date()
      }
    ]);
    setShowLeadForm(false);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim()) return;

    playChatEnterSound();
    setIsSubmittingLead(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          name: leadName.trim() || 'Explorer Guest',
          phone: leadPhone.trim(),
          preferredDate: leadDate.trim() || 'Flexible / Upcoming',
          pax: leadPax.trim() || '',
          message: 'Chatbot Lead Booking Request'
        })
      });

      if (res.ok) {
        setLeadSubmitted(true);
        setTimeout(() => {
          setShowLeadForm(false);
          setLeadSubmitted(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `lead-ack-${Date.now()}`,
              role: 'model',
              content: `Thank you ${leadName.trim() ? leadName.trim() : 'fellow explorer'}! I have successfully registered your request for ${leadDate.trim() ? leadDate.trim() : 'an upcoming departure'}${leadPax.trim() ? ` (${leadPax.trim()} people)` : ''}.\n\nOur Explorer operations desk will call or WhatsApp you at **${leadPhone.trim()}** shortly to confirm your booking!`,
              timestamp: new Date()
            }
          ]);
          setLeadName('');
          setLeadPhone('');
          setLeadDate('');
          setLeadPax('');
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to submit lead:', err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Helper to format text like real text messages broken into 2-3 clean blocks with pure black text
  const renderMessageContent = (content: string) => {
    const blocks = content.split(/\n{2,}/);

    return (
      <div className="space-y-2.5">
        {blocks.map((block, bIdx) => {
          const lines = block.split('\n');

          return (
            <div key={bIdx} className="space-y-1">
              {lines.map((line, lIdx) => {
                const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
                const cleanLine = isBullet ? line.trim().replace(/^[•\-]\s*/, '') : line;

                const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
                const renderedParts = parts.map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={pIdx} className="font-bold text-black">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return <span key={pIdx} className="text-black">{part}</span>;
                });

                if (isBullet) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 my-0.5 text-[13px] leading-relaxed text-black">
                      <span className="text-black font-bold text-sm leading-none mt-1 select-none">•</span>
                      <div className="text-black">{renderedParts}</div>
                    </div>
                  );
                }

                if (!line.trim()) {
                  return null;
                }

                return (
                  <p key={lIdx} className="text-[13px] leading-relaxed text-black">
                    {renderedParts}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  // Check if a model message contains fallback text or sales prompt
  const hasFallbackOrContact = (content: string) => {
    const c = content.toLowerCase();
    return (
      c.includes('yikes') ||
      c.includes('give them a text or ring') ||
      c.includes('whatsapp') ||
      c.includes('98301 84030') ||
      c.includes('reserve your spot') ||
      c.includes('lock in your spot')
    );
  };

  const hasPendingQueue = pendingUserTexts.length > 0;

  return (
    <>
      {/* 1. FLOATING LAUNCHER BUTTON */}
      <div className="fixed bottom-20 right-6 sm:bottom-24 sm:right-8 z-40 flex flex-col items-end">
        <button
          onClick={handleToggleOpen}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#1C1917] hover:bg-[#2A2421] text-[#F4EDE1] rounded-full shadow-2xl border border-[#B48A3C]/40 transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Open Calcutta Walks Concierge"
        >
          <div className="relative">
            <Compass className="w-5 h-5 text-[#B48A3C] transition-transform duration-500 group-hover:rotate-45" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00AA6C] rounded-full border-2 border-[#1C1917]" />
          </div>
          <span className="text-xs font-semibold tracking-wide uppercase font-serif hidden sm:inline">
            Calcutta AI
          </span>
          <span className="sm:hidden text-xs font-semibold">AI</span>
        </button>
      </div>

      {/* 2. CHAT MODAL WINDOW */}
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="calcutta-ai-title"
          className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-24 sm:right-8 z-50 sm:w-[420px] h-[610px] max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-black/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Clean, Uncluttered Header */}
          <div className="bg-[#1C1917] px-4 py-3 text-white flex items-center justify-between border-b border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B48A3C]/20 border border-[#B48A3C]/40 flex items-center justify-center text-[#B48A3C]">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="calcutta-ai-title" className="font-serif text-sm font-semibold text-white tracking-wide">
                    Calcutta Explorer AI
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#00AA6C]" />
                </div>
                <p className="text-[10px] text-white/60 font-serif">
                  Powered by Calcutta Walks
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Restart conversation"
                className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleClose}
                title="Close chat"
                className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Direct Sales Action Bar: Always 1 tap away from Call & WhatsApp */}
          <div className="bg-[#FAF7F2] px-3 py-2 border-b border-black/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-black font-medium">
              <span className="text-[11px] text-black/70">Explorer Desk:</span>
              <a
                href="tel:+919830184030"
                className="text-black font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
              >
                <Phone className="w-3 h-3 text-[#7A2E22]" /> {PHONE_NUMBER}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00AA6C] hover:bg-[#008f5a] text-white text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3 h-3" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Messages Scroll Area with Pure Black Typography */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FDFBF7]">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const showActions = !isUser && hasFallbackOrContact(msg.content);

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                      isUser
                        ? 'bg-[#1C1917] text-white rounded-br-xs'
                        : 'bg-white text-black border border-black/15 rounded-bl-xs'
                    }`}
                  >
                    {isUser ? (
                      <p className="text-[13px] leading-relaxed whitespace-pre-wrap text-white font-normal">
                        {msg.content}
                      </p>
                    ) : (
                      <div className="text-black font-normal">
                        {renderMessageContent(msg.content)}
                      </div>
                    )}
                  </div>

                  {/* Immediate Direct Action Buttons whenever fallback or contact is invoked */}
                  {showActions && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-1">
                      <a
                        href="tel:+919830184030"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
                      >
                        <Phone className="w-3 h-3" /> Call Explorer Desk
                      </a>
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00AA6C] hover:bg-[#008f5a] text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
                      >
                        <MessageCircle className="w-3 h-3" /> Text on WhatsApp
                      </a>
                    </div>
                  )}

                  <span className="text-[10px] text-black/40 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}

            {/* Subtle multi-message queue indicator while user is typing or sending successive texts */}
            {hasPendingQueue && !isLoading && (
              <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#F4EDE1] border border-[#B48A3C]/30 text-[11px] text-black">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B48A3C] animate-pulse" />
                  <span>
                    {isUserTyping ? 'You are typing... (Explorer waiting)' : 'Explorer is reading... (type more or pause)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => dispatchBatchedMessages()}
                  className="text-[#7A2E22] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer text-[11px]"
                >
                  <span>Reply now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Quick Lead Capture Prompt Card inside chat */}
            {showLeadForm && (
              <div className="bg-white border-2 border-[#1C1917] rounded-2xl p-3.5 shadow-md">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-black/10">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-black">
                    <User className="w-3.5 h-3.5 text-[#7A2E22]" />
                    <span>Reserve a Slot with Calcutta Walks</span>
                  </div>
                  <button 
                    onClick={() => setShowLeadForm(false)}
                    className="text-black/50 hover:text-black text-xs cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {leadSubmitted ? (
                  <div className="py-3 text-center text-xs font-semibold text-[#00AA6C] flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Slot inquiry registered with our Explorer Desk!
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name (e.g. Jared Manuel)"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#FAF7F2] border border-black/15 rounded-lg text-black focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number / WhatsApp *"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#FAF7F2] border border-black/15 rounded-lg text-black focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Preferred Date (e.g. 20th Oct)"
                        value={leadDate}
                        onChange={(e) => setLeadDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#FAF7F2] border border-black/15 rounded-lg text-black focus:outline-none focus:border-black"
                      />
                      <input
                        type="text"
                        placeholder="Guests (e.g. 4 people)"
                        value={leadPax}
                        onChange={(e) => setLeadPax(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#FAF7F2] border border-black/15 rounded-lg text-black focus:outline-none focus:border-black"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingLead || !leadPhone.trim()}
                      className="w-full py-2 bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmittingLead ? 'Saving Details...' : 'Submit to Explorer Desk'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="bg-white border border-black/10 rounded-2xl px-3.5 py-2.5 shadow-xs text-xs text-black flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#B48A3C] animate-spin" />
                  <span>The Explorer is writing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Lead Trigger & Suggested Prompts (Uncluttered) */}
          <div className="px-3 py-2 bg-[#F4EDE1]/60 border-t border-black/10 flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
            {!showLeadForm && (
              <button
                onClick={() => setShowLeadForm(true)}
                className="shrink-0 px-2.5 py-1 bg-[#7A2E22] hover:bg-[#1C1917] text-white font-medium rounded-full transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <span>Book / Leave Details</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleUserSend(prompt, true)}
                  disabled={isLoading}
                  className="shrink-0 bg-white hover:bg-black hover:text-white text-black px-2.5 py-1 rounded-full border border-black/15 transition-colors cursor-pointer text-[11px] font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Input Bar: Allows consecutive message sending! */}
          <div className="p-3 bg-white border-t border-black/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={hasPendingQueue ? "Add another thought or press Enter..." : "Ask dates, say 'Can I book?', or send multiple texts..."}
                className="flex-1 bg-[#FAF7F0] border border-black/20 rounded-full px-4 py-2 text-xs text-black placeholder:text-black/50 focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-8 h-8 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="mt-1 flex items-center justify-center text-[10px] text-black/60 font-serif px-1">
              <span>Powered by Calcutta Walks</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
