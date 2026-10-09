import React, { useState, useEffect } from 'react';
import { 
  X, Table, Download, Send, CheckCircle2, AlertCircle, 
  Copy, Check, RefreshCw, Sparkles, ShieldCheck 
} from 'lucide-react';

interface Lead {
  id: string;
  sessionId?: string;
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

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Upgraded, bulletproof Google Apps Script:
// 1. Prevents #ERROR! by safely escaping phone numbers with a single quote (')
// 2. Auto-creates professional bold column headers with freeze bar
// 3. Has Memory: Upserts/updates existing rows when user adds people, dates, or tour in chat!
const UPGRADED_APPS_SCRIPT = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Auto-create clean headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Phone / WhatsApp",
        "Tour Name",
        "Preferred Date",
        "Guests (Pax)",
        "Notes / Inquiry",
        "Status",
        "Session ID"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#F4EDE1");
      sheet.setFrozenRows(1);
    }
    
    // Escape phone with single quote so Google Sheets NEVER parses + as a formula error (#ERROR!)
    var rawPhone = data.phone ? String(data.phone).trim() : "";
    var safePhone = rawPhone ? ("'" + rawPhone.replace(/^'+/, '')) : "";
    var sessionId = data.sessionId ? String(data.sessionId).trim() : "";
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm");
    
    // Check if an existing row matches this Session ID (Col 9) or Phone (Col 3)
    var lastRow = sheet.getLastRow();
    var existingRow = -1;
    
    if (lastRow > 1) {
      var values = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
      for (var i = 0; i < values.length; i++) {
        var rowSession = String(values[i][8]).trim();
        var rowPhone = String(values[i][2]).replace(/^'+/, '').replace(/\\D/g, '');
        var cleanRawPhone = rawPhone.replace(/^'+/, '').replace(/\\D/g, '');
        
        if ((sessionId && rowSession === sessionId) || 
            (cleanRawPhone.length >= 10 && rowPhone.endsWith(cleanRawPhone.slice(-10)))) {
          existingRow = i + 2; // Offset for 1-based index and header
          break;
        }
      }
    }
    
    if (existingRow > 0) {
      // Memory update: Adjust and correct the existing row in real time
      if (data.name && data.name !== "Chat Lead" && data.name !== "Anonymous") {
        sheet.getRange(existingRow, 2).setValue(data.name);
      }
      if (safePhone) {
        sheet.getRange(existingRow, 3).setValue(safePhone);
      }
      if (data.tourName && data.tourName !== "General Inquiry") {
        sheet.getRange(existingRow, 4).setValue(data.tourName);
      }
      if (data.preferredDate && data.preferredDate !== "Not specified") {
        sheet.getRange(existingRow, 5).setValue(data.preferredDate);
      }
      if (data.pax) {
        sheet.getRange(existingRow, 6).setValue(data.pax);
      }
      if (data.message) {
        var prevMsg = sheet.getRange(existingRow, 7).getValue();
        sheet.getRange(existingRow, 7).setValue(prevMsg ? (prevMsg + " | " + data.message) : data.message);
      }
      sheet.getRange(existingRow, 8).setValue("Active / Updated");
    } else {
      // Append brand-new lead row
      sheet.appendRow([
        timestamp,
        data.name || 'Explorer Guest',
        safePhone,
        data.tourName || 'General Inquiry',
        data.preferredDate || 'Flexible',
        data.pax || '',
        data.message || '',
        'New Lead',
        sessionId
      ]);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "row": existingRow > 0 ? existingRow : sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({ isOpen, onClose }) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const fetchSettingsAndLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const [settingsRes, leadsRes] = await Promise.all([
        fetch('/api/leads/settings'),
        fetch('/api/leads')
      ]);

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setWebhookUrl(settingsData.googleSheetWebhookUrl || '');
      }

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      }
    } catch (err) {
      console.error('Error fetching leads or settings:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSettingsAndLeads();
      setTestResult(null);
      setSaveSuccess(false);
    }
  }, [isOpen]);

  const handleSaveWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/leads/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleSheetWebhookUrl: webhookUrl.trim() })
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save webhook URL:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestWebhook = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/leads/test-webhook', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setTestResult({ success: true, message: data.message || 'Row added / updated cleanly in Google Sheet with zero #ERROR!' });
      } else {
        setTestResult({ success: false, message: data.error || 'Failed to ping webhook.' });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err?.message || 'Connection failed' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(UPGRADED_APPS_SCRIPT);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] shadow-2xl border border-black/15 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1C1917] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00AA6C]/20 border border-[#00AA6C]/40 flex items-center justify-center text-[#00AA6C]">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Live Google Sheets & Leads Hub
              </h3>
              <p className="text-xs text-white/70">
                Refined multi-turn lead sync with memory & #ERROR! fix
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#FDFBF7]">
          {/* Notice: Fix for #ERROR! and Row Memory */}
          <div className="p-4 bg-[#F4EDE1] rounded-2xl border border-[#B48A3C]/30 flex items-start gap-3 text-xs text-black">
            <ShieldCheck className="w-5 h-5 text-[#00AA6C] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#1C1917]">Fix for the `#ERROR!` and Chatbot Memory:</p>
              <p className="mt-1 leading-relaxed text-black/80">
                Google Sheets flags phone numbers starting with <code className="bg-white px-1.5 py-0.5 rounded font-mono">+</code> as formula errors. Our updated script safely quotes them so they display cleanly with no error. It also tracks the conversation so when a user later adds people, dates, or tours, the <strong>same row updates in real time</strong>!
              </p>
            </div>
          </div>

          {/* 1. Quick Stats & CSV Download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-black/10 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-serif text-[#1C1917]">{leads.length}</span>
                <span className="text-xs uppercase tracking-wider text-black/60 font-medium">Captured Leads</span>
              </div>
              <p className="text-xs text-black/70 mt-0.5">
                Automatically updated as visitors chat with Calcutta AI.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchSettingsAndLeads}
                disabled={isLoadingLeads}
                className="px-3 py-2 rounded-xl border border-black/15 hover:bg-black/5 text-xs text-black font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                title="Refresh leads list"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLeads ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <a
                href="/api/leads/export-csv"
                download="calcutta_walks_leads.csv"
                className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CSV</span>
              </a>
            </div>
          </div>

          {/* 2. Real-time Google Sheets Webhook Connection */}
          <div className="p-5 bg-white rounded-2xl border border-black/10 shadow-xs space-y-4">
            <div>
              <h4 className="font-serif text-base font-semibold text-[#1C1917] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B48A3C]" />
                Google Sheet Webhook Connection
              </h4>
              <p className="text-xs text-black/70 mt-1 leading-relaxed">
                Paste your Google Apps Script Web App URL below to receive every lead and conversation update live in your Google Sheet.
              </p>
            </div>

            <form onSubmit={handleSaveWebhook} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs border border-black/20 rounded-xl bg-[#FAF7F2] text-black focus:outline-none focus:border-black font-mono"
                />
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-[#00AA6C] hover:bg-[#008f5a] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {isSaving ? 'Saving...' : 'Save Webhook URL'}
                </button>
              </div>

              {saveSuccess && (
                <div className="text-xs text-[#00AA6C] flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Webhook URL saved successfully!
                </div>
              )}

              {webhookUrl && (
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleTestWebhook}
                    disabled={isTesting}
                    className="text-xs text-[#7A2E22] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isTesting ? 'Sending test lead...' : 'Test Sync: Send Clean Test Row (Checks #ERROR! fix)'}</span>
                  </button>

                  {testResult && (
                    <div className={`text-xs flex items-center gap-1 font-medium ${testResult.success ? 'text-[#00AA6C]' : 'text-[#DC2626]'}`}>
                      {testResult.success ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{testResult.message}</span>
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Step-by-step instructions with Updated Apps Script */}
            <div className="pt-3 border-t border-black/10">
              <details className="text-xs text-black/80 group" open>
                <summary className="font-semibold text-[#1C1917] cursor-pointer hover:text-[#7A2E22] transition-colors select-none">
                  ▶ Copy this Upgraded Script into your Google Sheet (Extensions &gt; Apps Script)
                </summary>
                <div className="mt-3 pl-3 space-y-2 border-l-2 border-[#B48A3C]/40 text-black/75">
                  <p>In your Google Sheet, click <strong>Extensions &gt; Apps Script</strong>, replace your code with this, and click <strong>Deploy &gt; Manage deployments &gt; Edit &gt; New version &gt; Deploy</strong>:</p>
                  <div className="relative bg-[#1C1917] text-white p-3 rounded-xl font-mono text-[11px] overflow-x-auto max-h-60">
                    <button
                      onClick={handleCopyCode}
                      className="sticky top-0 float-right px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-[10px] text-white flex items-center gap-1 cursor-pointer z-10"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-[#00AA6C]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Upgraded Script'}</span>
                    </button>
                    <pre className="whitespace-pre">{UPGRADED_APPS_SCRIPT}</pre>
                  </div>
                  <p className="text-[11px] text-black/60">
                    This automatically structures your sheet with columns: <strong>Timestamp | Name | Phone / WhatsApp | Tour Name | Preferred Date | Guests (Pax) | Notes / Inquiry | Status | Session ID</strong>.
                  </p>
                </div>
              </details>
            </div>
          </div>

          {/* 3. Recent Captured Leads Table with all columns */}
          <div className="p-5 bg-white rounded-2xl border border-black/10 shadow-xs">
            <h4 className="font-serif text-base font-semibold text-[#1C1917] mb-3">
              Live Leads Log
            </h4>

            {leads.length === 0 ? (
              <div className="py-8 text-center text-xs text-black/50 font-serif">
                No leads recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-black/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] text-black font-serif border-b border-black/10">
                    <tr>
                      <th className="p-2.5 font-semibold">Name</th>
                      <th className="p-2.5 font-semibold">Phone</th>
                      <th className="p-2.5 font-semibold">Tour</th>
                      <th className="p-2.5 font-semibold">Date</th>
                      <th className="p-2.5 font-semibold">Guests</th>
                      <th className="p-2.5 font-semibold">Last Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-[#FAF7F2]/50 text-black">
                        <td className="p-2.5 font-medium">{l.name}</td>
                        <td className="p-2.5 font-mono">{l.phone.replace(/^'+/, '')}</td>
                        <td className="p-2.5">{l.tourName || '—'}</td>
                        <td className="p-2.5">{l.preferredDate || '—'}</td>
                        <td className="p-2.5 font-medium">{l.pax || '—'}</td>
                        <td className="p-2.5 text-black/60 font-mono text-[11px]">
                          {new Date(l.updatedAt || l.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
