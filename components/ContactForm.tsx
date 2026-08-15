'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const INPUT_CLASS =
  'rounded border border-[#E0DBD5] bg-white px-4 py-3 text-sm outline-none focus:border-steel focus:ring-1 focus:ring-steel';
// CAVEMAN: type=email alone lets "a@gmail" through, server wants a dotted domain
const EMAIL_PATTERN = '[^\\s@]+@[^\\s@]+\\.[^\\s@]+';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorKey, setErrorKey] = useState<'error' | 'tooManyMessages'>('error');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) setErrorKey(res.status === 429 ? 'tooManyMessages' : 'error');
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">{t('nameLabel')}</label>
        <input id="name" name="name" type="text" required placeholder={t('namePlaceholder')} className={INPUT_CLASS} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">{t('emailLabel')}</label>
        <input
          id="email" name="email" type="email" required
          pattern={EMAIL_PATTERN}
          title={t('emailInvalid')}
          placeholder={t('emailPlaceholder')}
          className={INPUT_CLASS}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium">{t('messageLabel')}</label>
        <textarea
          id="message" name="message" required rows={5}
          placeholder={t('messagePlaceholder')}
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-ink px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
      {status === 'success' && <p className="text-sm text-steel">{t('success')}</p>}
      {status === 'error' && <p className="text-sm text-red-600">{t(errorKey)}</p>}
    </form>
  );
}
