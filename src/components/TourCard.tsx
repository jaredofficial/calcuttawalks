import React from 'react';
import { Tour } from '../data/tours';
import { SafeImage } from './SafeImage';
import { ArrowUpRight, Clock } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
  onSelect: (tourSlug: string) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onSelect }) => {
  // Take at most 2 theme tags as specified
  const displayTags = tour.themes.slice(0, 2);

  return (
    <article
      onClick={() => onSelect(tour.slug)}
      className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden border border-[#1C1917]/10 hover:border-[#B48A3C]/40 shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
    >
      {/* Tour Image with Hover Zoom */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#292524]">
        <SafeImage
          src={tour.imageUrl}
          alt={tour.title}
          fallbackText={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Floating duration on top right */}
        <div className="absolute top-3 right-3 glass-panel-dark px-2.5 py-0.5 rounded-full text-[11px] text-[#F4EDE1] flex items-center gap-1.5 shadow-xs">
          <Clock className="w-3 h-3 text-[#CFA858]" />
          <span>{tour.duration}</span>
        </div>

        {/* Bottom image overlay with Area and Clean Tags */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-[#F4EDE1]">
          <p className="text-[10px] uppercase tracking-wider text-[#CFA858] font-medium">
            {tour.area}
          </p>
          {/* Metadata as clean unboxed text with separators */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#F4EDE1]/80 mt-0.5">
            {displayTags.map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true" className="opacity-50">/</span>}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg sm:text-xl text-[#1C1917] group-hover:text-[#7A2E22] transition-colors leading-snug">
              {tour.title}
            </h3>
            <div className="w-7 h-7 rounded-full border border-[#1C1917]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1C1917] group-hover:text-white transition-all">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.75]" />
            </div>
          </div>
          
          <p className="text-[11px] text-[#7A2E22] font-medium mt-1">
            {tour.subtitle}
          </p>

          <p className="text-xs sm:text-[13px] text-[#1C1917]/75 mt-2.5 line-clamp-2 leading-relaxed font-serif">
            {tour.overview}
          </p>
        </div>

        {/* Card Footer with Price From & Action */}
        <div className="mt-5 pt-3.5 border-t border-[#1C1917]/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#1C1917]/50 block">From</span>
            <span className="font-serif text-base font-semibold text-[#1C1917]">
              ₹{tour.priceShared.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#1C1917]/60 ml-1">/ person</span>
          </div>

          <span className="text-[11px] font-medium text-[#B48A3C] group-hover:text-[#7A2E22] transition-colors flex items-center gap-1">
            Details & Timings
          </span>
        </div>
      </div>
    </article>
  );
};
