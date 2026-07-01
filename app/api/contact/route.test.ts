import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('resend', () => ({
  // vitest v4 requires function keyword for constructor mocks
  Resend: vi.fn().mockImplementation(function () {
    return {
      emails: {
        send: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
      },
    };
  }),
}));

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.RESEND_API_KEY = 'test-key';
    process.env.CONTACT_EMAIL = 'test@example.com';
  });

  it('returns 400 when name is empty', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeRequest({ name: '', email: 'a@b.com', message: 'hello' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when email is invalid', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeRequest({ name: 'Alice', email: 'not-an-email', message: 'hello' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when message is empty', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: '' }));
    expect(res.status).toBe(400);
  });

  it('returns 200 on valid submission', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello!' }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });
});
