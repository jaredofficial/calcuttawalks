import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Geometric center circle specs (viewBox 0 0 44 44)
  const radius = 19;
  const circumference = 2 * Math.PI * radius; // ~119.38
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-7 right-5 sm:right-7 z-40 transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="group relative w-11 h-11 rounded-full bg-[#1C1917]/90 backdrop-blur-md border border-white/15 hover:border-[#B48A3C] shadow-xl flex items-center justify-center text-[#F4EDE1] hover:text-[#CFA858] transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Precision SVG progress ring perfectly centered */}
        <svg
          viewBox="0 0 44 44"
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        >
          {/* Background track circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="text-white/10"
            strokeWidth="2.5"
            stroke="currentColor"
            fill="none"
          />
          {/* Active progress indicator */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="text-[#B48A3C] transition-all duration-100"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
          />
        </svg>

        <ArrowUp className="w-4 h-4 stroke-[2.2] relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};
