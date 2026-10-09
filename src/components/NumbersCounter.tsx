import React, { useEffect, useState, useRef } from 'react';
import { EXPLORERS_DATA } from '../data/explorers';

interface StatItem {
  id: string;
  label: string;
  numeric: number;
  suffix: string;
  subtext: string;
}

export const NumbersCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    {
      id: 'tours',
      label: 'Tours Conducted',
      numeric: 10000,
      suffix: '+',
      subtext: 'Since our first walk in 2007'
    },
    {
      id: 'walkers',
      label: 'Curious Walkers',
      numeric: 50000,
      suffix: '+',
      subtext: 'From over 85 countries'
    },
    {
      id: 'km',
      label: 'Kilometres Walked',
      numeric: 110000,
      suffix: '+',
      subtext: 'Zero carbon footprint on foot'
    },
    {
      id: 'cha',
      label: 'Cups of Cha Shared',
      numeric: 80000,
      suffix: '+',
      subtext: 'Served in authentic earthen clay bhars'
    },
    {
      id: 'books',
      label: 'Books in Our Library',
      numeric: 1000,
      suffix: '+',
      subtext: 'Rare colonial & Bengal archives'
    },
    {
      id: 'explorers',
      label: 'Local Explorers',
      numeric: EXPLORERS_DATA.length, // Real count from our-explorers data!
      suffix: '',
      subtext: 'Historians, architects & storytellers'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] relative overflow-hidden">
      {/* Subtle background ambient elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#B48A3C_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#B48A3C]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4EDE1] leading-tight">
            Our Journey in <span className="italic text-[#CFA858]">Numbers</span>
          </h2>
          <div className="w-16 h-[1px] bg-[#B48A3C]/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {stats.map((stat) => (
            <CounterCard key={stat.id} stat={stat} startAnimation={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CounterCard: React.FC<{ stat: StatItem; startAnimation: boolean }> = ({ stat, startAnimation }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const duration = 2000;
    const target = stat.numeric;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayCount(target);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [startAnimation, stat.numeric]);

  return (
    <div className="glass-panel-dark px-3.5 py-5 sm:px-4 sm:py-6 rounded-2xl border border-white/10 hover:border-[#B48A3C]/40 transition-all duration-300 text-center flex flex-col justify-between group shadow-sm">
      <div>
        <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#F4EDE1] tracking-tight group-hover:text-[#CFA858] transition-colors tabular-nums whitespace-nowrap overflow-hidden text-ellipsis">
          {displayCount.toLocaleString()}
          <span className="text-[#B48A3C]">{stat.suffix}</span>
        </div>
        <div className="text-[11px] sm:text-xs font-medium text-[#F4EDE1]/85 mt-2 line-clamp-1">
          {stat.label}
        </div>
      </div>
      <p className="text-[10px] sm:text-[11px] text-[#F4EDE1]/50 mt-2.5 pt-2.5 border-t border-white/10 leading-snug line-clamp-2">
        {stat.subtext}
      </p>
    </div>
  );
};
