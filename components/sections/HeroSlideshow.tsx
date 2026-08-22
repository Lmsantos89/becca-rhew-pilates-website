'use client';
import { useEffect, useState } from 'react';

interface Slide {
  tint: string;
  alt: string;
  src?: string;
  mobileSrc?: string;
  positionClass?: string;
}

const DEFAULT_POSITION = 'object-center';
// CAVEMAN: matches tailwind md, phones get the 4:5 crop instead of the landscape shot
const MOBILE_MEDIA = '(max-width: 767px)';

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

// CAVEMAN: only fetch photo on screen plus next one, six full width shots cost too much
function useLoadedSlides(index: number, slideCount: number): Set<number> {
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));

  useEffect(() => {
    const next = (index + 1) % slideCount;
    setLoaded((current) => {
      if (current.has(index) && current.has(next)) return current;
      return new Set(current).add(index).add(next);
    });
  }, [index, slideCount]);

  return loaded;
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
  const loadedSlides = useLoadedSlides(index, slides.length);

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
          {slide.src && loadedSlides.has(position) && (
            <picture className="block h-full w-full">
              {slide.mobileSrc && <source media={MOBILE_MEDIA} srcSet={slide.mobileSrc} />}
              <img
                src={slide.src}
                alt=""
                className={`h-full w-full object-cover ${slide.positionClass ?? DEFAULT_POSITION}`}
                // CAVEMAN: missing photo file falls back to the tint behind it
                onError={(event) => {
                  event.currentTarget.style.visibility = 'hidden';
                }}
              />
            </picture>
          )}
        </div>
      ))}
      {showDots && <SlideDots slides={slides} index={index} onSelect={setIndex} />}
    </div>
  );
}
