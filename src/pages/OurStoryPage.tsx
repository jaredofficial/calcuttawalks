import React, { useState } from 'react';
import { EXPLORERS_DATA, PHILOSOPHY_CONTENT, Explorer } from '../data/explorers';
import { SafeImage } from '../components/SafeImage';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { InquireForm } from '../components/InquireForm';
import { ScrollTypewriter } from '../components/ScrollTypewriter';
import { 
  Footprints, Heart, BookOpen, Shield, Phone, Mail, 
  Compass, Sparkles, MapPin, Award, CheckCircle2, Quote, ArrowRight 
} from 'lucide-react';

interface OurStoryPageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate, onOpenInquire }) => {
  const [selectedExplorerId, setSelectedExplorerId] = useState<string>(EXPLORERS_DATA[0].id);
  const activeExplorer = EXPLORERS_DATA.find((e) => e.id === selectedExplorerId) || EXPLORERS_DATA[0];

  const storyImages = [
    {
      url: '/images/tours/wm-sovabazar.jpg',
      caption: 'North Calcutta Rajbari courtyards during morning heritage walk',
      tag: 'Heritage Architecture'
    },
    {
      url: '/images/tours/wm-bicycle.jpg',
      caption: 'Dawn cycling along the grand neoclassical boulevards',
      tag: 'Eco-Friendly Urban Exploration'
    },
    {
      url: '/images/tours/wm-cook.jpg',
      caption: 'Cooking intimate Bengali family recipes in a local home',
      tag: 'Culinary Heritage'
    },
    {
      url: '/images/tours/wm-kumartuli.jpg',
      caption: 'Potters shaping sacred clay figures in Kumartuli lanes',
      tag: 'Living Artisans'
    }
  ];

  return (
    <div className="w-full pt-20">
      {/* 1. HERO - Luxurious Header with Atmosphere */}
      <section className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B48A3C]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#7A2E22]/15 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollTypewriter
            as="h1"
            text="Our Philosophy & Our Story"
            highlightWords={['Our Story']}
            highlightClass="italic text-[#CFA858]"
            speed={35}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight"
          />

          <p className="text-base sm:text-xl text-[#F4EDE1]/85 max-w-2xl mx-auto mt-4 font-serif italic leading-relaxed">
            "{PHILOSOPHY_CONTENT.subtitle}"
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-[#F4EDE1]/80">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00AA6C]" /> 10,000+ Departures Conducted
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00AA6C]" /> 50,000+ Walkers Welcomed
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00AA6C]" /> Strictly Zero-Vehicle Walking
            </span>
          </div>
        </div>
      </section>

      {/* 2. PHOTO STRIP - Living Visual Collage */}
      <section className="relative -mt-8 sm:-mt-12 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {storyImages.map((img, i) => (
            <div
              key={i}
              className="group relative h-44 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-[#1C1917] cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <span className="inline-block text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#B48A3C]/80 text-[#1C1917] mb-1">
                  {img.tag}
                </span>
                <p className="text-[11px] leading-tight font-serif text-[#F4EDE1]/90 line-clamp-2">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. NARRATIVE: WELCOME TO OUR WORLD */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <ScrollTypewriter
              as="h2"
              text="Welcome to our World. Our story."
              highlightWords={['World.', 'story.']}
              className="font-serif text-3xl sm:text-4xl text-[#1C1917]"
            />
            <div className="w-16 h-[2px] bg-[#B48A3C]" />
            <p className="text-base sm:text-lg text-[#1C1917]/90 leading-relaxed font-serif italic border-l-2 border-[#B48A3C] pl-4">
              "{PHILOSOPHY_CONTENT.storyIntro}"
            </p>
            <p className="text-sm sm:text-base text-[#1C1917]/80 leading-relaxed font-serif">
              {PHILOSOPHY_CONTENT.teamDescription}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-panel-light p-6 sm:p-7 rounded-3xl border border-[#B48A3C]/30 shadow-md relative overflow-hidden">
              <Quote className="w-12 h-12 text-[#B48A3C]/15 absolute top-4 right-4 pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A2E22]/10 text-[#7A2E22] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Core Principle</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#7A2E22] mb-2 font-semibold">
                Explorers, Not 'Guides'
              </h3>
              <p className="text-xs sm:text-sm text-[#1C1917]/80 leading-relaxed font-serif">
                {PHILOSOPHY_CONTENT.noGuidesNote}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Eco-Friendly Urban Exploration */}
        <div className="mt-20 pt-12 border-t border-[#1C1917]/10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <ScrollTypewriter
              as="h3"
              text="Four Pillars of Our Conservation Work"
              highlightWords={['Four Pillars', 'Conservation Work']}
              highlightClass="italic text-[#7A2E22]"
              speed={35}
              className="font-serif text-2xl sm:text-3xl text-[#1C1917]"
            />
            <p className="text-xs sm:text-sm text-[#1C1917]/60 mt-1 font-serif">
              How our daily footsteps protect the living soul of Calcutta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#1C1917]/10 shadow-xs hover:border-[#B48A3C]/50 hover:shadow-md transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#7A2E22]/10 text-[#7A2E22] flex items-center justify-center mb-3.5">
                <Footprints className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-[#1C1917] mb-2">Pro Calcutta & Eco-Friendly</h4>
              <p className="text-xs sm:text-sm text-[#1C1917]/70 leading-relaxed font-serif">
                We walk the city, rather than tooling around in gas-guzzling, fume-belching vehicles. Walking burns calories, exposes us to conditions faced by the masses, and brings us into closer touch with this vibrant city.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#1C1917]/10 shadow-xs hover:border-[#B48A3C]/50 hover:shadow-md transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#B48A3C]/10 text-[#B48A3C] flex items-center justify-center mb-3.5">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-[#1C1917] mb-2">Patronizing Bengal Crafts</h4>
              <p className="text-xs sm:text-sm text-[#1C1917]/70 leading-relaxed font-serif">
                We make it a point to patronize locally produced goods in the course of our walks. We go in search of indigenous vendors and purveyors of fast-vanishing crafts from a more gracious age.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#1C1917]/10 shadow-xs hover:border-[#B48A3C]/50 hover:shadow-md transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#7A2E22]/10 text-[#7A2E22] flex items-center justify-center mb-3.5">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-[#1C1917] mb-2">Archival Heritage Library</h4>
              <p className="text-xs sm:text-sm text-[#1C1917]/70 leading-relaxed font-serif">
                Our 1,000+ volume research collection preserves maps, rare travelogues, and journals chronicling the architectural transitions of the erstwhile British Indian capital.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#1C1917]/10 shadow-xs hover:border-[#B48A3C]/50 hover:shadow-md transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#B48A3C]/10 text-[#B48A3C] flex items-center justify-center mb-3.5">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-[#1C1917] mb-2">Restoring Heritage Townhouses</h4>
              <p className="text-xs sm:text-sm text-[#1C1917]/70 leading-relaxed font-serif">
                We put our beliefs into physical reality. We lovingly conserved and restored the 1920s townhouse now known as Calcutta Bungalow in North Calcutta, creating sustainable heritage jobs.
              </p>
            </div>
          </div>
        </div>

        {/* 4. REDESIGNED EXPLORERS SPOTLIGHT & GALLERY */}
        <div className="mt-24 pt-16 border-t border-[#1C1917]/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A2E22] block mb-1">
              Meet The Walking Guild
            </span>
            <ScrollTypewriter
              as="h2"
              text="Our Explorers"
              highlightWords={['Explorers']}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917]"
            />
            <p className="text-xs sm:text-sm text-[#1C1917]/70 mt-2 font-serif">
              Not tour guides, but opinionated romantics, scholars, photographers, and architects hopelessly in love with the city.
            </p>
          </div>

          {/* Interactive Explorer Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {EXPLORERS_DATA.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelectedExplorerId(exp.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  selectedExplorerId === exp.id
                    ? 'bg-[#1C1917] text-[#FBF8F2] shadow-md scale-105'
                    : 'bg-white hover:bg-[#F4EDE1] text-[#1C1917]/75 border border-[#1C1917]/10'
                }`}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden border border-[#B48A3C]/40">
                  <img src={exp.avatarUrl} alt={exp.name} className="w-full h-full object-cover" />
                </div>
                <span>{exp.name}</span>
              </button>
            ))}
          </div>

          {/* Hero Feature Card for Selected Explorer */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B48A3C]/30 shadow-xl relative overflow-hidden transition-all duration-500 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 border-[#B48A3C]/30 shadow-xl bg-[#1C1917] transition-transform duration-500 group-hover:scale-102">
                    <SafeImage
                      src={activeExplorer.avatarUrl}
                      alt={activeExplorer.name}
                      fallbackText={activeExplorer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#1C1917] text-[#CFA858] text-[11px] font-semibold border border-[#B48A3C]/40 shadow-md whitespace-nowrap">
                    {activeExplorer.role}
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] mt-6">
                  {activeExplorer.name}
                </h3>
                <p className="text-xs text-[#7A2E22] font-serif italic mt-0.5 font-medium">
                  "{activeExplorer.moniker}"
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  {activeExplorer.phone && (
                    <a
                      href={`tel:${activeExplorer.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4EDE1] hover:bg-[#7A2E22] hover:text-white text-[11px] font-semibold text-[#1C1917] transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#7A2E22]" />
                      <span>{activeExplorer.phone}</span>
                    </a>
                  )}
                  {activeExplorer.email && (
                    <a
                      href={`mailto:${activeExplorer.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4EDE1] hover:bg-[#7A2E22] hover:text-white text-[11px] font-semibold text-[#1C1917] transition-colors"
                    >
                      <Mail className="w-3 h-3 text-[#7A2E22]" />
                      <span>{activeExplorer.email}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#B48A3C]/10 text-[#B48A3C] text-[11px] font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>Senior Explorer Profile</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-[#1C1917]">
                  About {activeExplorer.name.split(' ')[0]}
                </h4>
                <p className="text-xs sm:text-sm text-[#1C1917]/80 leading-relaxed font-serif">
                  {activeExplorer.bio}
                </p>
                <div className="pt-4 border-t border-[#1C1917]/10 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenInquire}
                    className="px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Request a Walk with {activeExplorer.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verbatim Statements */}
        <div className="space-y-10 pt-20 border-t border-[#1C1917]/10 mt-20">
          {PHILOSOPHY_CONTENT.sections.map((sec, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#1C1917]/10 shadow-xs">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] mb-3">
                {sec.heading}
              </h3>
              <p className="text-xs sm:text-sm text-[#1C1917]/80 leading-relaxed font-serif">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Heritage Mission Typewriter Banner */}
        <div className="mt-16 bg-[#1C1917] p-8 sm:p-12 rounded-3xl text-center text-[#F4EDE1] border border-[#B48A3C]/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-[#B48A3C]/10 blur-[100px] rounded-full pointer-events-none" />
          <ScrollTypewriter
            as="h3"
            text="Preserving Kolkata's Living Soul, One Footstep at a Time"
            highlightWords={['Living Soul,', 'Footstep']}
            highlightClass="italic text-[#CFA858]"
            speed={35}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4EDE1] mb-3 leading-snug"
          />
          <p className="text-xs sm:text-sm text-[#F4EDE1]/80 max-w-2xl mx-auto font-serif italic">
            "We believe that a city is not made of bricks and mortar, but of stories, shared tea, morning laughter, and the quiet dignity of its people."
          </p>
        </div>
      </section>

      {/* 5. COMPRESSED SLEEK REVIEWS */}
      <ReviewsCarousel onSelectTour={(slug) => onNavigate('tour-detail', slug)} />

      {/* 6. INQUIRE NOW FORM */}
      <InquireForm />
    </div>
  );
};
