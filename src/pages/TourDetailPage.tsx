import React from 'react';
import { TOURS_DATA, Tour } from '../data/tours';
import { SafeImage } from '../components/SafeImage';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { OurStorySection } from '../components/OurStorySection';
import { InquireForm } from '../components/InquireForm';
import { TourCard } from '../components/TourCard';
import { Clock, MapPin, Users, Check, AlertCircle, ArrowLeft, Calendar, ShieldCheck, Heart } from 'lucide-react';

interface TourDetailPageProps {
  slug: string;
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: (tourSlug?: string) => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({ slug, onNavigate, onOpenInquire }) => {
  const tour = TOURS_DATA.find((t) => t.slug === slug) || TOURS_DATA[0];

  // Related tours (same theme, excluding current)
  const relatedTours = TOURS_DATA.filter((t) => t.id !== tour.id).slice(0, 3);

  const scrollToInquiry = () => {
    const el = document.getElementById('tour-inquiry-form');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full pt-20">
      {/* Back button link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => onNavigate('tours')}
          className="inline-flex items-center gap-1.5 text-xs tracking-wider text-[#1C1917]/70 hover:text-[#7A2E22] transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tours</span>
        </button>
      </div>

      {/* 1. HERO (Title, Area, Themes) */}
      <section className="relative mt-4 py-16 sm:py-24 bg-[#1C1917] text-[#FBF8F2] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={tour.imageUrl}
            alt={tour.title}
            fallbackText={tour.title}
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/60 to-[#1C1917]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Area and Unboxed Themes */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#CFA858] font-medium mb-3">
              <span>{tour.area}</span>
              {tour.themes.map((theme) => (
                <React.Fragment key={theme}>
                  <span aria-hidden="true">·</span>
                  <span>{theme}</span>
                </React.Fragment>
              ))}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight">
              {tour.title}
            </h1>

            <p className="text-base sm:text-xl text-[#F4EDE1]/85 mt-4 font-serif italic">
              {tour.subtitle}
            </p>

            {tour.oneLineHook && (
              <p className="text-sm sm:text-base text-[#F4EDE1]/70 mt-4 leading-relaxed max-w-2xl">
                {tour.oneLineHook}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT + STICKY GLASS QUICK FACTS PANEL */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="font-serif text-3xl text-[#1C1917] mb-4">
                The Journey Overview
              </h2>
              <div className="w-12 h-[2px] bg-[#B48A3C] mb-6" />
              <p className="text-base text-[#1C1917]/80 leading-relaxed font-serif text-lg">
                {tour.overview}
              </p>
            </div>

            {/* What you'll see / Highlights */}
            <div className="pt-8 border-t border-[#1C1917]/10">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] mb-6">
                What You'll Encounter
              </h3>

              <div className="space-y-4">
                {tour.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#1C1917]/5 shadow-sm">
                    <div className="w-7 h-7 rounded-full bg-[#B48A3C]/10 text-[#B48A3C] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-[#1C1917]/85 leading-relaxed font-serif pt-0.5">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Info / Special Instructions */}
            {tour.specialInstructions && tour.specialInstructions.length > 0 && (
              <div className="pt-8 border-t border-[#1C1917]/10">
                <h3 className="font-serif text-2xl text-[#1C1917] mb-6">
                  Practical Information & Guidance
                </h3>
                <div className="p-6 rounded-3xl bg-[#F4EDE1]/50 border border-[#B48A3C]/20 space-y-3">
                  {tour.specialInstructions.map((instruction, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1C1917]/80">
                      <Check className="w-4 h-4 text-[#7A2E22] shrink-0 mt-0.5" />
                      <span>{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            <div className="pt-8 border-t border-[#1C1917]/10">
              <h3 className="font-serif text-2xl text-[#1C1917] mb-6">
                Photographic Glimpses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {tour.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="group aspect-[4/3] rounded-2xl overflow-hidden bg-[#292524] shadow-sm">
                    <SafeImage
                      src={imgUrl}
                      alt={`${tour.title} scene ${idx + 1}`}
                      fallbackText={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Glass Quick Facts Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="glass-panel-light p-6 sm:p-8 rounded-3xl border border-white/80 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-[#B48A3C] block mb-1">
                  Tour Tariffs
                </h3>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
                      ₹{tour.priceShared.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#1C1917]/60 ml-1">/ person (Shared)</span>
                  </div>
                </div>
                <div className="text-xs text-[#7A2E22] font-medium mt-1">
                  Private Walk: ₹{tour.pricePrivate.toLocaleString()} total (Up to 2 pax)
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#1C1917]/10 text-xs">
                {/* Timings */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B48A3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1917] block">Departure & Hours:</span>
                    <span className="text-[#1C1917]/75">{tour.timings}</span>
                    {tour.seasonNote && (
                      <span className="text-[11px] text-[#7A2E22] block mt-0.5">{tour.seasonNote}</span>
                    )}
                  </div>
                </div>

                {/* Meeting Point */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#7A2E22] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1917] block">Meeting Rendezvous:</span>
                    <span className="text-[#1C1917]/75">{tour.meetingPoint}</span>
                  </div>
                </div>

                {/* Group Size */}
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#B48A3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1917] block">Group Intimacy:</span>
                    <span className="text-[#1C1917]/75">{tour.groupSize || 'Max 8 walkers'}</span>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1917] block">Inclusions & Guarantee:</span>
                    <span className="text-[#1C1917]/75">
                      Expert Explorer, local street tea & snacks, verified hygiene, audio-free intimate conversations.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={scrollToInquiry}
                  className="w-full py-3.5 rounded-xl bg-[#7A2E22] hover:bg-[#9B3C2C] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                >
                  Inquire Now for This Tour
                </button>

                <a
                  href={`https://wa.me/919830184030?text=${encodeURIComponent(
                    `Calcutta Walks Enquiry: Hello! I am looking to book "${tour.title}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-white hover:bg-stone-50 text-[#1C1917] text-xs font-medium border border-[#1C1917]/20 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Quick WhatsApp Query</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REVIEWS FOR THIS TOUR */}
      <ReviewsCarousel currentTourSlug={tour.slug} onSelectTour={(slug) => onNavigate('tour-detail', slug)} />

      {/* 4. RELATED TOURS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">
            Related Expeditions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedTours.map((relTour) => (
            <TourCard
              key={relTour.id}
              tour={relTour}
              onSelect={(slug) => onNavigate('tour-detail', slug)}
            />
          ))}
        </div>
      </section>

      {/* 5. OUR STORY (Compact) */}
      <OurStorySection compact={true} onNavigateToStory={() => onNavigate('story')} />

      {/* 6. INQUIRE NOW (Tour Name Pre-filled) */}
      <div id="tour-inquiry-form">
        <InquireForm prefilledTourSlug={tour.slug} />
      </div>
    </div>
  );
};
