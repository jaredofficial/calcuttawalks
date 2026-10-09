import React from 'react';
import { EXPLORERS_DATA, PHILOSOPHY_CONTENT } from '../data/explorers';
import { SafeImage } from './SafeImage';
import { ArrowRight } from 'lucide-react';
import { ScrollTypewriter } from './ScrollTypewriter';

interface OurStorySectionProps {
  compact?: boolean;
  onNavigateToStory: () => void;
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({ compact = false, onNavigateToStory }) => {
  const founder = EXPLORERS_DATA[0]; // Iftekhar Ahsan

  if (compact) {
    return (
      <section className="py-14 bg-[#FBF8F2] border-t border-[#1C1917]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel-light p-6 sm:p-7 rounded-2xl border border-white/80 shadow-xs flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#B48A3C]/40 shadow-inner bg-[#292524]">
              <SafeImage
                src={founder.avatarUrl}
                alt={founder.name}
                fallbackText={founder.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917]">
                Welcome to our World. Our story.
              </h3>
              <p className="text-xs sm:text-sm text-[#1C1917]/75 mt-1.5 leading-relaxed font-serif">
                {PHILOSOPHY_CONTENT.storyIntro}
              </p>
            </div>
            <button
              onClick={onNavigateToStory}
              className="shrink-0 px-4 py-2 rounded-full border border-[#1C1917] text-xs font-semibold uppercase tracking-wider text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FBF8F2] transition-colors whitespace-nowrap cursor-pointer"
            >
              Our Philosophy & Explorers
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-[#FBF8F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white aspect-[4/5] bg-[#292524]">
                <SafeImage
                  src={founder.avatarUrl}
                  alt={founder.name}
                  fallbackText="Iftekhar Ahsan, Founder"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h4 className="font-serif text-xl font-medium">
                    {founder.name}
                  </h4>
                  <p className="text-[11px] text-white/80 mt-0.5 italic font-serif">
                    {founder.moniker} · Founder of Calcutta Walks
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy verbatim from calcuttawalks.com */}
          <div className="lg:col-span-7">
            <ScrollTypewriter
              as="h2"
              text="Welcome to our World. Our story."
              highlightWords={['Our story.']}
              className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1C1917] leading-tight"
            />

            <p className="text-sm sm:text-base text-[#1C1917]/85 mt-5 leading-relaxed font-serif italic">
              "{PHILOSOPHY_CONTENT.storyIntro}"
            </p>

            <div className="space-y-3.5 mt-5 text-xs sm:text-sm text-[#1C1917]/75 leading-relaxed font-serif">
              <p>
                {PHILOSOPHY_CONTENT.teamDescription}
              </p>
              <p>
                {PHILOSOPHY_CONTENT.noGuidesNote}
              </p>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <button
                onClick={onNavigateToStory}
                className="px-5 py-2.5 rounded-full bg-[#1C1917] text-[#FBF8F2] text-xs uppercase tracking-wider font-semibold hover:bg-[#7A2E22] transition-colors flex items-center gap-2 group shadow-sm cursor-pointer"
              >
                <span>Read Full Philosophy & Meet Explorers</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
