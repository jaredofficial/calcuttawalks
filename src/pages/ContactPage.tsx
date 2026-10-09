import React from 'react';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { InquireForm } from '../components/InquireForm';
import { ScrollTypewriter } from '../components/ScrollTypewriter';
import { 
  MapPin, Phone, Mail, MessageSquare, Clock, Building2, 
  Navigation, ExternalLink, Train, Compass 
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenInquire }) => {
  // Google Maps embed URL centered at 9A Khairu Place, Bowbazar, Kolkata
  const mapEmbedUrl = 
    "https://maps.google.com/maps?q=9A+Khairu+Place+Bowbazar+Kolkata+700072&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="w-full pt-20">
      {/* 1. HERO - Verbatim Atmosphere */}
      <section className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B48A3C]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight">
            Drop by our office and <span className="italic text-[#CFA858]">say hello.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#F4EDE1]/85 max-w-2xl mx-auto mt-4 font-light leading-relaxed font-serif">
            We love meeting walkers, hearing memories, drinking earthen cups of cha, and planning bespoke urban discoveries.
          </p>
        </div>
      </section>

      {/* 2. CHANNELS CARDS */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* Channel 1: WhatsApp */}
          <div className="bg-white p-7 rounded-3xl border border-[#1C1917]/10 shadow-xs hover:border-[#25D366]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#1C1917] mb-1">WhatsApp Us</h3>
              <p className="text-xs text-[#1C1917]/70 leading-relaxed mb-4 font-serif">
                Direct instant line with Explorer Ifte and our operations desk for questions, live directions, and booking questions.
              </p>
            </div>
            <a
              href="https://wa.me/919830184030?text=Calcutta%20Walks%20Enquiry%3A%20Hello%20Explorer!"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider text-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Chat on WhatsApp (+91 98301 84030)
            </a>
          </div>

          {/* Channel 2: Telephone & Email */}
          <div className="bg-white p-7 rounded-3xl border border-[#1C1917]/10 shadow-xs hover:border-[#7A2E22]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#7A2E22]/10 text-[#7A2E22] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#1C1917] mb-1">Direct Phone & Email</h3>
              <div className="space-y-2 text-xs text-[#1C1917]/80 mt-3 font-serif">
                <p>
                  <strong className="text-[#1C1917]">Explorer Ifte:</strong>{' '}
                  <a href="tel:+919830184030" className="hover:text-[#7A2E22] font-medium">+91 98301 84030</a>
                </p>
                <p>
                  <strong className="text-[#1C1917]">Explorer Tuhina:</strong>{' '}
                  <a href="tel:+918584033244" className="hover:text-[#7A2E22] font-medium">+91 85840 33244</a>
                </p>
                <p className="pt-1">
                  <strong className="text-[#1C1917]">Email:</strong>{' '}
                  <a href="mailto:explore@calcuttawalks.com" className="hover:text-[#7A2E22] font-medium">explore@calcuttawalks.com</a>
                </p>
              </div>
            </div>
            <a
              href="mailto:explore@calcuttawalks.com"
              className="py-3 px-4 rounded-xl bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider text-center hover:bg-[#7A2E22] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 mt-4"
            >
              Send Direct Email
            </a>
          </div>

          {/* Channel 3: Physical Office */}
          <div className="bg-white p-7 rounded-3xl border border-[#1C1917]/10 shadow-xs hover:border-[#B48A3C]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#B48A3C]/10 text-[#B48A3C] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#1C1917] mb-1">Office Address</h3>
              <div className="text-xs text-[#1C1917]/75 leading-relaxed mt-2 font-serif">
                <p className="font-semibold text-[#1C1917]">Walking Tours Pvt Ltd India</p>
                <p>9A Khairu Place, Bowbazar</p>
                <p>Kolkata 700072, West Bengal, India</p>
                <p className="text-[11px] text-[#7A2E22] font-medium mt-1.5 flex items-center gap-1">
                  <Train className="w-3 h-3" /> 2 min from Central Metro Station
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=9A+Khairu+Place+Kolkata+700072"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#F4EDE1] text-[#1C1917] hover:bg-[#1C1917] hover:text-white text-xs font-semibold uppercase tracking-wider text-center transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 mt-4 flex items-center justify-center gap-1.5"
            >
              <span>Get Directions</span>
              <Navigation className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 3. INTERACTIVE GOOGLE MAP VIEW */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1C1917]/10 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1C1917]/10">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#7A2E22]" />
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
                  Google Map: Calcutta Walks HQ
                </h3>
              </div>
              <p className="text-xs text-[#1C1917]/70 mt-1 font-serif">
                9A Khairu Place, Kolkata 700072 · Adjacent to Central Avenue & Bowbazar
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=9A+Khairu+Place+Kolkata+700072"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-colors self-start sm:self-center"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Map Iframe */}
          <div className="w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#1C1917]/10 bg-[#F4EDE1] relative shadow-inner">
            <iframe
              src={mapEmbedUrl}
              title="Calcutta Walks Office Location Map"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Practical Transit Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-[#1C1917]/10 text-xs text-[#1C1917]/80 font-serif">
            <div className="flex items-start gap-2.5">
              <Train className="w-4 h-4 text-[#7A2E22] shrink-0 mt-0.5" />
              <div>
                <strong>Via Metro:</strong> Get off at Central Metro Station (Gate 1 or 2). Walk 150m south along Central Avenue and turn into Khairu Place.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Navigation className="w-4 h-4 text-[#B48A3C] shrink-0 mt-0.5" />
              <div>
                <strong>Via Yellow Taxi:</strong> Ask for "Orient Cinema / Bowbazar crossing on Central Avenue". Khairu Place is adjacent.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#00AA6C] shrink-0 mt-0.5" />
              <div>
                <strong>Office Hours:</strong> 8:00 AM – 7:30 PM (IST) daily. Walkers always welcome for fresh brewed ginger tea!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REVIEWS */}
      <ReviewsCarousel onSelectTour={(slug) => onNavigate('tour-detail', slug)} />

      {/* 5. INQUIRE NOW FORM */}
      <InquireForm />
    </div>
  );
};
