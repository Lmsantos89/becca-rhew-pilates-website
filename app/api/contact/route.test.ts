import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: 'test-id' }),
    })),
  },
}));

function makeRequest(body: unknown, forwardedFor?: string): Request {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (forwardedFor) headers['x-forwarded-for'] = forwardedFor;
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.SMTP_PASSWORD = 'test-password';
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

  it('returns 500 when SMTP_PASSWORD is missing', async () => {
    delete process.env.SMTP_PASSWORD;
    const { POST } = await import('./route');
    const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello!' }));
    expect(res.status).toBe(500);
  });

  it('returns 429 once the same client sends too many messages', async () => {
    const { POST } = await import('./route');
    const send = () => POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello!' }));
    expect((await send()).status).toBe(200);
    expect((await send()).status).toBe(200);
    expect((await send()).status).toBe(200);
    expect((await send()).status).toBe(429);
  });

  it('ignores a spoofed client address in front of the proxy one', async () => {
    const { POST } = await import('./route');
    const send = (spoof: string) =>
      POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello!' }, `${spoof}, 9.9.9.9`));
    expect((await send('1.1.1.1')).status).toBe(200);
    expect((await send('2.2.2.2')).status).toBe(200);
    expect((await send('3.3.3.3')).status).toBe(200);
    expect((await send('4.4.4.4')).status).toBe(429);
  });

  it('returns 200 on valid submission', async () => {
    const { POST } = await import('./route');
    const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello!' }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });
});
