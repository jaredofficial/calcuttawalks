import React from 'react';
import { Star } from 'lucide-react';

export const PressStrip: React.FC = () => {
  const pressLogos = [
    { name: 'The New York Times', url: '/images/press/f1.png' },
    { name: 'Lonely Planet', url: '/images/press/f2.png' },
    { name: 'The Telegraph', url: '/images/press/f3.png' },
    { name: 'Condé Nast Traveller', url: '/images/press/f4.png' },
    { name: 'National Geographic', url: '/images/press/f5.png' },
    { name: 'The Wall Street Journal', url: '/images/press/f6.png' },
    { name: 'Financial Times', url: '/images/press/f7.png' },
    { name: 'Sydney Morning Herald', url: '/images/press/f8.png' },
    { name: 'The Hindu', url: '/images/press/f9.png' },
    { name: 'India Today', url: '/images/press/f10.png' }
  ];

  // Duplicate logos for seamless looping marquee
  const marqueeLogos = [...pressLogos, ...pressLogos];

  return (
    <div className="w-full relative z-20 -mt-6 sm:-mt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="glass-panel-light backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-lg border border-white/80 overflow-hidden">
        {/* Top: Centered TripAdvisor Certificate of Excellence Badge & Stars */}
        <div className="flex flex-col items-center justify-center text-center pb-3 border-b border-[#1C1917]/10">
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-white p-0.5 flex items-center justify-center shadow-xs border border-[#00AA6C]/30 shrink-0">
              <img
                src="/images/press/tripadvisor.png"
                alt="TripAdvisor"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#00AA6C] text-[#00AA6C]" />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#1C1917] ml-0.5">4.9 / 5.0</span>
          </div>
          <p className="text-[11px] uppercase tracking-wider text-[#1C1917]/75 font-medium">
            TripAdvisor Certificate of Excellence
          </p>
        </div>

        {/* Bottom: Smooth Auto-Scrolling Press Logos Ticker with Edge Blur/Cloud */}
        <div className="relative w-full overflow-hidden pt-3">
          {/* Left cloud / gradient fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#FBF8F2] via-[#FBF8F2]/80 to-transparent z-10" />

          {/* Right cloud / gradient fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#FBF8F2] via-[#FBF8F2]/80 to-transparent z-10" />

          {/* Infinite scrolling row */}
          <div className="animate-marquee items-center gap-8 sm:gap-12 py-1">
            {marqueeLogos.map((outlet, idx) => (
              <div
                key={`${outlet.name}-${idx}`}
                className="h-6 sm:h-7 shrink-0 max-w-[110px] flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"
                title={outlet.name}
              >
                <img
                  src={outlet.url}
                  alt={outlet.name}
                  className="max-h-full w-auto object-contain hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-[11px] font-serif font-medium text-[#1C1917]/70 whitespace-nowrap">${outlet.name}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
