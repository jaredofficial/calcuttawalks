import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface WhatsAppCTAProps {
  pageContext?: string;
  tourTitle?: string;
  className?: string;
  compact?: boolean;
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  pageContext = 'general inquiry',
  tourTitle,
  className = '',
  compact = false
}) => {
  const message = tourTitle
    ? `Hello Calcutta Walks team! I would like to inquire about booking the "${tourTitle}" tour.`
    : `Hello Calcutta Walks team! I am reaching out from your website regarding ${pageContext} and would love to plan a walk with your Explorers.`;

  const whatsappHref = `https://wa.me/919830184030?text=${encodeURIComponent(message)}`;

  if (compact) {
    return (
      <section className={`w-full py-10 bg-[#1C1917] text-[#FBF8F2] border-t border-white/10 ${className}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
            </div>
            <div>
              <p className="text-sm font-serif font-medium text-[#F4EDE1]">Prefer speaking directly on WhatsApp?</p>
              <p className="text-xs text-[#F4EDE1]/60">Explorer Ifte & the team reply typically within a few hours.</p>
            </div>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md shadow-[#25D366]/20 flex items-center gap-2 group cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>Chat On WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full py-16 sm:py-20 bg-gradient-to-b from-[#1C1917] via-[#241F1D] to-[#1C1917] text-[#FBF8F2] border-t border-b border-white/10 relative overflow-hidden ${className}`}>
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#25D366]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#B48A3C_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4EDE1] leading-tight">
          Planning your trip to Kolkata? <span className="italic text-[#CFA858]">Talk to an Explorer.</span>
        </h3>

        <p className="mt-3 text-xs sm:text-sm text-[#F4EDE1]/70 max-w-xl mx-auto font-serif leading-relaxed">
          Whether you need a custom private route, assistance selecting the right morning walk, or recommendations on where to stay and eat, our local team is just a message away.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-lg shadow-[#25D366]/25 hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp (+91 98301 84030)</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="mailto:explore@calcuttawalks.com"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-[#F4EDE1] text-xs font-semibold tracking-wider uppercase transition-all border border-white/15 flex items-center justify-center gap-2"
          >
            <span>Or Email Us Directly</span>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#F4EDE1]/50">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B48A3C]" />
            Direct message with verified local founders
          </span>
          <span>·</span>
          <span>No automated bots</span>
          <span>·</span>
          <span>Average reply within 2–4 hours</span>
        </div>
      </div>
    </section>
  );
};
