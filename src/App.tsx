/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { HomePage } from './pages/HomePage';
import { ToursCatalogPage } from './pages/ToursCatalogPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { CalendarPage } from './pages/CalendarPage';
import { PricingPage } from './pages/PricingPage';
import { FaqPage } from './pages/FaqPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { WhatsAppCTA } from './components/WhatsAppCTA';
import { ScrollToTop } from './components/ScrollToTop';
import { SlotBookingModal } from './components/SlotBookingModal';
import { AIChatModal } from './components/AIChatModal';
import { TOURS_DATA } from './data/tours';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeTourSlug, setActiveTourSlug] = useState<string>('in-the-footsteps-of-the-raj');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingTourSlug, setBookingTourSlug] = useState<string | undefined>();
  const [bookingPrice, setBookingPrice] = useState<number | undefined>();

  const handleOpenBooking = (tourSlug?: string, price?: number) => {
    setBookingTourSlug(tourSlug);
    setBookingPrice(price);
    setIsBookingModalOpen(true);
  };

  // Handle URL hash routing if present (e.g. #/tours, #/story)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash.startsWith('tour/')) {
        const slug = hash.replace('tour/', '');
        setActiveTourSlug(slug);
        setActiveTab('tour-detail');
      } else if (hash) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (tab: string, tourSlug?: string) => {
    if (tab === 'tour-detail' && tourSlug) {
      setActiveTourSlug(tourSlug);
      setActiveTab('tour-detail');
      window.location.hash = `#/tour/${tourSlug}`;
    } else {
      setActiveTab(tab);
      window.location.hash = tab === 'home' ? '' : `#/${tab}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquire = (tourSlug?: string) => {
    if (tourSlug) {
      setActiveTourSlug(tourSlug);
    }
    // Scroll directly to the InquireForm at the base of the current page
    const inquireSection = document.getElementById('inquire-section') || document.getElementById('tour-inquiry-form');
    if (inquireSection) {
      inquireSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentTour = TOURS_DATA.find((t) => t.slug === activeTourSlug);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F2] text-[#1C1917] selection:bg-[#B48A3C]/20 selection:text-[#1C1917]">
      {/* Top Bar Contract (Wordmark, Nav Links, Inquire Button) */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenInquire={() => handleOpenInquire(activeTab === 'tour-detail' ? activeTourSlug : undefined)}
      />

      {/* Main Page View */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenInquire={handleOpenInquire} />
        )}
        {activeTab === 'tours' && (
          <ToursCatalogPage onNavigate={handleNavigate} onOpenInquire={handleOpenInquire} />
        )}
        {activeTab === 'tour-detail' && (
          <TourDetailPage
            slug={activeTourSlug}
            onNavigate={handleNavigate}
            onOpenInquire={handleOpenInquire}
          />
        )}
        {activeTab === 'story' && (
          <OurStoryPage onNavigate={handleNavigate} onOpenInquire={handleOpenInquire} />
        )}
        {activeTab === 'reviews' && (
          <ReviewsPage onNavigate={handleNavigate} onOpenInquire={handleOpenInquire} />
        )}
        {activeTab === 'gallery' && (
          <GalleryPage onNavigate={handleNavigate} onOpenInquire={handleOpenInquire} />
        )}
        {activeTab === 'calendar' && (
          <CalendarPage onNavigate={handleNavigate} onOpenInquire={handleOpenInquire} />
        )}
        {activeTab === 'pricing' && (
          <PricingPage
            onNavigate={handleNavigate}
            onOpenInquire={handleOpenInquire}
            onOpenBooking={handleOpenBooking}
          />
        )}
        {activeTab === 'faq' && (
          <FaqPage onNavigate={handleNavigate} onOpenInquire={handleOpenInquire} />
        )}
        {activeTab === 'blog' && (
          <BlogPage onNavigate={handleNavigate} onOpenInquire={handleOpenInquire} />
        )}
        {activeTab === 'contact' && (
          <ContactPage onNavigate={handleNavigate} onOpenInquire={handleOpenInquire} />
        )}

        {/* Every page concludes with an authentic WhatsApp CTA */}
        <WhatsAppCTA
          pageContext={
            activeTab === 'tour-detail'
              ? currentTour?.title
              : activeTab === 'pricing'
              ? 'pricing and bookings'
              : activeTab === 'story'
              ? 'our story and collective'
              : activeTab === 'contact'
              ? 'direct inquiry'
              : 'custom tour planning'
          }
          tourTitle={activeTab === 'tour-detail' ? currentTour?.title : undefined}
        />
      </main>

      {/* Luxury Footer with Sister Properties & Contact Info */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquire={() => handleOpenInquire(activeTab === 'tour-detail' ? activeTourSlug : undefined)}
      />

      {/* Fancy yet premium scroll to top button with circular progress indicator */}
      <ScrollToTop />

      {/* AI Cultural Concierge & Chatbot */}
      <AIChatModal
        onNavigate={handleNavigate}
        onOpenInquire={() => handleOpenInquire(activeTab === 'tour-detail' ? activeTourSlug : undefined)}
      />

      {/* Floating Glass Mobile Bottom Bar (with 15% sticky cap) */}
      <MobileBottomBar
        onOpenInquire={() => handleOpenInquire(activeTab === 'tour-detail' ? activeTourSlug : undefined)}
        tourTitle={activeTab === 'tour-detail' ? currentTour?.title : undefined}
      />

      {/* Interactive Slot Booking & Direct Payment Modal */}
      <SlotBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedTourSlug={bookingTourSlug}
        preSelectedPrice={bookingPrice}
      />
    </div>
  );
}
