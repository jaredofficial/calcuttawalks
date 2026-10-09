import React, { useState, useEffect } from 'react';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { InquireForm } from '../components/InquireForm';
import { SafeImage } from '../components/SafeImage';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, 
  ArrowRight, Image as ImageIcon 
} from 'lucide-react';

interface ArchivalImage {
  id: string;
  title: string;
  historicPeriod: string;
  location: string;
  photographerOrArchive: string;
  description: string;
  imageUrl: string;
  modernContext: string;
  tourSlug?: string;
}

// Authentic Archival Sample Collection from calcuttawalks.com/calcutta-then/
const CALCUTTA_THEN_COLLECTION: ArchivalImage[] = [
  {
    id: 'dalhousie-gpo-then',
    title: 'Dalhousie Square & General Post Office',
    historicPeriod: 'Circa 1870 (Bourne & Shepherd Archive)',
    location: 'Tank Square (now B.B.D. Bagh)',
    photographerOrArchive: 'Samuel Bourne / Bourne & Shepherd Studio',
    description: 'The monumental neoclassical Corinthian dome of the General Post Office, constructed in 1868 on the historic site of old Fort William. Victorian horse buggies and open palanquins traverse the wide unpaved thoroughfare.',
    modernContext: 'Today designated as Benoy-Badal-Dinesh Bagh in memory of young Bengali freedom fighters. The building remains in continuous postal operation.',
    imageUrl: '/images/tours/wm-raj.jpg',
    tourSlug: 'white-town-walk'
  },
  {
    id: 'writers-building-then',
    title: 'Writers’ Buildings & Tank Square Promenade',
    historicPeriod: 'Circa 1885 (Imperial Secretariat Zenith)',
    location: 'North Side of Dalhousie Square',
    photographerOrArchive: 'Johnston & Hoffmann Photographic Studio',
    description: 'Originally constructed in 1777 for junior clerks ("writers") of the British East India Company, later redesigned by Thomas Saeltzer with classical Greco-Roman pediments and French Renaissance red-brick facades.',
    modernContext: 'Served as the secretariat of the Government of West Bengal and stands as an enduring architectural icon of colonial governance.',
    imageUrl: '/images/tours/wm-chowringhee.jpg',
    tourSlug: 'white-town-walk'
  },
  {
    id: 'howrah-pontoon-then',
    title: 'The Old Pontoon Bridge over the Hooghly',
    historicPeriod: 'Circa 1890 (Floating Pontoon Era)',
    location: 'Hooghly River Crossing',
    photographerOrArchive: 'Colin Murray / Bourne & Shepherd',
    description: 'Sir Bradford Leslie’s floating pontoon bridge was completed in 1874. It was unbolted and swung open during the night to allow steamships and masted merchant vessels to pass upstream.',
    modernContext: 'Replaced in 1943 during World War II by the current 705-metre balanced cantilever Howrah Bridge.',
    imageUrl: '/images/tours/wm-sunsetriver.jpg',
    tourSlug: 'sunset-river-cruise'
  },
  {
    id: 'sovabazar-rajbari-then',
    title: 'Sovabazar Rajbari Courtyard & Thakurdalan',
    historicPeriod: 'Circa 18th Century / 1875 Print',
    location: 'North Calcutta (Black Town)',
    photographerOrArchive: 'Bengal Photographic Society',
    description: 'The palatial compound of Raja Nabakrishna Deb, who welcomed Lord Clive in 1757 following the Battle of Plassey. The open-air thakurdalan courtyard hosted grand Durga Pujas attended by governor-generals and elite nobility.',
    modernContext: 'Lovingly conserved by Deb family descendants and featured on Calcutta Walks’ signature Black Town morning trail.',
    imageUrl: '/images/tours/wm-sovabazar.jpg',
    tourSlug: 'black-town-walk'
  },
  {
    id: 'chowringhee-esplanade-then',
    title: 'Chowringhee Boulevard & Grand Hotel Colonnade',
    historicPeriod: 'Circa 1900 (The City of Palaces)',
    location: 'Chowringhee Road facing the Maidan',
    photographerOrArchive: 'Samuel Bourne Archive',
    description: 'Grand three-storey neoclassical mansions with sweeping verandas and Corinthian colonnades fronting the open green pastures of the Maidan, earning Calcutta its title as the "City of Palaces".',
    modernContext: 'Remains Kolkata’s premier central thoroughfare, lined with the Grand Hotel and vibrant street stalls.',
    imageUrl: '/images/tours/wm-publictransport.jpg',
    tourSlug: 'white-town-walk'
  },
  {
    id: 'kumartuli-ghats-then',
    title: 'Kumartuli Riverfront & Potter Settlement',
    historicPeriod: 'Circa 1905 (Living Guild Colony)',
    location: 'North Kolkata Riverbank',
    photographerOrArchive: 'Government Art College Archive',
    description: 'Artisans from Krishnanagar settling beside the riverbank where straw, bamboo, and alluvial holy Ganga clay arrived on wooden country cargo boats.',
    modernContext: 'A thriving UNESCO Intangible Cultural Heritage guild comprising over 450 sculptors continuing unbroken ancestral craftsmanship.',
    imageUrl: '/images/tours/wm-kumartuli.jpg',
    tourSlug: 'potters-trail'
  },
  {
    id: 'victoria-memorial-then',
    title: 'Victoria Memorial Hall under Construction',
    historicPeriod: 'Circa 1912 (Foundation to Dome Raising)',
    location: 'Southern End of the Maidan',
    photographerOrArchive: 'Messrs. Martin & Co. Engineering Archive',
    description: 'Rare construction view of Sir William Emerson’s white Makrana marble monument, showcasing the massive brick sub-structures and Italianate Renaissance dome prior to completion in 1921.',
    modernContext: 'Kolkata’s most famous architectural landmark, housing 25 galleries of rare British Indian paintings, maps, and artifacts.',
    imageUrl: '/images/tours/wm-victoria.jpg',
    tourSlug: 'car-coach-city-tour'
  },
  {
    id: 'college-street-trams-then',
    title: 'College Street Boi Para & Early Electric Trams',
    historicPeriod: 'Circa 1910 (Intellectual Renaissance)',
    location: 'College Street & Presidency College',
    photographerOrArchive: 'Calcutta Tramways Company Archive',
    description: 'Asia’s first electric tramway began operating in Calcutta in 1902. Wooden tramcars trundled through College Street, the intellectual heartland of universities, printing presses, and freedom-fighting publishing houses.',
    modernContext: 'Still recognized as Asia’s largest secondhand book market, stretching over a mile with thousands of independent wooden stalls.',
    imageUrl: '/images/tours/wm-bicycle.jpg',
    tourSlug: 'public-transport-tour'
  },
  {
    id: 'mullick-ghat-river-then',
    title: 'Mullick Ghat & Hooghly Country Shipping',
    historicPeriod: 'Circa 1880 (Masted Merchant Port)',
    location: 'Strand Bank Road beside the River',
    photographerOrArchive: 'Bourne & Shepherd Photographic Collection',
    description: 'Traditional wooden cargo vessels and country boats docked alongside Ramchandra Goenka’s bathing ghats, carrying jute, spices, and flowers traded from rural Bengal districts.',
    modernContext: 'Home to the Mullick Ghat Flower Market, Asia’s largest open-air flower market, bustling daily from 4:00 AM.',
    imageUrl: '/images/tours/wm-sunsetriver2.jpg',
    tourSlug: 'good-morning-calcutta'
  }
];

interface GalleryPageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onOpenInquire }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev !== null && prev < CALCUTTA_THEN_COLLECTION.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : CALCUTTA_THEN_COLLECTION.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const activePhoto = selectedPhotoIndex !== null ? CALCUTTA_THEN_COLLECTION[selectedPhotoIndex] : null;

  return (
    <div className="w-full pt-20">
      {/* 1. HERO - Clean Editorial Header */}
      <section className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B48A3C]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight">
            Calcutta Then: <span className="italic text-[#CFA858]">Archival Exhibition</span>
          </h1>

          <p className="text-base sm:text-lg text-[#F4EDE1]/85 max-w-2xl mx-auto mt-4 font-light leading-relaxed font-serif">
            A curated photographic exhibition of 19th and early 20th century Calcutta archives. Explore sample plates showcasing the city's architectural evolution and storied riverbanks.
          </p>
        </div>
      </section>

      {/* 2. SAMPLE ARCHIVAL PRINTS GRID */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">
            Sample Archival Plates & Historical Views
          </h2>
          <p className="text-xs sm:text-sm text-[#1C1917]/70 mt-2 font-serif">
            Sample photographs from the <em>calcuttawalks.com/calcutta-then/</em> collection. Click any image to open the enlarged plate view with detailed historical notes. More images will be added to the gallery soon.
          </p>
        </div>

        {/* 3-Column Archival Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CALCUTTA_THEN_COLLECTION.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#1C1917]/10 shadow-xs hover:shadow-xl hover:border-[#B48A3C]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Vintage Sepia/Plate Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1917]">
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.title}
                    fallbackText={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.25] contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Period tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1917] text-[10px] font-bold tracking-wider shadow-sm">
                    {item.historicPeriod.split('(')[0].trim()}
                  </div>

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  <div className="absolute bottom-3 left-3 text-white text-xs font-serif opacity-80">
                    {item.location}
                  </div>
                </div>

                {/* Caption Details */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] group-hover:text-[#7A2E22] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-[#B48A3C] font-semibold mt-1">
                    {item.photographerOrArchive}
                  </p>

                  <p className="text-xs text-[#1C1917]/75 mt-2.5 line-clamp-3 leading-relaxed font-serif">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 pt-0 border-t border-[#1C1917]/10 flex items-center justify-between text-xs text-[#7A2E22] font-semibold">
                <span className="text-stone-500 font-serif font-normal">
                  Examine Plate
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Enlarge View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && activePhoto && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo view"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 sm:p-6 animate-fade-in"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            aria-label="Close enlarged view"
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Photo Button */}
          <button
            onClick={() =>
              setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : CALCUTTA_THEN_COLLECTION.length - 1))
            }
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Photo Button */}
          <button
            onClick={() =>
              setSelectedPhotoIndex((prev) => (prev !== null && prev < CALCUTTA_THEN_COLLECTION.length - 1 ? prev + 1 : 0))
            }
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 max-h-[65vh] bg-black">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[65vh] max-w-full w-auto object-contain mx-auto filter sepia-[0.25]"
              />
            </div>

            {/* Plate Info Card */}
            <div className="mt-4 p-5 rounded-2xl bg-[#1C1917]/95 border border-white/15 text-white max-w-3xl w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#CFA858] block">
                  {activePhoto.historicPeriod} · {activePhoto.photographerOrArchive}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F4EDE1] mt-0.5">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-white/80 mt-1 font-serif leading-relaxed">
                  {activePhoto.description}
                </p>
                <p className="text-[11px] text-[#CFA858] mt-1.5 font-serif italic">
                  <strong>Now:</strong> {activePhoto.modernContext}
                </p>
              </div>

              {activePhoto.tourSlug && (
                <button
                  onClick={() => {
                    setSelectedPhotoIndex(null);
                    onNavigate('tour-detail', activePhoto.tourSlug);
                  }}
                  className="shrink-0 px-5 py-2.5 rounded-full bg-[#B48A3C] hover:bg-[#CFA858] text-[#1C1917] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  Explore On Walk →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. REVIEWS */}
      <ReviewsCarousel onSelectTour={(slug) => onNavigate('tour-detail', slug)} />

      {/* 5. INQUIRE NOW FORM */}
      <InquireForm />
    </div>
  );
};
