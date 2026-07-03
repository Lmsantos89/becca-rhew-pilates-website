import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PortableText } from '@portabletext/react';
import { getSiteSettings } from '@/sanity/lib/queries';
import type { Locale } from '@/sanity/lib/types';

// CAVEMAN: lorem placeholder until Sanity connected. Obvious dummy text, not real bio.
const PLACEHOLDER_BIO: Record<Locale, string[]> = {
  en: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    'Deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, ut gravida est sagittis ut, vel dignissim lacus.',
  ],
  de: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    'Deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, ut gravida est sagittis ut, vel dignissim lacus.',
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('aboutTitle'), description: t('aboutDescription') };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, settings] = await Promise.all([
    getTranslations('about'),
    getSiteSettings(locale as Locale),
  ]);
  const hasBio = Array.isArray(settings?.bioText) && settings.bioText.length > 0;

  return (
    <section className="mx-auto max-w-container px-6 py-20">
      <h1 className="font-heading text-4xl font-semibold">{t('title')}</h1>
      <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-start">
        <div className="aspect-[3/4] w-full rounded-lg bg-[#D9D3CC]" aria-hidden="true" />
        <div>
          {hasBio ? (
            <PortableText value={settings!.bioText as Parameters<typeof PortableText>[0]['value']} />
          ) : (
            PLACEHOLDER_BIO[locale as Locale].map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-text-primary">
                {para}
              </p>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
