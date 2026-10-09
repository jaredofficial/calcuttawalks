import React from 'react';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { InquireForm } from '../components/InquireForm';
import { Calendar as CalendarIcon, ExternalLink, Clock, MessageSquare, ArrowRight } from 'lucide-react';

interface CalendarPageProps {
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: (tourSlug?: string) => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ onNavigate, onOpenInquire }) => {
  // Official Calcutta Walks public Google Calendar feed
  const googleCalendarEmbedUrl =
    "https://calendar.google.com/calendar/embed?src=explore%40calcuttawalks.com&ctz=Asia%2FKolkata&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&mode=MONTH";

  return (
    <div className="w-full pt-20">
      {/* 1. HERO - Clean Editorial Header without artificial pill tags */}
      <section className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B48A3C]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4EDE1] leading-tight">
            Upcoming Walking <span className="italic text-[#CFA858]">Departures</span>
          </h1>

          <p className="text-base sm:text-lg text-[#F4EDE1]/85 max-w-2xl mx-auto mt-4 font-light leading-relaxed font-serif">
            View our live schedule of confirmed morning, evening, and weekend departures. All shared walks are strictly capped at 8 walkers for an intimate experience.
          </p>
        </div>
      </section>

      {/* 2. GOOGLE CALENDAR VIEW */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-[#1C1917]/10 overflow-hidden">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#1C1917]/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#7A2E22]/10 text-[#7A2E22] flex items-center justify-center shrink-0">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917]">
                  Calcutta Walks Google Calendar
                </h3>
                <p className="text-xs text-[#1C1917]/60 font-serif">
                  Live departures schedule · Timezone: Asia/Kolkata (IST)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://calendar.google.com/calendar/u/0/embed?src=explore@calcuttawalks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>Open in Google Calendar App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Embedded Google Calendar Iframe */}
          <div className="w-full h-[620px] sm:h-[750px] rounded-2xl overflow-hidden border border-[#1C1917]/10 bg-white relative shadow-inner">
            <iframe
              src={googleCalendarEmbedUrl}
              title="Calcutta Walks Official Google Calendar"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* Quick action bar */}
          <div className="mt-5 p-4 rounded-2xl bg-[#F4EDE1] border border-[#B48A3C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-serif text-[#1C1917]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7A2E22]" />
              <span>Looking for a private walk on a date or time not listed above?</span>
            </div>
            <button
              onClick={() => onOpenInquire()}
              className="px-4 py-2 rounded-full bg-[#7A2E22] hover:bg-[#1C1917] text-white font-sans text-xs font-semibold uppercase tracking-wider transition-colors self-start sm:self-center cursor-pointer flex items-center gap-1.5"
            >
              <span>Request Custom Date</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. REVIEWS */}
      <ReviewsCarousel onSelectTour={(slug) => onNavigate('tour-detail', slug)} />

      {/* 4. INQUIRE NOW FORM */}
      <InquireForm />
    </div>
  );
};
