import React, { useState } from 'react';
import { TOURS_DATA } from '../data/tours';
import { TourCard } from '../components/TourCard';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { OurStorySection } from '../components/OurStorySection';
import { InquireForm } from '../components/InquireForm';
import { Search, Filter } from 'lucide-react';

interface ToursCatalogPageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: (tourSlug?: string) => void;
}

export const ToursCatalogPage: React.FC<ToursCatalogPageProps> = ({ onNavigate, onOpenInquire }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('All');

  // Merged themes and modes under Theme as requested
  const allThemes = [
    'All',
    'Colonial',
    'Bengali',
    'Architecture',
    'Multicultural',
    'Hooghly',
    'Food',
    'Bazaars',
    'Photography',
    'Wetlands',
    'Walk',
    'Bicycle',
    'River Boat',
    'Car/Coach',
    'Public Transport'
  ];

  const filteredTours = TOURS_DATA.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.overview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = selectedTheme === 'All' || tour.themes.includes(selectedTheme);
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="w-full pt-20">
      {/* 1. HERO - Clean header without AI tags */}
      <section className="py-16 sm:py-24 bg-[#1C1917] text-[#FBF8F2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight">
            Our Walking Trails & <span className="italic text-[#CFA858]">City Experiences</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F4EDE1]/75 max-w-2xl mx-auto mt-4 font-light font-serif">
            Every itinerary is meticulously crafted to bypass clichéd tourist hubs and reveal the soulful architectural secrets of Calcutta.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT WITH SEARCH & UNIFIED THEME FILTER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-[#1C1917]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by neighborhood, monument, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#1C1917]/10 focus:border-[#7A2E22] focus:outline-none text-sm text-[#1C1917] shadow-sm font-sans"
            />
          </div>
        </div>

        {/* Theme Filter Controls */}
        <div className="glass-panel-light p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#1C1917]/10 mb-12 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917]/80 mb-3">
            <Filter className="w-3.5 h-3.5 text-[#7A2E22]" />
            <span>Theme:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {allThemes.map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedTheme === theme
                    ? 'bg-[#1C1917] text-[#FBF8F2] shadow-sm'
                    : 'bg-white/80 text-[#1C1917]/80 hover:bg-white hover:text-[#1C1917] border border-black/5'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onSelect={(slug) => onNavigate('tour-detail', slug)}
            />
          ))}
        </div>
      </section>

      {/* 3. REVIEWS */}
      <ReviewsCarousel onSelectTour={(slug) => onNavigate('tour-detail', slug)} />

      {/* 4. OUR STORY */}
      <OurStorySection onNavigateToStory={() => onNavigate('story')} />

      {/* 5. INQUIRE NOW */}
      <InquireForm />
    </div>
  );
};
