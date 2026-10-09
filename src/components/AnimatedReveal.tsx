import React, { useEffect, useRef, useState } from 'react';

interface AnimatedRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-in' | 'zoom-in' | 'slide-right' | 'slide-left';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      { threshold }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [threshold]);

  const getAnimationClasses = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-8';
        case 'fade-down':
          return 'opacity-0 -translate-y-8';
        case 'slide-right':
          return 'opacity-0 -translate-x-8';
        case 'slide-left':
          return 'opacity-0 translate-x-8';
        case 'zoom-in':
          return 'opacity-0 scale-95';
        case 'fade-in':
        default:
          return 'opacity-0';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`transition-all ${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
