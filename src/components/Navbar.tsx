import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string, tourSlug?: string) => void;
  onOpenInquire: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate, onOpenInquire }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'tours', label: 'Tours' },
    { id: 'story', label: 'Our Story' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const isWhiteNav = activeTab === 'home' && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isWhiteNav
            ? 'bg-transparent py-4'
            : 'glass-nav-scrolled py-2.5 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Authentic brand logo without redundant text */}
            <button
              onClick={() => onNavigate('home')}
              className="text-left group cursor-pointer focus:outline-none flex items-center py-0.5"
            >
              <img
                src="/images/logo.png"
                alt="Calcutta Walks"
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
                onError={(e) => {
                  e.currentTarget.src = "/images/logo-140x54.png";
                }}
              />
            </button>

            {/* Zone 2: Clean text navigation links - White only on homepage before scroll */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`group relative py-1 whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isWhiteNav
                        ? isActive
                          ? 'text-white font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                          : 'text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                        : isActive
                          ? 'text-[#7A2E22] font-semibold'
                          : 'text-[#1C1917]/85 hover:text-[#7A2E22]'
                    }`}
                  >
                    <span className="relative z-10 transition-transform duration-200 inline-block group-hover:-translate-y-0.5">
                      {link.label}
                    </span>

                    {/* Active or Hover underline indicator */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ${
                        isActive
                          ? isWhiteNav
                            ? 'bg-[#CFA858] opacity-100 scale-x-100 shadow-[0_0_8px_rgba(207,168,88,0.8)]'
                            : 'bg-[#7A2E22] opacity-100 scale-x-100'
                          : isWhiteNav
                            ? 'bg-white/80 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100'
                            : 'bg-[#7A2E22]/60 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1-2 primary actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenInquire}
                className={`hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer ${
                  isWhiteNav
                    ? 'bg-white/20 backdrop-blur-md text-white border border-white/50 hover:bg-white hover:text-[#1C1917] shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
                    : 'bg-[#1C1917] text-[#FBF8F2] hover:bg-[#7A2E22]'
                }`}
              >
                Inquire Now
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className={`lg:hidden p-2 rounded-xl transition-colors ${
                  isWhiteNav
                    ? 'text-white hover:bg-white/20 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                    : 'text-[#1C1917] hover:bg-black/5'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Glass Slide-in Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm glass-panel-light p-6 pt-20 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-2">
              <div className="mb-6 pb-4 border-b border-[#1C1917]/10">
                <span className="font-serif text-2xl font-bold text-[#1C1917] block">
                  Calcutta Walks
                </span>
                <span className="text-xs text-[#7A2E22] tracking-wider uppercase font-semibold">
                  Heritage Walking Tours Since 2007
                </span>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-base transition-colors ${
                    activeTab === link.id
                      ? 'bg-[#1C1917] text-[#FBF8F2] font-medium'
                      : 'text-[#1C1917] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-[#1C1917]/10 space-y-3">
              <button
                onClick={() => {
                  onOpenInquire();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider shadow-md text-center"
              >
                Inquire Now
              </button>
              <p className="text-[11px] text-center text-[#1C1917]/60">
                Direct Assistance: +91 98301 84030
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
