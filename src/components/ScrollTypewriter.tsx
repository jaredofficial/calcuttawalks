import React, { useEffect, useRef, useState } from 'react';

interface ScrollTypewriterProps {
  text: string;
  highlightWords?: string[];
  highlightClass?: string;
  speed?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export const ScrollTypewriter: React.FC<ScrollTypewriterProps> = ({
  text,
  highlightWords = [],
  highlightClass = 'italic text-[#7A2E22]',
  speed = 40,
  className = '',
  as: Component = 'h2'
}) => {
  const containerRef = useRef<HTMLHeadingElement | HTMLDivElement | null>(null);
  const [displayedLength, setDisplayedLength] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    if (displayedLength >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayedLength((prev) => Math.min(prev + 1, text.length));
    }, speed);

    return () => clearTimeout(timer);
  }, [hasStarted, displayedLength, text.length, speed]);

  const currentString = text.slice(0, displayedLength);

  // Helper to render highlights gracefully even as typing proceeds
  const renderTextWithHighlights = () => {
    if (highlightWords.length === 0) {
      return currentString;
    }

    // Split target text by highlighted words
    const regexPattern = new RegExp(`(${highlightWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = currentString.split(regexPattern);

    return parts.map((part, index) => {
      const isHighlighted = highlightWords.some(
        (word) => word.toLowerCase() === part.toLowerCase()
      );
      if (isHighlighted) {
        return (
          <span key={index} className={highlightClass}>
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  const isComplete = displayedLength >= text.length;

  return (
    <Component ref={containerRef as any} className={`${className} inline-block`}>
      {renderTextWithHighlights()}
      {!isComplete && hasStarted && (
        <span className="inline-block w-[2px] h-[0.85em] ml-1 bg-[#B48A3C] animate-pulse align-middle" />
      )}
    </Component>
  );
};
