import React, { useState } from 'react';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { InquireForm } from '../components/InquireForm';
import { SafeImage } from '../components/SafeImage';
import { 
  ExternalLink, Calendar, User, BookOpen, Quote, 
  X, ArrowUpRight, Award, Newspaper, ArrowRight 
} from 'lucide-react';

export interface MediaArticle {
  id: string;
  outlet: string;
  outletLogo?: string;
  category: 'international' | 'national' | 'magazine';
  categoryLabel: string;
  headline: string;
  date: string;
  author?: string;
  excerpt: string;
  fullText: string;
  externalUrl: string;
  imageUrl: string;
  tag?: string;
}

const MEDIA_ARTICLES: MediaArticle[] = [
  {
    id: 'nyt-walk-calcutta',
    outlet: 'The New York Times',
    category: 'international',
    categoryLabel: 'International Press',
    headline: 'A Walk in Calcutta: Uncovering 300 Years of Living Empire',
    date: 'April 2009',
    author: 'Ellen Barry',
    excerpt: 'Calcutta Walks leads visitors off the smog-choked vehicular thoroughfares and straight into the quiet colonnades of Dalhousie Square, where the erstwhile capital of British India reveals its layered architectural majesty.',
    fullText: 'Iftekhar Ahsan, founder of Calcutta Walks, began guiding small clusters of travelers on foot when the rest of the city believed walking was something to be avoided. His belief: you cannot know Calcutta through the sealed window of an air-conditioned coach. To feel the pulse of this former imperial capital, one must dodge hand-pulled rickshaws, inhale the aroma of freshly fried kochuris in Bowbazar, and gaze up at the ionic pilasters of 18th-century mansions that developers have not yet razed.',
    externalUrl: 'https://calcuttawalks.com/media-coverage/',
    imageUrl: '/images/tours/wm-raj.jpg',
    tag: 'Cover Story'
  },
  {
    id: 'telegraph-heritage-lane',
    outlet: 'The Telegraph',
    category: 'national',
    categoryLabel: 'National Daily',
    headline: 'A Trip Down Heritage Lane with FICCI Ladies Organisation',
    date: 'April 2018',
    author: 'Special Correspondent',
    excerpt: 'Guided by Explorer Iftekhar Ahsan of Calcutta Walks, members walked through the hidden bylanes of Dalhousie Square and Black Town, admiring architectural nuances that have withstood centuries of neglect.',
    fullText: 'The Telegraph documented the colonial heritage discovery organized by the FICCI Ladies Organisation Kolkata, led by Calcutta Walks. The walk commenced in the quiet morning light at St. John’s Churchyard, weaving past Job Charnock’s mausoleum, the Black Hole monument site, and the terracotta courtyards of North Calcutta. "It wasn\'t just history from textbooks," remarked participants, "it was human emotion, urban anecdotes, and a heartfelt plea to preserve the living fabric of Kolkata."',
    externalUrl: 'https://calcuttawalks.com/media-coverage/',
    imageUrl: '/images/tours/wm-chowringhee.jpg'
  },
  {
    id: 'lonely-planet-definitive',
    outlet: 'Lonely Planet Magazine',
    category: 'magazine',
    categoryLabel: 'Travel Guidebook',
    headline: 'Weekend Planner: The Definitive Way to Explore Kolkata by Foot',
    date: 'October 2016',
    author: 'Michael Grosberg',
    excerpt: 'Consistently ranked as Kolkata\'s premier walking outfit. Their passionate, scholarly Explorers conduct intimate walks without loud megaphones, opening doors to private rajbaris and colonial courtyards inaccessible to regular tourists.',
    fullText: 'Lonely Planet recommends Calcutta Walks as an essential experience for anyone visiting Eastern India. Rather than standard tour guides, Calcutta Walks assigns specialized Explorers — architects, journalists, and historians — who turn early-morning strolls through Sovabazar and College Street into mesmerizing intellectual journeys. Their small-group policy (capped strictly at eight walkers) ensures you never feel like a herd of tourists.',
    externalUrl: 'https://calcuttawalks.com/media-coverage/',
    imageUrl: '/images/tours/wm-sovabazar.jpg',
    tag: 'Top Pick'
  },
  {
    id: 'telegraph-bungalow-restoration',
    outlet: 'The Telegraph',
    category: 'national',
    categoryLabel: 'Heritage Restoration',
    headline: 'Restoration of The Calcutta Bungalow: Breathing Life into a 1920s Townhouse',
    date: 'May 2018',
    author: 'Heritage & Living Desk',
    excerpt: 'Calcutta Walks put its conservation philosophy into physical reality, painstakingly restoring a 1920s North Calcutta townhouse into a sustainable heritage residence without altering its historic character.',
    fullText: 'Rather than complaining about the ongoing demolition of classic Bengal townhouses, the team behind Calcutta Walks took matters into their own hands. In the historic neighbourhood of Fariapukur, they spent years restoring a 1920s townhouse, retaining the green louvred windows, vintage switchboards, cast-iron railings, and antique four-poster beds. The project has proven that heritage conservation can create local jobs and viable cultural tourism.',
    externalUrl: 'https://calcuttawalks.com/media-coverage/',
    imageUrl: '/images/tours/wm-sovabazar.jpg'
  },
  {
    id: 'conde-nast-confluence',
    outlet: 'Condé Nast Traveller',
    category: 'magazine',
    categoryLabel: 'Travel Magazine',
    headline: 'The Confluence of Cultures in Bow Barracks & Chitpur',
    date: 'December 2017',
    author: 'Salil Tripathi',
    excerpt: 'From the Armenian Church to the Maghen David Synagogue and Anglo-Indian bakeries, Calcutta Walks showcases how this city was truly Asia’s original cosmopolitan melting pot.',
    fullText: 'Condé Nast Traveller features the "Confluence of Cultures" walk, where walkers explore Kolkata’s multi-faith heritage before the city begins its cacophony. Within a single square kilometre, one visits the oldest Armenian church in India, Portuguese cathedrals, Chinese breakfast stalls in Tiretta Bazaar, and Jewish synagogues with stained glass domes.',
    externalUrl: 'https://calcuttawalks.com/media-coverage/',
    imageUrl: '/images/tours/wm-confluence.jpg'
  },
  {
    id: 'natgeo-kumartuli',
    outlet: 'National Geographic Traveller',
    category: 'magazine',
    categoryLabel: 'Documentary',
    headline: 'North Calcutta Heritage by Foot: Clay Artisans of the Ganga',
    date: 'September 2019',
    author: 'National Geographic Features',
    excerpt: 'Walking alongside the River Hooghly at dawn into Kumartuli, where multi-generational sculptor guilds transform sacred river silt and straw into majestic deities.',
    fullText: 'National Geographic highlighted Calcutta Walks\' specialized photo walks and artisan trails led by photojournalist Rahul. Walkers are introduced respectfully to master sculptors in Kumartuli whose families have shaped clay for over a century, offering unparalleled cultural insight without commercial exploitation.',
    externalUrl: 'https://calcuttawalks.com/media-coverage/',
    imageUrl: '/images/tours/wm-kumartuli.jpg'
  },
  {
    id: 'wsj-treasures',
    outlet: 'The Wall Street Journal',
    category: 'international',
    categoryLabel: 'International Press',
    headline: 'Urban Treasures in India\'s Cultural Capital',
    date: 'February 2015',
    author: 'WSJ Travel',
    excerpt: 'Calcutta Walks captures the nostalgic elegance of a city that was once the second city of the British Empire, celebrating its vernacular architecture and street cuisine.',
    fullText: 'The Wall Street Journal praised Calcutta Walks for curating immersive routes that celebrate both high colonial architecture and grassroots Bengali street culture. The breakfast walk through central cabin eateries was praised for showing travelers the culinary soul of the metropolis.',
    externalUrl: 'https://calcuttawalks.com/media-coverage/',
    imageUrl: '/images/tours/wm-streetfood.jpg'
  },
  {
    id: 'hindu-vanishing-heritage',
    outlet: 'The Hindu',
    category: 'national',
    categoryLabel: 'National Daily',
    headline: 'Walking Through Calcutta\'s Vanishing Architectural Heritage',
    date: 'November 2014',
    author: 'Kolkata Bureau',
    excerpt: 'How Iftekhar Ahsan and his guild of fellow Explorers turned walking into a conservation movement, educating locals and foreigners alike on preserving vintage streetscapes.',
    fullText: 'The Hindu featured Calcutta Walks\' advocacy for pedestrian-friendly city design, environmental awareness, and civic pride. By walking over 110,000 kilometres, the collective has built an archival library of over 1,000 historical texts and helped document threatened structures across North and Central Kolkata.',
    externalUrl: 'https://calcuttawalks.com/media-coverage/',
    imageUrl: '/images/tours/wm-publictransport.jpg'
  },
  {
    id: 'telegraph-khaitan-series',
    outlet: 'The Telegraph',
    category: 'national',
    categoryLabel: 'National Daily',
    headline: 'The Telegraph Explore Calcutta Walks with Prabha Khaitan Foundation',
    date: 'May 2013',
    author: 'Metro Desk',
    excerpt: 'A collaborative public initiative introducing students, writers, and artists to hidden courtyards, Chinese temples, and vintage ghats across Kolkata.',
    fullText: 'In collaboration with the Prabha Khaitan Foundation, Calcutta Walks hosted a celebrated series of heritage walks aimed at reconnecting young residents with their ancestral urban legacy, traversing Old Chinatown, the Kalighat pilgrimage trails, and the colonial banks of the river.',
    externalUrl: 'https://calcuttawalks.com/media-coverage/',
    imageUrl: '/images/tours/wm-bicycle.jpg'
  }
];

interface BlogPageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenInquire }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<MediaArticle | null>(null);

  const filteredArticles = activeCategory === 'all'
    ? MEDIA_ARTICLES
    : MEDIA_ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="w-full pt-20">
      {/* 1. HERO - Clean Editorial Header without artificial pill tags */}
      <section className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B48A3C]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight">
            Media Coverage & <span className="italic text-[#CFA858]">Press Chronicles</span>
          </h1>

          <p className="text-base sm:text-lg text-[#F4EDE1]/85 max-w-2xl mx-auto mt-4 font-light leading-relaxed font-serif">
            Read what the world’s leading travel writers, historians, and publications have written about our walks and heritage conservation since 2007.
          </p>
        </div>
      </section>

      {/* 2. MEDIA ARTICLES DIRECTORY */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-[#1C1917]/10">
          <div>
            <h2 className="font-serif text-2xl text-[#1C1917]">
              Featured Articles & Press Reports
            </h2>
            <p className="text-xs text-[#1C1917]/60 font-serif">
              Published in international dailies, guidebooks, and magazines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Coverage' },
              { id: 'international', label: 'International Press' },
              { id: 'national', label: 'National Dailies' },
              { id: 'magazine', label: 'Travel Guides & Magazines' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveCategory(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === f.id
                    ? 'bg-[#1C1917] text-[#FBF8F2] shadow-sm'
                    : 'bg-white text-[#1C1917]/70 border border-[#1C1917]/10 hover:bg-[#F4EDE1]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-3xl overflow-hidden border border-[#1C1917]/10 shadow-xs hover:shadow-xl hover:border-[#B48A3C]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1917]">
                  <SafeImage
                    src={article.imageUrl}
                    alt={article.headline}
                    fallbackText={article.outlet}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Outlet Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1917] text-[11px] font-bold tracking-wide shadow-sm">
                    {article.outlet}
                  </div>

                  {article.tag && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#B48A3C] text-[#1C1917] text-[10px] font-bold uppercase tracking-wider">
                      {article.tag}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 text-white text-xs font-serif opacity-80">
                    {article.date} {article.author && `· ${article.author}`}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A2E22] block mb-1">
                    {article.categoryLabel}
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] group-hover:text-[#7A2E22] transition-colors leading-snug">
                    {article.headline}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#1C1917]/75 mt-3 line-clamp-3 leading-relaxed font-serif">
                    "{article.excerpt}"
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-[#1C1917]/10 flex items-center justify-between text-xs text-[#7A2E22] font-semibold">
                <span className="text-stone-500 font-serif font-normal">
                  Read Coverage
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#FBF8F2] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col">
            <div className="bg-[#1C1917] text-[#FBF8F2] p-6 flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#CFA858] block">
                  {selectedArticle.outlet}
                </span>
                <span className="text-xs text-white/70 font-serif">
                  {selectedArticle.date} {selectedArticle.author && `· By ${selectedArticle.author}`}
                </span>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] leading-tight">
                {selectedArticle.headline}
              </h2>

              <div className="p-4 rounded-2xl bg-[#F4EDE1] border border-[#B48A3C]/30 text-stone-800 font-serif italic text-sm sm:text-base leading-relaxed">
                "{selectedArticle.excerpt}"
              </div>

              <div className="text-xs sm:text-sm text-[#1C1917]/85 font-serif leading-relaxed space-y-3 pt-2">
                <p>{selectedArticle.fullText}</p>
              </div>

              <div className="pt-6 border-t border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={selectedArticle.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Visit calcuttawalks.com/media-coverage/</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onOpenInquire();
                  }}
                  className="text-xs font-semibold text-[#7A2E22] hover:underline cursor-pointer"
                >
                  Book a walk featured in this story →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. REVIEWS */}
      <ReviewsCarousel onSelectTour={(slug) => onNavigate('tour-detail', slug)} />

      {/* 4. INQUIRE NOW FORM */}
      <InquireForm />
    </div>
  );
};
