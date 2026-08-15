'use client';
import { useEffect, useState } from 'react';
import type { Testimonial } from '@/sanity/lib/types';

interface Props {
  testimonials: Testimonial[];
  previousLabel: string;
  nextLabel: string;
  goToLabel: string;
}

// CAVEMAN: page size follows the grid columns so every quote stays reachable
const VISIBLE_BY_BREAKPOINT = [
  { query: '(min-width: 1024px)', count: 3 },
  { query: '(min-width: 640px)', count: 2 },
];
const NARROW_COUNT = 1;
// CAVEMAN: fits longest quote in both languages so section never resizes
const CARD_HEIGHT = 'min-h-[28rem]';
const ARROW_CLASS =
  'rounded-full border border-white/40 px-3 py-1 text-white transition-colors hover:bg-white/10';

function useVisibleCount(): number {
  const [visibleCount, setVisibleCount] = useState(VISIBLE_BY_BREAKPOINT[0].count);

  useEffect(() => {
    const mediaQueries = VISIBLE_BY_BREAKPOINT.map((step) => window.matchMedia(step.query));
    function update() {
      const step = VISIBLE_BY_BREAKPOINT.find((_, index) => mediaQueries[index].matches);
      setVisibleCount(step ? step.count : NARROW_COUNT);
    }
    update();
    mediaQueries.forEach((mediaQuery) => mediaQuery.addEventListener('change', update));
    return () =>
      mediaQueries.forEach((mediaQuery) => mediaQuery.removeEventListener('change', update));
  }, []);

  return visibleCount;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote
      className={`${CARD_HEIGHT} flex flex-col justify-between rounded-lg bg-white/10 p-6 text-white`}
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
  const visibleCount = useVisibleCount();
  const count = testimonials.length;
  const pageCount = Math.max(1, Math.ceil(count / visibleCount));
  // CAVEMAN: resizing can leave page past the end
  const safePage = Math.min(page, pageCount - 1);
  // CAVEMAN: last page sticks to the end so no half empty row
  const start = Math.max(0, Math.min(safePage * visibleCount, count - visibleCount));
  const visible = testimonials.slice(start, start + visibleCount);

  function step(direction: 1 | -1) {
    setPage((current) => (Math.min(current, pageCount - 1) + direction + pageCount) % pageCount);
  }

  if (count === 0) {
    return null;
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((testimonial) => (
          <TestimonialCard key={testimonial._id} testimonial={testimonial} />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button type="button" aria-label={previousLabel} onClick={() => step(-1)} className={ARROW_CLASS}>
            ‹
          </button>
          <Dots count={pageCount} activeIndex={safePage} goToLabel={goToLabel} onSelect={setPage} />
          <button type="button" aria-label={nextLabel} onClick={() => step(1)} className={ARROW_CLASS}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}
