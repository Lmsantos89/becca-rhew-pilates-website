// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TestimonialsCarousel from './TestimonialsCarousel';

const ITEMS = [
  { _id: '1', author: 'Ana', quote: 'Great' },
  { _id: '2', author: 'Cris', quote: 'Wonderful' },
];

function renderCarousel() {
  render(
    <TestimonialsCarousel
      testimonials={ITEMS}
      previousLabel="prev"
      nextLabel="next"
      goToLabel="quote"
    />
  );
}

describe('TestimonialsCarousel', () => {
  it('shows only the first testimonial', () => {
    renderCarousel();
    expect(screen.getByText(/Great/)).toBeInTheDocument();
    expect(screen.queryByText(/Wonderful/)).not.toBeInTheDocument();
  });

  it('shows the next testimonial when next is clicked', () => {
    renderCarousel();
    fireEvent.click(screen.getByLabelText('next'));
    expect(screen.getByText(/Wonderful/)).toBeInTheDocument();
  });

  it('wraps to the last testimonial when previous is clicked first', () => {
    renderCarousel();
    fireEvent.click(screen.getByLabelText('prev'));
    expect(screen.getByText(/Wonderful/)).toBeInTheDocument();
  });

  it('jumps to a testimonial when its dot is clicked', () => {
    renderCarousel();
    fireEvent.click(screen.getByLabelText('quote 2'));
    expect(screen.getByText(/Wonderful/)).toBeInTheDocument();
  });
});
