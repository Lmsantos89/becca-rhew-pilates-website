'use client';
import { useEffect, useState } from 'react';

interface Slide {
  tint: string;
  alt: string;
  src?: string;
}

interface Props {
  slides: Slide[];
  intervalMs?: number;
  rounded?: boolean;
  showDots?: boolean;
}

const DEFAULT_INTERVAL = 5000;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function SlideDots({
  slides,
  index,
  onSelect,
}: {
  slides: Slide[];
  index: number;
  onSelect: (position: number) => void;
}) {
  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
      {slides.map((slide, position) => (
        <button
          key={slide.alt}
          type="button"
          aria-label={`Show slide ${position + 1}`}
          aria-current={position === index}
          onClick={() => onSelect(position)}
          className={`h-2 w-2 rounded-full transition-colors ${
            position === index ? 'bg-white' : 'bg-white/50'
          }`}
        />
      ))}
    </div>
  );
}

export default function HeroSlideshow({
  slides,
  intervalMs = DEFAULT_INTERVAL,
  rounded = true,
  showDots = true,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1 || prefersReducedMotion()) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      intervalMs
    );
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${rounded ? 'rounded-t-[999px]' : ''}`}>
      {slides.map((slide, position) => (
        <div
          key={slide.alt}
          role="img"
          aria-label={slide.alt}
          aria-hidden={position !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            position === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: slide.tint }}
        >
          {slide.src && (
            <img
              src={slide.src}
              alt=""
              // CAVEMAN: narrow screens crop the sides hard, hold the subjects left of centre
              className="h-full w-full object-cover object-[42%_center] md:object-center"
              // CAVEMAN: missing photo file falls back to the tint behind it
              onError={(event) => {
                event.currentTarget.style.visibility = 'hidden';
              }}
            />
          )}
        </div>
      ))}
      {showDots && <SlideDots slides={slides} index={index} onSelect={setIndex} />}
    </div>
  );
}
