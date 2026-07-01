import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: 'noreply@beccarhew.com',
    to: process.env.CONTACT_EMAIL!,
    subject: `New message from ${body.name}`,
    text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
