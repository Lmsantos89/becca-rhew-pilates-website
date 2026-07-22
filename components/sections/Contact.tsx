import { getTranslations } from 'next-intl/server';
import { IconMail, IconPhone } from '@tabler/icons-react';
import { getSiteSettings } from '@/sanity/lib/queries';
import ContactForm from '@/components/ContactForm';
import type { Locale } from '@/sanity/lib/types';

// CAVEMAN: fallbacks until Sanity filled
const PLACEHOLDER_PHONE = '+41 79 679 85 57';
const PLACEHOLDER_EMAIL = 'vitalitypilatesbern@gmail.com';

type Translator = Awaited<ReturnType<typeof getTranslations>>;

// CAVEMAN: aside pulled out so Contact stays under 40 lines
function ContactInfo({ t, phone, email }: { t: Translator; phone: string; email: string }) {
  return (
    <aside className="flex flex-col gap-6 text-ink">
      <div className="flex items-start gap-3">
        <IconPhone size={18} className="mt-1 flex-shrink-0 text-steel" />
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">{t('phoneLabel')}</p>
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="transition-colors hover:text-steel">
            {phone}
          </a>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <IconMail size={18} className="mt-1 flex-shrink-0 text-steel" />
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">{t('emailLabel')}</p>
          <a href={`mailto:${email}`} className="transition-colors hover:text-steel">
            {email}
          </a>
        </div>
      </div>
    </aside>
  );
}

export default async function Contact({ locale }: { locale: Locale }) {
  const [t, settings] = await Promise.all([
    getTranslations('contact'),
    getSiteSettings(locale),
  ]);
  const phone = settings?.phone ?? PLACEHOLDER_PHONE;
  const email = settings?.contactEmail ?? PLACEHOLDER_EMAIL;

  return (
    <section id="contact" className="bg-cream py-24">
      <div className="mx-auto max-w-container px-6">
        <h2 className="font-heading text-3xl font-semibold text-ink">{t('title')}</h2>
        <p className="mt-2 text-muted">{t('subtitle')}</p>
        <div className="mt-12 grid gap-16 md:grid-cols-2">
          <ContactInfo t={t} phone={phone} email={email} />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
