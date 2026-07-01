import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { IconBrandInstagram, IconMail, IconMapPin } from '@tabler/icons-react';
import { getSiteSettings } from '@/sanity/lib/queries';
import ContactForm from '@/components/ContactForm';
import type { Locale } from '@/sanity/lib/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('contactTitle'), description: t('contactDescription') };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, settings] = await Promise.all([
    getTranslations('contact'),
    getSiteSettings(locale as Locale),
  ]);

  return (
    <section className="mx-auto max-w-container px-6 py-20">
      <h1 className="font-heading text-4xl font-semibold">{t('title')}</h1>
      <p className="mt-2 text-muted">{t('subtitle')}</p>
      <div className="mt-12 grid gap-16 md:grid-cols-2">
        <ContactForm />
        <aside className="flex flex-col gap-5 text-sm text-text-primary">
          <div className="flex items-center gap-3">
            <IconMapPin size={18} className="flex-shrink-0 text-accent" />
            <span>{t('location')}</span>
          </div>
          {settings?.contactEmail && (
            <div className="flex items-center gap-3">
              <IconMail size={18} className="flex-shrink-0 text-accent" />
              <a href={`mailto:${settings.contactEmail}`} className="transition-colors hover:text-accent">
                {settings.contactEmail}
              </a>
            </div>
          )}
          {settings?.instagramUrl && (
            <div className="flex items-center gap-3">
              <IconBrandInstagram size={18} className="flex-shrink-0 text-accent" />
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                {t('instagramLabel')}
              </a>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
