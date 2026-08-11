'use client';
import { useState } from 'react';
import type { Testimonial } from '@/sanity/lib/types';

interface Props {
  testimonials: Testimonial[];
  previousLabel: string;
  nextLabel: string;
  goToLabel: string;
}

const ARROW_CLASS =
  'rounded-full border border-white/40 px-3 py-1 text-white transition-colors hover:bg-white/10';

function Dots({ count, activeIndex, goToLabel, onSelect }: {
  count: number;
  activeIndex: number;
  goToLabel: string;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`${goToLabel} ${index + 1}`}
          aria-current={index === activeIndex ? 'true' : undefined}
          onClick={() => onSelect(index)}
          className={`h-2 w-2 rounded-full transition-colors ${
            index === activeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({
  testimonials,
  previousLabel,
  nextLabel,
  goToLabel,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  // CAVEMAN: wrap around so arrows never dead end
  function step(direction: 1 | -1) {
    const count = testimonials.length;
    setActiveIndex((current) => (current + direction + count) % count);
  }

  return (
    <div className="mx-auto max-w-3xl text-center text-white">
      <blockquote>
        <p className="font-heading text-xl italic leading-relaxed md:text-2xl">
          “{active.quote}”
        </p>
        <footer className="mt-6 text-sm font-semibold uppercase tracking-widest">
          — {active.author}
        </footer>
      </blockquote>
      <div className="mt-8 flex items-center justify-center gap-5">
        <button type="button" aria-label={previousLabel} onClick={() => step(-1)} className={ARROW_CLASS}>
          ‹
        </button>
        <Dots
          count={testimonials.length}
          activeIndex={activeIndex}
          goToLabel={goToLabel}
          onSelect={setActiveIndex}
        />
        <button type="button" aria-label={nextLabel} onClick={() => step(1)} className={ARROW_CLASS}>
          ›
        </button>
      </div>
    </div>
  );
}
