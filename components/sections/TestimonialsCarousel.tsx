'use client';
import { useState } from 'react';
import type { Testimonial } from '@/sanity/lib/types';

interface Props {
  testimonials: Testimonial[];
  previousLabel: string;
  nextLabel: string;
  goToLabel: string;
}

const VISIBLE_COUNT = 3;
// CAVEMAN: fits longest quote in both languages so section never resizes
const CARD_HEIGHT = 'min-h-[28rem]';
const ARROW_CLASS =
  'rounded-full border border-white/40 px-3 py-1 text-white transition-colors hover:bg-white/10';
// CAVEMAN: narrow screens drop the extra cards, window still slides by one
const SLOT_CLASS = ['flex', 'hidden sm:flex', 'hidden lg:flex'];

function TestimonialCard({ testimonial, slot }: { testimonial: Testimonial; slot: number }) {
  return (
    <blockquote
      className={`${CARD_HEIGHT} flex-col justify-between rounded-lg bg-white/10 p-6 text-white ${SLOT_CLASS[slot]}`}
    >
      <p className="text-sm leading-relaxed">“{testimonial.quote}”</p>
      <footer className="mt-4 text-sm font-semibold uppercase tracking-widest">
        — {testimonial.author}
      </footer>
    </blockquote>
  );
}

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
  const [page, setPage] = useState(0);
  const count = testimonials.length;
  const pageCount = Math.max(1, Math.ceil(count / VISIBLE_COUNT));
  // CAVEMAN: last page sticks to the end so no half empty row
  const start = Math.max(0, Math.min(page * VISIBLE_COUNT, count - VISIBLE_COUNT));
  const visible = testimonials.slice(start, start + VISIBLE_COUNT);

  function step(direction: 1 | -1) {
    setPage((current) => (current + direction + pageCount) % pageCount);
  }

  if (count === 0) {
    return null;
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((testimonial, slot) => (
          <TestimonialCard key={testimonial._id} testimonial={testimonial} slot={slot} />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button type="button" aria-label={previousLabel} onClick={() => step(-1)} className={ARROW_CLASS}>
            ‹
          </button>
          <Dots count={pageCount} activeIndex={page} goToLabel={goToLabel} onSelect={setPage} />
          <button type="button" aria-label={nextLabel} onClick={() => step(1)} className={ARROW_CLASS}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}
