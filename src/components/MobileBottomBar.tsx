import React from 'react';
import { MessageSquare, CalendarCheck } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenInquire: () => void;
  tourTitle?: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenInquire, tourTitle }) => {
  const whatsappText = encodeURIComponent(
    `Calcutta Walks Enquiry: Hello! I am looking to book ${tourTitle ? `the "${tourTitle}" tour` : 'a walking tour'} in Kolkata.`
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden pb-[env(safe-area-inset-bottom)] px-3 py-2 pointer-events-none">
      <div className="glass-panel-dark pointer-events-auto rounded-2xl p-1.5 shadow-2xl border border-white/20 flex items-center justify-between gap-2">
        <a
          href={`https://wa.me/919830184030?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenInquire}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#B48A3C] text-[#1C1917] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Inquire Now</span>
        </button>
      </div>
    </div>
  );
};
