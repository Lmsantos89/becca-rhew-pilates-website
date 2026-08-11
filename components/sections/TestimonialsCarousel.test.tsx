// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TestimonialsCarousel from './TestimonialsCarousel';

const ITEMS = [
  { _id: '1', author: 'Ana', quote: 'Great' },
  { _id: '2', author: 'Cris', quote: 'Wonderful' },
  { _id: '3', author: 'Mari', quote: 'Caring' },
  { _id: '4', author: 'Jasmin', quote: 'Varied' },
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
  it('shows the first three testimonials', () => {
    renderCarousel();
    expect(screen.getByText(/Great/)).toBeInTheDocument();
    expect(screen.getByText(/Wonderful/)).toBeInTheDocument();
    expect(screen.getByText(/Caring/)).toBeInTheDocument();
    expect(screen.queryByText(/Varied/)).not.toBeInTheDocument();
  });

  it('slides the window by one when next is clicked', () => {
    renderCarousel();
    fireEvent.click(screen.getByLabelText('next'));
    expect(screen.queryByText(/Great/)).not.toBeInTheDocument();
    expect(screen.getByText(/Varied/)).toBeInTheDocument();
  });

  it('wraps around so three cards always show', () => {
    renderCarousel();
    fireEvent.click(screen.getByLabelText('prev'));
    expect(screen.getByText(/Varied/)).toBeInTheDocument();
    expect(screen.getByText(/Great/)).toBeInTheDocument();
    expect(screen.getByText(/Wonderful/)).toBeInTheDocument();
  });

  it('jumps the window when a dot is clicked', () => {
    renderCarousel();
    fireEvent.click(screen.getByLabelText('quote 4'));
    expect(screen.getByText(/Varied/)).toBeInTheDocument();
    expect(screen.getByText(/Great/)).toBeInTheDocument();
  });
});
