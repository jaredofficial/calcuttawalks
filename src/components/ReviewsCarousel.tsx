import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { ScrollTypewriter } from './ScrollTypewriter';

interface ReviewsCarouselProps {
  currentTourSlug?: string;
  onSelectTour?: (tourSlug: string) => void;
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ currentTourSlug, onSelectTour }) => {
  // If currentTourSlug is provided, prioritize reviews for this tour or show all
  const filteredReviews = currentTourSlug
    ? TESTIMONIALS_DATA.filter((r) => r.tourSlug === currentTourSlug || !r.tourSlug)
    : TESTIMONIALS_DATA;

  const reviews = filteredReviews.length > 0 ? filteredReviews : TESTIMONIALS_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex];

  return (
    <section className="py-10 sm:py-14 bg-[#F4EDE1] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compressed Sleek Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <ScrollTypewriter
              as="h2"
              text="What They Say"
              highlightWords={['Say']}
              className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#1C1917] leading-tight"
            />
            <p className="text-xs text-[#1C1917]/70 mt-0.5 font-serif italic">
              Authentic traveler impressions from our heritage explorations.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1 glass-panel-light px-2.5 py-1 rounded-full text-[11px] font-medium text-[#1C1917]">
              <Star className="w-3 h-3 fill-[#00AA6C] text-[#00AA6C]" />
              <span className="font-semibold">4.9 / 5.0</span>
              <span className="text-[#1C1917]/50">· 1,280+ Reviews</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={prevReview}
                aria-label="Previous review"
                className="w-7 h-7 rounded-full glass-panel-light flex items-center justify-center text-[#1C1917] hover:bg-white hover:text-[#7A2E22] transition-colors border border-white/80 shadow-xs cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next review"
                className="w-7 h-7 rounded-full glass-panel-light flex items-center justify-center text-[#1C1917] hover:bg-white hover:text-[#7A2E22] transition-colors border border-white/80 shadow-xs cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Compressed Sleek Review Card */}
        <div className="glass-panel-light rounded-2xl p-5 sm:p-7 lg:p-8 border border-white/80 shadow-md relative overflow-hidden transition-all duration-300">
          <Quote className="w-10 h-10 text-[#B48A3C]/15 absolute top-4 right-6 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#00AA6C] text-[#00AA6C]" />
              ))}
              <span className="text-[11px] text-[#1C1917]/60 ml-1.5 font-medium">
                {current.date}
              </span>
            </div>

            <blockquote className="font-serif text-base sm:text-lg lg:text-xl text-[#1C1917] leading-relaxed italic">
              "{current.quote}"
            </blockquote>

            <div className="mt-5 pt-3.5 border-t border-[#1C1917]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <cite className="not-italic font-semibold text-sm text-[#1C1917] block">
                  {current.author}
                </cite>
                <span className="text-[11px] text-[#1C1917]/60">
                  {current.locationOrRole}
                </span>
              </div>

              {current.tourName && current.tourSlug && onSelectTour && (
                <button
                  onClick={() => onSelectTour(current.tourSlug!)}
                  className="text-[11px] font-semibold text-[#7A2E22] hover:text-[#B48A3C] transition-colors flex items-center gap-1 self-start sm:self-center cursor-pointer"
                >
                  <span className="text-[#1C1917]/60">Walk:</span>
                  <span className="underline underline-offset-2">{current.tourName}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sleek Minimal Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-4">
          {reviews.slice(0, 8).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-1.5 transition-all rounded-full cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-[#7A2E22]' : 'w-1.5 bg-[#1C1917]/20 hover:bg-[#1C1917]/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
