import React from 'react';
import { TESTIMONIALS_DATA, PRESS_DATA } from '../data/testimonials';
import { OurStorySection } from '../components/OurStorySection';
import { InquireForm } from '../components/InquireForm';
import { Star, Award, Quote, ExternalLink } from 'lucide-react';

interface ReviewsPageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate, onOpenInquire }) => {
  return (
    <div className="w-full pt-20">
      {/* 1. HERO */}
      <section className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight">
            What They Say: <span className="italic text-[#CFA858]">Testimonials & Press</span>
          </h1>

          <p className="text-base sm:text-lg text-[#F4EDE1]/85 max-w-2xl mx-auto mt-4 font-light leading-relaxed font-serif">
            Meet our awesome walkers and read the awesome things they have to say about us. Real words from guests across 85 countries.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT: GUEST REVIEWS GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">
            Guest Testimonials
          </h2>
          <div className="w-16 h-[1.5px] bg-[#B48A3C]/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1917]/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#00AA6C] text-[#00AA6C]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#1C1917]/50 font-medium">
                    {t.source}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-[#B48A3C]/20 mb-2" />
                <p className="font-serif text-base text-[#1C1917] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1C1917]/10">
                <cite className="not-italic font-bold text-sm text-[#1C1917] block">
                  {t.author}
                </cite>
                <span className="text-xs text-[#1C1917]/60 block mt-0.5 font-serif">
                  {t.locationOrRole}
                </span>

                {t.tourName && t.tourSlug && (
                  <button
                    onClick={() => onNavigate('tour-detail', t.tourSlug)}
                    className="mt-3 text-[11px] font-semibold text-[#7A2E22] hover:text-[#B48A3C] transition-colors block text-left cursor-pointer"
                  >
                    Tour: {t.tourName} →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 3. MEDIA COVERAGE SECTION */}
        <div className="mt-28 pt-16 border-t border-[#1C1917]/10">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">
              Media Coverage
            </h2>
            <div className="w-16 h-[1.5px] bg-[#B48A3C]/40 mx-auto mt-4 mb-2" />
            <p className="text-xs sm:text-sm text-[#1C1917]/70 font-serif">
              Featured extensively in global broadsheets and leading travel journals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRESS_DATA.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1917]/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7A2E22] font-semibold mb-3">
                    <span className="text-sm font-serif font-bold text-[#1C1917]">{article.publication}</span>
                    <span className="text-stone-400 font-normal">{article.date}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1C1917] mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1C1917]/75 font-serif leading-relaxed italic">
                    "{article.excerpt}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1C1917]/10 flex items-center justify-between text-xs text-[#1C1917]/60">
                  <span>Author: {article.author}</span>
                  {article.link && (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#7A2E22] hover:text-[#B48A3C] font-medium"
                    >
                      <span>Read Article</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR STORY (Compact) */}
      <OurStorySection compact={true} onNavigateToStory={() => onNavigate('story')} />

      {/* 5. INQUIRE NOW */}
      <InquireForm />
    </div>
  );
};
