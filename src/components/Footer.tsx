import React from 'react';
import { Award, ArrowUpRight, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquire }) => {
  return (
    <footer className="bg-[#1C1917] text-[#FBF8F2] pt-12 sm:pt-16 pb-12 sm:pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Top Sister Properties "Stay With Us" Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 mb-10 border-b border-white/10">
        <div className="glass-panel-dark rounded-2xl p-5 sm:p-7 border border-white/15 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="max-w-2xl text-center lg:text-left">
            <h4 className="font-serif text-xl sm:text-2xl text-[#F4EDE1]">
              Sleep in Living History: Calcutta Bungalow & Calcutta Rooms
            </h4>
            <p className="text-xs sm:text-[13px] text-[#F4EDE1]/75 mt-1.5 leading-relaxed">
              Continue your journey beyond the pavement. Stay in our lovingly restored 1920s townhouse bed & breakfast in North Calcutta, celebrating the trades of old Bengal.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            <a
              href="https://calcuttabungalow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#B48A3C] hover:text-[#1C1917] text-[#F4EDE1] text-[11px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 border border-white/20"
            >
              <span>Calcutta Bungalow</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://calcuttarooms.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#B48A3C] hover:text-[#1C1917] text-[#F4EDE1] text-[11px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 border border-white/20"
            >
              <span>Calcutta Rooms</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Blurb */}
          <div className="lg:col-span-4 space-y-4">
            <div className="mb-2">
              <img
                src="/images/logo.png"
                alt="Calcutta Walks"
                className="h-11 sm:h-12 w-auto object-contain brightness-0 invert opacity-95"
                onError={(e) => {
                  e.currentTarget.src = "/images/logo-140x54.png";
                }}
              />
            </div>
            <p className="text-xs sm:text-sm text-[#F4EDE1]/70 leading-relaxed max-w-sm">
              India’s original heritage walking collective, founded in 2007 by Iftekhar Ahsan. We explore Kolkata’s colonial architecture, sacred riverbanks, and vibrant food culture on foot.
            </p>

            {/* TripAdvisor Badge */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00AA6C]/20 border border-[#00AA6C] flex items-center justify-center text-[#00AA6C] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F4EDE1]">TripAdvisor Hall of Fame</p>
                <p className="text-[11px] text-[#F4EDE1]/60">Certificate of Excellence · 4.9 ★ Rating</p>
              </div>
            </div>

            {/* Social Icons (No dead Google+) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/calcuttawalks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F4EDE1]/80 hover:text-white hover:bg-[#B48A3C] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/calcuttawalks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F4EDE1]/80 hover:text-white hover:bg-[#B48A3C] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/calcuttawalks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F4EDE1]/80 hover:text-white hover:bg-[#B48A3C] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-[#CFA858] font-semibold">
              Explore Tours
            </h5>
            <ul className="space-y-2 text-xs text-[#F4EDE1]/75">
              <li>
                <button onClick={() => onNavigate('tours')} className="hover:text-[#F4EDE1] transition-colors">
                  All Tours Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tour-detail', 'in-the-footsteps-of-the-raj')} className="hover:text-[#F4EDE1] transition-colors">
                  White Town Walk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tour-detail', 'bringing-the-goddess-to-earth')} className="hover:text-[#F4EDE1] transition-colors">
                  Kumartuli & Goddess Walk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tour-detail', 'cabin-food-walk')} className="hover:text-[#F4EDE1] transition-colors">
                  Cabin Food Walk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tour-detail', 'sailing-towards-the-goddess')} className="hover:text-[#F4EDE1] transition-colors">
                  Sunset River Cruise
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-[#F4EDE1] transition-colors">
                  Pricing & Tariffs
                </button>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-[#CFA858] font-semibold">
              Company
            </h5>
            <ul className="space-y-2 text-xs text-[#F4EDE1]/75">
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-[#F4EDE1] transition-colors">
                  Our Story & Explorers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-[#F4EDE1] transition-colors">
                  Reviews & Media Coverage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-[#F4EDE1] transition-colors">
                  Calcutta Then & Now
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calendar')} className="hover:text-[#F4EDE1] transition-colors">
                  Upcoming Calendar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#F4EDE1] transition-colors">
                  FAQ & Travel Tips
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-[#F4EDE1] transition-colors">
                  Essays & Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-[#CFA858] font-semibold">
              Headquarters & Connect
            </h5>
            <div className="space-y-2.5 text-xs text-[#F4EDE1]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B48A3C] shrink-0 mt-0.5" />
                <span>9A Khairu Place, Kolkata 700072, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B48A3C] shrink-0" />
                <a href="mailto:explore@calcuttawalks.com" className="hover:underline text-[#F4EDE1]">
                  explore@calcuttawalks.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B48A3C] shrink-0" />
                <span>+91 98301 84030 (Explorer Ifte)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B48A3C] shrink-0" />
                <span>+91 85840 33244 (Explorer Tuhina)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenInquire}
                className="w-full py-2.5 px-4 rounded-xl bg-[#7A2E22] hover:bg-[#9B3C2C] text-white text-xs font-semibold uppercase tracking-wider text-center transition-colors shadow-sm"
              >
                Inquire For Your Walk
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Zero Broken Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F4EDE1]/50">
          <p>© {new Date().getFullYear()} Calcutta Walks. All rights reserved. Registered heritage walking collective.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('faq')} className="hover:text-[#F4EDE1] transition-colors">
              Privacy & Cancellation Terms
            </button>
            <span>·</span>
            <a 
              href="/api/leads/export-csv" 
              download="calcutta_walks_leads.csv" 
              className="hover:text-[#00AA6C] transition-colors"
              title="Download all leads in CSV format"
            >
              Export Leads (CSV)
            </a>
            <span>·</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#7A2E22] fill-current" /> for Calcutta
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
