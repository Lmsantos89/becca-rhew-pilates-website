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
  { _id: '5', author: 'Marianne', quote: 'Painless' },
];

function renderCarousel(testimonials = ITEMS) {
  render(
    <TestimonialsCarousel
      testimonials={testimonials}
      previousLabel="prev"
      nextLabel="next"
      goToLabel="page"
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

  it('shows the last three testimonials on the next page', () => {
    renderCarousel();
    fireEvent.click(screen.getByLabelText('next'));
    expect(screen.getByText(/Caring/)).toBeInTheDocument();
    expect(screen.getByText(/Varied/)).toBeInTheDocument();
    expect(screen.getByText(/Painless/)).toBeInTheDocument();
    expect(screen.queryByText(/Great/)).not.toBeInTheDocument();
  });

  it('has one dot per page, not per testimonial', () => {
    renderCarousel();
    expect(screen.getByLabelText('page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('page 2')).toBeInTheDocument();
    expect(screen.queryByLabelText('page 3')).not.toBeInTheDocument();
  });

  it('wraps from the last page back to the first', () => {
    renderCarousel();
    fireEvent.click(screen.getByLabelText('next'));
    fireEvent.click(screen.getByLabelText('next'));
    expect(screen.getByText(/Great/)).toBeInTheDocument();
  });

  it('hides the controls when everything fits on one page', () => {
    renderCarousel(ITEMS.slice(0, 3));
    expect(screen.queryByLabelText('next')).not.toBeInTheDocument();
  });
});
