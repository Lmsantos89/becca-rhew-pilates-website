'use client';
import { useRef } from 'react';
import type { Testimonial } from '@/sanity/lib/types';

interface Props {
  testimonials: Testimonial[];
  previousLabel: string;
  nextLabel: string;
}

const SCROLL_AMOUNT = 360;

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="w-80 flex-shrink-0 snap-start rounded-lg bg-white/10 p-6 text-white">
      <p className="leading-relaxed">{testimonial.quote}</p>
      <footer className="mt-4 text-sm font-semibold">— {testimonial.author}</footer>
    </blockquote>
  );
}

interface ScrollControlsProps {
  previousLabel: string;
  nextLabel: string;
  onScroll: (direction: 1 | -1) => void;
}

function ScrollControls({ previousLabel, nextLabel, onScroll }: ScrollControlsProps) {
  return (
    <div className="mt-4 flex justify-center gap-3">
      <button
        type="button"
        aria-label={previousLabel}
        onClick={() => onScroll(-1)}
        className="rounded-full border border-white/40 px-3 py-1 text-white transition-colors hover:bg-white/10"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => onScroll(1)}
        className="rounded-full border border-white/40 px-3 py-1 text-white transition-colors hover:bg-white/10"
      >
        ›
      </button>
    </div>
  );
}

export default function TestimonialsScroller({ testimonials, previousLabel, nextLabel }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByDirection(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * SCROLL_AMOUNT, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial._id} testimonial={testimonial} />
        ))}
      </div>
      <ScrollControls
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        onScroll={scrollByDirection}
      />
    </div>
  );
}
