import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { CONTACT_EMAIL, SMTP_HOST, SMTP_PORT } from '@/lib/site';
import { isRateLimited } from '@/lib/rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidBody(
  body: unknown
): body is { name: string; email: string; message: string } {
  if (typeof body !== 'object' || body === null) return false;
  const { name, email, message } = body as Record<string, unknown>;
  return (
    typeof name === 'string' && name.trim().length > 0 &&
    typeof email === 'string' && EMAIL_REGEX.test(email) &&
    typeof message === 'string' && message.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isValidBody(body)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const client = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(client)) {
    console.error('Contact form rate limit hit by', client);
    return NextResponse.json({ error: 'Too many messages' }, { status: 429 });
  }

  const password = process.env.SMTP_PASSWORD;
  if (!password) {
    console.error('SMTP_PASSWORD is not set, cannot send contact email');
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  // CAVEMAN: infomaniak only accepts a from matching the authenticated mailbox
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: { user: CONTACT_EMAIL, pass: password },
  });

  try {
    await transport.sendMail({
      from: CONTACT_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: body.email,
      subject: `New message from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
    });
  } catch (error) {
    console.error('SMTP error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
