import React, { useState } from 'react';
import { TOURS_DATA } from '../data/tours';
import { TourCard } from '../components/TourCard';
import { PressStrip } from '../components/PressStrip';
import { NumbersCounter } from '../components/NumbersCounter';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { OurStorySection } from '../components/OurStorySection';
import { InquireForm } from '../components/InquireForm';
import { ScrollTypewriter } from '../components/ScrollTypewriter';
import { AnimatedReveal } from '../components/AnimatedReveal';
import { ArrowDown, Filter, Play, X } from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: (tourSlug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenInquire }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // All modes and themes unified under Theme as requested
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
    return selectedTheme === 'All' || tour.themes.includes(selectedTheme);
  });

  return (
    <div className="w-full">
      {/* 1. HERO SECTION WITH YOUTUBE BACKGROUND VIDEO */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between pt-24 pb-14 sm:pb-20 overflow-hidden bg-[#1C1917] text-[#FBF8F2]">
        {/* Full-bleed background with YouTube Video 71J32HLQ5Ko */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/images/tours/wm-raj.jpg"
            alt="Calcutta Walks Background"
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320vw] h-[320vh] min-w-[177.77vh] min-h-[56.25vw] pointer-events-none opacity-80 mix-blend-screen scale-110">
            <iframe
              src="https://www.youtube-nocookie.com/embed/71J32HLQ5Ko?autoplay=1&mute=1&controls=0&loop=1&playlist=71J32HLQ5Ko&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1"
              title="Calcutta Walks Heritage Tour"
              className="w-full h-full border-0 pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/65 to-[#1C1917]/75" />
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        </div>

        {/* Hero Content with Entrance Animation */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto pt-6 sm:pt-10">
          <AnimatedReveal animation="fade-down" duration={900}>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F4EDE1] leading-[1.1] tracking-tight">
              Discover Calcutta, <br className="hidden sm:inline" />
              <span className="italic font-light text-[#CFA858]">one step at a time.</span>
            </h1>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={200} duration={800}>
            <p className="mt-5 text-sm sm:text-lg text-[#F4EDE1]/80 max-w-xl mx-auto font-light leading-relaxed">
              Intimate walking tours, river voyages, and culinary chronicles led by passionate local Explorers through 300 years of living history.
            </p>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={400} duration={800}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5">
              <button
                onClick={() => {
                  const toursElement = document.getElementById('our-tours-section');
                  toursElement?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#B48A3C] to-[#CFA858] hover:from-[#c29643] hover:to-[#dbb464] text-[#1C1917] font-semibold text-xs uppercase tracking-widest transition-all shadow-md shadow-[#B48A3C]/20 hover:scale-[1.02] cursor-pointer"
              >
                Explore Tours
              </button>

              <button
                onClick={() => onOpenInquire()}
                className="w-full sm:w-auto px-7 py-3 rounded-full glass-panel-dark text-[#F4EDE1] hover:bg-white/20 text-xs font-semibold uppercase tracking-widest transition-all border border-white/25 cursor-pointer"
              >
                Inquire Now
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#F4EDE1] text-xs font-semibold uppercase tracking-widest transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <Play className="w-3.5 h-3.5 fill-[#CFA858] text-[#CFA858]" />
                <span>Watch Film</span>
              </button>
            </div>
          </AnimatedReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 text-center pb-2 flex flex-col items-center gap-2">
          <button
            onClick={() => {
              const toursElement = document.getElementById('our-tours-section');
              toursElement?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#F4EDE1]/50 hover:text-[#F4EDE1] text-[11px] uppercase tracking-widest inline-flex flex-col items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Scroll to Explore</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </button>
        </div>
      </section>

      {/* CINEMATIC VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <div className="p-4 sm:p-5 bg-[#1C1917] flex items-center justify-between border-b border-white/10">
              <span className="font-serif text-base sm:text-lg text-[#F4EDE1] font-semibold">
                Calcutta Walks — The Spirit of the City
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                aria-label="Close video"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/71J32HLQ5Ko?autoplay=1&rel=0&modestbranding=1"
                title="Calcutta Walks Video Player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-[#1C1917] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F4EDE1]/70">
              <span>Experience these streets with our local Explorers.</span>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onOpenInquire();
                }}
                className="px-5 py-2 rounded-full bg-[#B48A3C] text-[#1C1917] font-semibold uppercase tracking-wider hover:bg-[#CFA858] transition-colors"
              >
                Inquire For This Walk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRESS LOGOS STRIP */}
      <AnimatedReveal animation="fade-up" delay={150}>
        <PressStrip />
      </AnimatedReveal>

      {/* 2. OUR TOURS CATALOG SECTION */}
      <section id="our-tours-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Scroll-triggered typewriter header */}
          <ScrollTypewriter
            as="h2"
            text="Our Walking & City Tours"
            highlightWords={['Tours']}
            className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1C1917] leading-tight"
          />
          <div className="w-12 h-[1px] bg-[#B48A3C]/40 mx-auto mt-3 mb-3" />
          <p className="text-xs sm:text-sm text-[#1C1917]/70 leading-relaxed font-serif">
            Select a theme to explore Kolkata's heritage, architecture, river life, and vibrant street culture.
          </p>
        </div>

        {/* Theme Filter Controls */}
        <AnimatedReveal animation="fade-up" delay={100}>
          <div className="glass-panel-light p-3.5 sm:p-5 rounded-2xl border border-[#1C1917]/10 mb-8 shadow-xs">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#1C1917]/80 mb-2.5">
              <Filter className="w-3 h-3 text-[#7A2E22]" />
              <span>Theme:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {allThemes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTheme === theme
                      ? 'bg-[#1C1917] text-[#FBF8F2] shadow-xs'
                      : 'bg-white/80 text-[#1C1917]/80 hover:bg-white hover:text-[#1C1917] border border-black/5'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </AnimatedReveal>

        {/* Tours Grid with Staggered Entrance Animations */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredTours.map((tour, idx) => (
              <AnimatedReveal
                key={tour.id}
                animation="fade-up"
                delay={Math.min(idx * 75, 450)}
              >
                <TourCard
                  tour={tour}
                  onSelect={(slug) => onNavigate('tour-detail', slug)}
                />
              </AnimatedReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl p-6 border border-stone-200">
            <p className="font-serif text-xl text-[#1C1917]">No tours match this theme</p>
            <p className="text-xs text-[#1C1917]/60 mt-2">Select "All" to view our complete repertoire.</p>
            <button
              onClick={() => setSelectedTheme('All')}
              className="mt-4 px-4 py-2 rounded-full bg-[#1C1917] text-white text-xs font-medium"
            >
              Reset to All
            </button>
          </div>
        )}
      </section>

      {/* 3. NUMBERS SECTION */}
      <AnimatedReveal animation="fade-in">
        <NumbersCounter />
      </AnimatedReveal>

      {/* 4. REVIEWS SECTION */}
      <AnimatedReveal animation="fade-up">
        <ReviewsCarousel onSelectTour={(slug) => onNavigate('tour-detail', slug)} />
      </AnimatedReveal>

      {/* 5. OUR STORY SECTION */}
      <AnimatedReveal animation="fade-up">
        <OurStorySection onNavigateToStory={() => onNavigate('story')} />
      </AnimatedReveal>

      {/* 6. INQUIRE NOW FULL-WIDTH SECTION */}
      <AnimatedReveal animation="fade-up">
        <InquireForm />
      </AnimatedReveal>
    </div>
  );
};
