import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
  aspectRatioClass?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Calcutta Heritage',
  fallbackText,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  aspectRatioClass = 'aspect-[4/3]',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#292524] to-[#1C1917] flex flex-col items-center justify-center text-center p-6 border border-[#B48A3C]/20 ${aspectRatioClass} ${containerClassName}`}
      >
        <div className="w-12 h-12 rounded-full border border-[#B48A3C]/40 flex items-center justify-center mb-3 text-[#B48A3C]">
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        </div>
        <span className="font-serif italic text-sm text-[#F4EDE1]/80 max-w-xs line-clamp-2">
          {fallbackText || alt}
        </span>
        <span className="text-[10px] tracking-widest uppercase text-[#B48A3C]/70 mt-1">Calcutta Walks Archive</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
        loading="lazy"
        referrerPolicy="no-referrer"
        {...rest}
      />
    </div>
  );
};
