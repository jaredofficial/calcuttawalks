import React, { useState } from 'react';
import { FAQ_DATA, FaqItem } from '../data/supplementary';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { OurStorySection } from '../components/OurStorySection';
import { InquireForm } from '../components/InquireForm';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenInquire }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');

  const categories = ['All', 'Preparation', 'Booking & Pricing', 'Tours & Safety', 'Sister Properties'];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full pt-20">
      {/* 1. HERO - Clean header without artificial tags */}
      <section className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight">
            Frequently Asked <span className="italic text-[#CFA858]">Questions</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F4EDE1]/75 max-w-2xl mx-auto mt-4 font-light leading-relaxed font-serif">
            Everything you need to know about early morning departures, dress etiquette, food hygiene, private charters, and staying at Calcutta Bungalow.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT: ACCORDIONS & CATEGORY FILTER */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1C1917] text-[#FBF8F2] shadow-sm'
                  : 'bg-white text-[#1C1917]/70 hover:bg-stone-100 border border-black/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-3xl border border-[#1C1917]/10 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 sm:p-8 text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-5 h-5 text-[#B48A3C] shrink-0 mt-1" />
                    <div>
                      <span className="text-xs text-[#7A2E22] font-semibold block mb-1 font-serif">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] font-medium leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-[#1C1917]/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#1C1917] text-white' : 'text-[#1C1917]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[#1C1917]/5 text-sm sm:text-base text-[#1C1917]/80 leading-relaxed font-serif pl-14 sm:pl-16">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. REVIEWS */}
      <ReviewsCarousel onSelectTour={(slug) => onNavigate('tour-detail', slug)} />

      {/* 4. OUR STORY (Compact) */}
      <OurStorySection compact={true} onNavigateToStory={() => onNavigate('story')} />

      {/* 5. INQUIRE NOW */}
      <InquireForm />
    </div>
  );
};
