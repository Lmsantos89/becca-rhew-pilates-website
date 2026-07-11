import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('getTestimonials', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  });

  it('returns empty array when Sanity is not configured', async () => {
    const { getTestimonials } = await import('./queries');
    const result = await getTestimonials();
    expect(result).toEqual([]);
  });
});
