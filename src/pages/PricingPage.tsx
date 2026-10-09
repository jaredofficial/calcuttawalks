import React, { useState } from 'react';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { InquireForm } from '../components/InquireForm';
import { ScrollTypewriter } from '../components/ScrollTypewriter';
import { 
  Check, ShieldCheck, Users, Clock, Coffee, Sparkles, 
  ArrowRight, MessageSquare, Award, Percent, Car, Compass, Camera 
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: (tourSlug?: string) => void;
  onOpenBooking?: (tourSlug?: string, price?: number) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onOpenInquire, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'walking' | 'food' | 'car' | 'specialist' | 'groups'>('walking');

  const handleBook = (tourSlug?: string, price?: number) => {
    if (onOpenBooking) {
      onOpenBooking(tourSlug, price);
    } else {
      onOpenInquire(tourSlug);
    }
  };

  const tabs = [
    { id: 'walking', label: 'Walking Tours', badge: 'Most Popular' },
    { id: 'food', label: 'Culinary & Cooking', badge: 'Authentic' },
    { id: 'car', label: 'Chauffeured City Tours', badge: 'Comfort' },
    { id: 'specialist', label: 'Cycle, River & Photo', badge: 'Experiences' },
    { id: 'groups', label: 'Group & NGO Discounts', badge: '10-20% Off' }
  ];

  return (
    <div className="w-full pt-20">
      {/* 1. HERO */}
      <section className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B48A3C]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight">
            Transparent Pricing: <span className="italic text-[#CFA858]">What We Cost for What</span>
          </h1>

          <p className="text-base sm:text-lg text-[#F4EDE1]/85 max-w-2xl mx-auto mt-4 font-light leading-relaxed font-serif">
            Every departure is led by a dedicated Explorer, strictly capped in group size, and includes traditional refreshments and entry fees.
          </p>

          {/* Quick reassurance tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#F4EDE1]/75">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#00AA6C]" /> No Hidden Fees
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#00AA6C]" /> Free Rescheduling Up to 24h
            </span>
          </div>
        </div>
      </section>

      {/* 2. SALES-OPTIMIZED TABBED SECTION */}
      <section className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`group relative px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#1C1917] text-[#FBF8F2] shadow-lg scale-102'
                  : 'bg-white hover:bg-[#F4EDE1] text-[#1C1917]/75 border border-[#1C1917]/10'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#B48A3C] text-[#1C1917]'
                      : 'bg-stone-100 text-stone-600 group-hover:bg-[#B48A3C]/20'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT: 1. WALKING TOURS */}
        {activeTab === 'walking' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {/* Tier 1: Shared Walk */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1C1917]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2E22]">
                  Most Popular Choice
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-2">
                  Shared Walking Tour
                </h3>
                <p className="text-xs text-[#1C1917]/70 font-serif leading-relaxed mb-4">
                  Join fellow international walkers on our signature morning trails across North, Central, or Colonial Kolkata.
                </p>

                <div className="my-5 pb-5 border-b border-[#1C1917]/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
                      ₹2,500
                    </span>
                    <span className="text-xs text-stone-500 font-serif">/ person (~$30 USD)</span>
                  </div>
                  <span className="text-[11px] text-[#00AA6C] font-semibold mt-1 block">
                    Strictly max 8 walkers per Explorer
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-[#1C1917]/80 font-serif">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
                    <span>3 to 3.5 hours immersive walking discovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
                    <span>Traditional breakfast & earthen cups of cha</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
                    <span>Expert Explorer guidance & storytelling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
                    <span>All heritage monument & temple entry permissions</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1C1917]/10">
                <button
                  onClick={() => handleBook('white-town-walk', 2500)}
                  className="w-full py-3 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Book Shared Walk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tier 2: Private & Exclusive (Featured) */}
            <div className="bg-[#1C1917] text-[#FBF8F2] rounded-3xl p-6 sm:p-7 border-2 border-[#B48A3C] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative hover:-translate-y-1">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#B48A3C] text-[#1C1917] text-[10px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
                Premium Bespoke Experience
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#CFA858]">
                  Exclusive To Your Group
                </span>
                <h3 className="font-serif text-2xl text-[#F4EDE1] mt-1 mb-2">
                  Private & Bespoke Walk
                </h3>
                <p className="text-xs text-[#F4EDE1]/75 font-serif leading-relaxed mb-4">
                  Reserve a dedicated Explorer solely for yourself, your partner, or your private family group with custom start times.
                </p>

                <div className="my-5 pb-5 border-b border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F4EDE1]">
                      ₹4,000
                    </span>
                    <span className="text-xs text-stone-400 font-serif">/ person (~$48 USD)</span>
                  </div>
                  <span className="text-[11px] text-[#CFA858] font-semibold mt-1 block">
                    Tailored pace & flexible departure time
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-[#F4EDE1]/85 font-serif">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#CFA858] shrink-0 mt-0.5" />
                    <span>100% private Explorer dedicated solely to you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#CFA858] shrink-0 mt-0.5" />
                    <span>Choose your start time (6:30 AM – 4:00 PM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#CFA858] shrink-0 mt-0.5" />
                    <span>Curated gourmet tasting & heritage breakfast</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#CFA858] shrink-0 mt-0.5" />
                    <span>Deep-dive historical focus tailored to interests</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleBook('white-town-walk', 4000)}
                  className="w-full py-3 rounded-full bg-[#B48A3C] hover:bg-[#CFA858] text-[#1C1917] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Book Private Walk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tier 3: Walk with Private Car Pick-up & Drop */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1C1917]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B48A3C]">
                  Door-to-Door Convenience
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-2">
                  Walk + Car Hotel Transfer
                </h3>
                <p className="text-xs text-[#1C1917]/70 font-serif leading-relaxed mb-4">
                  Includes air-conditioned chauffeured car pickup from your Kolkata hotel to the walk start point and return drop.
                </p>

                <div className="my-5 pb-5 border-b border-[#1C1917]/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
                      ₹5,000
                    </span>
                    <span className="text-xs text-stone-500 font-serif">/ person (~$60 USD)</span>
                  </div>
                  <span className="text-[11px] text-[#00AA6C] font-semibold mt-1 block">
                    Zero transit hassle from any hotel
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-[#1C1917]/80 font-serif">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
                    <span>Private AC car hotel pickup & drop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
                    <span>Full private or shared heritage walk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
                    <span>Complete breakfast, chai, and water bottles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
                    <span>Chauffeur waits throughout the tour</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1C1917]/10">
                <button
                  onClick={() => handleBook('white-town-walk', 5000)}
                  className="w-full py-3 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Book with Hotel Transfer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 2. FOOD & CULINARY */}
        {activeTab === 'food' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1C1917]/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2E22]">
                  Legendary Street Flavors
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-2">
                  Street Food Walk
                </h3>
                <div className="my-4 pb-4 border-b border-[#1C1917]/10">
                  <span className="font-serif text-3xl font-bold text-[#1C1917]">₹3,000</span>
                  <span className="text-xs text-stone-500 font-serif ml-1.5">/ person (Shared)</span>
                  <p className="text-[11px] text-[#1C1917]/60 mt-1">₹4,000 / person for Private</p>
                </div>
                <ul className="space-y-2 text-xs text-[#1C1917]/80 font-serif">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> 8+ historic street tastings</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Verified hygienic heritage cabins</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Kathi rolls, phuchka, mishti & cha</li>
                </ul>
              </div>
              <button
                onClick={() => onOpenInquire('culinary-walk')}
                className="mt-6 w-full py-2.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Book Street Food Walk
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#B48A3C]/40 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B48A3C]">
                  Hands-On Home Kitchen
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-2">
                  Bengali Cooking Class
                </h3>
                <div className="my-4 pb-4 border-b border-[#1C1917]/10">
                  <span className="font-serif text-3xl font-bold text-[#1C1917]">₹4,000</span>
                  <span className="text-xs text-stone-500 font-serif ml-1.5">/ person (Shared)</span>
                  <p className="text-[11px] text-[#1C1917]/60 mt-1">₹5,000 / person for Private</p>
                </div>
                <ul className="space-y-2 text-xs text-[#1C1917]/80 font-serif">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Cook in an authentic Bengali home</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Master 5 traditional courses & spices</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Full sit-down banquet with family</li>
                </ul>
              </div>
              <button
                onClick={() => onOpenInquire('bengali-cooking-class')}
                className="mt-6 w-full py-2.5 rounded-full bg-[#7A2E22] hover:bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Book Cooking Class
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1C1917]/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                  Traditional Thali
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-2">
                  Bengali Lunch / Dinner
                </h3>
                <div className="my-4 pb-4 border-b border-[#1C1917]/10">
                  <span className="font-serif text-3xl font-bold text-[#1C1917]">₹1,499</span>
                  <span className="text-xs text-stone-500 font-serif ml-1.5">/ person</span>
                  <p className="text-[11px] text-[#1C1917]/60 mt-1">Available at Calcutta Bungalow</p>
                </div>
                <ul className="space-y-2 text-xs text-[#1C1917]/80 font-serif">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Multi-course royal Bengali spread</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Vegetarian, fish & meat options</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Served in heritage courtyard setting</li>
                </ul>
              </div>
              <button
                onClick={() => onOpenInquire('bengali-cooking-class')}
                className="mt-6 w-full py-2.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Reserve Meal
              </button>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 3. CHAUFFEURED CAR CITY TOURS */}
        {activeTab === 'car' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-3xl p-7 border border-[#1C1917]/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A2E22]">
                  ~4 Hours Exploration
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] mt-1 mb-2">
                  Half Day City Tour
                </h3>
                <p className="text-xs text-[#1C1917]/70 font-serif mb-4">
                  Victoria Memorial, St. Paul's Cathedral, South Park Street Cemetery, and Prinsep Ghat with chauffeured car.
                </p>
                <div className="my-4 pb-4 border-b border-[#1C1917]/10">
                  <span className="font-serif text-4xl font-bold text-[#1C1917]">₹5,000</span>
                  <span className="text-xs text-stone-500 font-serif ml-1.5">/ person</span>
                </div>
                <ul className="space-y-2 text-xs text-[#1C1917]/80 font-serif">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Private AC sedan/SUV + Explorer guide</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> All monument ticketing fees covered</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Hotel pickup and drop included</li>
                </ul>
              </div>
              <button
                onClick={() => onOpenInquire('car-coach-city-tour')}
                className="mt-6 w-full py-3 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Book Half Day City Tour
              </button>
            </div>

            <div className="bg-[#1C1917] text-[#FBF8F2] rounded-3xl p-7 border border-[#B48A3C]/40 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#CFA858]">
                  ~8 Hours Grand Journey
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EDE1] mt-1 mb-2">
                  Full Day City Tour
                </h3>
                <p className="text-xs text-[#F4EDE1]/70 font-serif mb-4">
                  North to South comprehensive discovery: Marble Palace, Kumartuli, Mother Teresa House, Victoria & Howrah.
                </p>
                <div className="my-4 pb-4 border-b border-white/10">
                  <span className="font-serif text-4xl font-bold text-[#F4EDE1]">₹7,000</span>
                  <span className="text-xs text-stone-400 font-serif ml-1.5">/ person</span>
                </div>
                <ul className="space-y-2 text-xs text-[#F4EDE1]/80 font-serif">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#CFA858]" /> Full-day AC vehicle & driver at disposal</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#CFA858]" /> Authentic Bengali lunch included</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#CFA858]" /> All entry fees, water & permits covered</li>
                </ul>
              </div>
              <button
                onClick={() => onOpenInquire('car-coach-city-tour')}
                className="mt-6 w-full py-3 rounded-full bg-[#B48A3C] hover:bg-[#CFA858] text-[#1C1917] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Book Full Day City Tour
              </button>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 4. CYCLE, RIVER & SPECIALIST */}
        {activeTab === 'specialist' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1C1917]/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2E22]">
                  Dawn Cycling
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-2">
                  Calcutta on Bicycle
                </h3>
                <div className="my-4 pb-4 border-b border-[#1C1917]/10">
                  <span className="font-serif text-3xl font-bold text-[#1C1917]">₹3,000</span>
                  <span className="text-xs text-stone-500 font-serif ml-1.5">/ person</span>
                </div>
                <ul className="space-y-2 text-xs text-[#1C1917]/80 font-serif">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Geared bicycle & helmet provided</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> 12km tranquil morning circuit</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Cha & breakfast stop by the river</li>
                </ul>
              </div>
              <button
                onClick={() => onOpenInquire('bicycle-tour')}
                className="mt-6 w-full py-2.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Book Bicycle Tour
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1C1917]/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B48A3C]">
                  Ganges Waterway
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-2">
                  Sunset River Cruise
                </h3>
                <div className="my-4 pb-4 border-b border-[#1C1917]/10">
                  <span className="font-serif text-3xl font-bold text-[#1C1917]">₹3,500</span>
                  <span className="text-xs text-stone-500 font-serif ml-1.5">/ person</span>
                </div>
                <ul className="space-y-2 text-xs text-[#1C1917]/80 font-serif">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Traditional wooden riverboat hire</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Princep Ghat to Howrah Bridge</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Tea & live boatman songs on the water</li>
                </ul>
              </div>
              <button
                onClick={() => onOpenInquire('sunset-river-cruise')}
                className="mt-6 w-full py-2.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Book River Cruise
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1C1917]/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                  Photography Lead
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-2">
                  Heritage Photo Walk
                </h3>
                <div className="my-4 pb-4 border-b border-[#1C1917]/10">
                  <span className="font-serif text-3xl font-bold text-[#1C1917]">₹4,000</span>
                  <span className="text-xs text-stone-500 font-serif ml-1.5">/ person</span>
                </div>
                <ul className="space-y-2 text-xs text-[#1C1917]/80 font-serif">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Led by NatGeo alumni & Rahul</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Golden hour light in historic alleys</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00AA6C]" /> Composition tips & portrait access</li>
                </ul>
              </div>
              <button
                onClick={() => onOpenInquire()}
                className="mt-6 w-full py-2.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Book Photo Walk
              </button>
            </div>
          </div>
        )}

        {/* TAB CONTENT: 5. GROUPS & BESPOKE */}
        {activeTab === 'groups' && (
          <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#B48A3C]/30 shadow-lg max-w-4xl mx-auto animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="font-serif text-3xl text-[#1C1917]">
                Discounts for Groups, NGOs & Students
              </h3>
              <p className="text-xs sm:text-sm text-[#1C1917]/70 mt-2 font-serif italic">
                "We are a company with a conscience so please feel free to write to us for pricing for bigger groups, NGOs, children, students or educational faculties."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="p-5 rounded-2xl bg-[#F4EDE1] border border-[#B48A3C]/20 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#7A2E22] text-white flex items-center justify-center font-bold text-lg shrink-0">
                  10%
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#1C1917]">Group Size 10+ Walkers</h4>
                  <p className="text-xs text-[#1C1917]/70 mt-0.5 font-serif">
                    Automatic 10% discount applied to all participants across shared or private bookings.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4EDE1] border border-[#B48A3C]/20 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#B48A3C] text-[#1C1917] flex items-center justify-center font-bold text-lg shrink-0">
                  20%
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#1C1917]">Group Size 20+ Walkers</h4>
                  <p className="text-xs text-[#1C1917]/70 mt-0.5 font-serif">
                    Automatic 20% discount with multiple dedicated Explorers assigned to keep groups intimate.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-[#1C1917]/10">
              <button
                onClick={() => onOpenInquire()}
                className="px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Inquire for Group or Custom Quote →
              </button>
            </div>
          </div>
        )}

        {/* Policy & Reassurance Footer Note */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#F4EDE1]/70 border border-[#1C1917]/10 max-w-3xl mx-auto text-center text-xs text-[#1C1917]/70 font-serif">
          <p>
            * Note: Minimum 2 persons needed to run a scheduled departure, or 1 willing to cover for 2. Children under 8 join complimentary when accompanied by parents.
          </p>
        </div>
      </section>

      {/* 3. REVIEWS */}
      <ReviewsCarousel onSelectTour={(slug) => onNavigate('tour-detail', slug)} />

      {/* 4. INQUIRE NOW FORM */}
      <InquireForm />
    </div>
  );
};
