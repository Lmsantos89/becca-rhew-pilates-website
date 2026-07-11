// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TestimonialsScroller from './TestimonialsScroller';

const ITEMS = [
  { _id: '1', author: 'Ana', quote: 'Great' },
  { _id: '2', author: 'Cris', quote: 'Wonderful' },
];

describe('TestimonialsScroller', () => {
  beforeEach(() => {
    Element.prototype.scrollBy = vi.fn();
  });

  it('renders every testimonial', () => {
    render(<TestimonialsScroller testimonials={ITEMS} previousLabel="prev" nextLabel="next" />);
    expect(screen.getByText('Great')).toBeInTheDocument();
    expect(screen.getByText('Wonderful')).toBeInTheDocument();
  });

  it('scrolls right when next is clicked', () => {
    render(<TestimonialsScroller testimonials={ITEMS} previousLabel="prev" nextLabel="next" />);
    fireEvent.click(screen.getByLabelText('next'));
    const calls = (Element.prototype.scrollBy as unknown as { mock: { calls: any[] } }).mock.calls;
    expect(calls[calls.length - 1][0].left).toBeGreaterThan(0);
  });

  it('scrolls left when previous is clicked', () => {
    render(<TestimonialsScroller testimonials={ITEMS} previousLabel="prev" nextLabel="next" />);
    fireEvent.click(screen.getByLabelText('prev'));
    const calls = (Element.prototype.scrollBy as unknown as { mock: { calls: any[] } }).mock.calls;
    expect(calls[calls.length - 1][0].left).toBeLessThan(0);
  });
});
