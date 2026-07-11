// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import HeroSlideshow from './HeroSlideshow';

function mockMatchMedia(reduced: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

const SLIDES = [
  { tint: '#111', alt: 'one' },
  { tint: '#222', alt: 'two' },
  { tint: '#333', alt: 'three' },
];

describe('HeroSlideshow', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

  it('advances to next slide after interval and wraps around', () => {
    mockMatchMedia(false);
    render(<HeroSlideshow slides={SLIDES} intervalMs={1000} />);
    expect(screen.getByLabelText('one')).toHaveClass('opacity-100');
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByLabelText('two')).toHaveClass('opacity-100');
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByLabelText('one')).toHaveClass('opacity-100');
  });

  it('does not auto-advance when reduced motion is preferred', () => {
    mockMatchMedia(true);
    render(<HeroSlideshow slides={SLIDES} intervalMs={1000} />);
    act(() => { vi.advanceTimersByTime(5000); });
    expect(screen.getByLabelText('one')).toHaveClass('opacity-100');
  });

  it('jumps to a slide when its dot is clicked', () => {
    mockMatchMedia(false);
    render(<HeroSlideshow slides={SLIDES} intervalMs={100000} />);
    act(() => { fireEvent.click(screen.getByLabelText('Show slide 3')); });
    expect(screen.getByLabelText('three')).toHaveClass('opacity-100');
  });
});
