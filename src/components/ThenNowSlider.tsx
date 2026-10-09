import React, { useState, useRef } from 'react';
import { THEN_NOW_DATA, ThenNowItem } from '../data/supplementary';
import { SafeImage } from './SafeImage';
import { Split, Sparkles, History } from 'lucide-react';

export const ThenNowSlider: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentItem: ThenNowItem = THEN_NOW_DATA[selectedItemIndex];

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <div className="w-full">
      {/* Location Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {THEN_NOW_DATA.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedItemIndex(idx);
              setSliderPosition(50);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              idx === selectedItemIndex
                ? 'bg-[#1C1917] text-[#FBF8F2] shadow-md'
                : 'glass-panel-light text-[#1C1917]/70 hover:text-[#1C1917]'
            }`}
          >
            {item.title.split('&')[0].trim()}
          </button>
        ))}
      </div>

      {/* Main Interactive Comparison Viewport */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-[#1C1917]/10 max-w-5xl mx-auto">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerUp}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-[#292524] touch-none shadow-inner"
        >
          {/* NOW (Background Layer) */}
          <div className="absolute inset-0">
            <SafeImage
              src={currentItem.imageNow}
              alt={`${currentItem.title} - Now`}
              fallbackText="Modern Calcutta View"
              className="w-full h-full object-cover"
            />
            {/* Top Right Label */}
            <div className="absolute top-4 right-4 glass-panel-light px-3 py-1.5 rounded-full text-xs font-semibold text-[#1C1917] shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B48A3C]" />
              <span>{currentItem.periodNow}</span>
            </div>
          </div>

          {/* THEN (Foreground Clipped Layer) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <SafeImage
              src={currentItem.imageThen}
              alt={`${currentItem.title} - Then`}
              fallbackText="Archival Calcutta View"
              className="w-full h-full object-cover filter sepia-[0.35] contrast-105"
            />
            {/* Top Left Label */}
            <div className="absolute top-4 left-4 glass-panel-dark px-3 py-1.5 rounded-full text-xs font-semibold text-[#F4EDE1] shadow-md flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#CFA858]" />
              <span>{currentItem.periodThen}</span>
            </div>
          </div>

          {/* Vertical Divider Line with Grab Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1C1917] border-2 border-white text-white flex items-center justify-center shadow-xl">
              <Split className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>

        {/* Drag Instruction */}
        <p className="text-center text-[11px] text-[#1C1917]/50 mt-3 flex items-center justify-center gap-1">
          <span>← Drag or swipe the handle to compare past and present →</span>
        </p>

        {/* Curatorial Storytelling Card Below */}
        <div className="mt-6 pt-6 border-t border-[#1C1917]/10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <span className="text-xs text-[#7A2E22] font-serif font-semibold block mb-1">
              Historical Epoch ({currentItem.periodThen})
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-[#1C1917] mb-2">
              {currentItem.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#1C1917]/75 leading-relaxed font-serif">
              {currentItem.description}
            </p>
          </div>

          <div className="bg-[#FBF8F2] p-4 sm:p-5 rounded-2xl border border-[#1C1917]/5">
            <span className="text-xs text-[#B48A3C] font-serif font-semibold block mb-1">
              Living Urban Heritage Today
            </span>
            <p className="text-xs sm:text-sm text-[#1C1917]/80 leading-relaxed font-serif">
              {currentItem.historicalContext}
            </p>
            <p className="text-[11px] text-[#1C1917]/50 mt-3">
              Location: <strong>{currentItem.location}</strong> · Featured on our White Town & Hooghly walks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
