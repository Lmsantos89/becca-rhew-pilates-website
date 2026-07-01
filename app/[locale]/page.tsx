import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getSiteSettings } from '@/sanity/lib/queries';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/sanity/lib/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    openGraph: { title: t('homeTitle'), description: t('homeDescription') },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, settings] = await Promise.all([
    getTranslations('home'),
    getSiteSettings(locale as Locale),
  ]);

  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center bg-beige px-6 py-20 text-center">
      <div className="mb-8 h-64 w-64 rounded-full bg-[#D9D3CC]" aria-hidden="true" />
      <h1 className="font-heading text-5xl font-semibold tracking-tight text-text-primary md:text-6xl">
        {settings?.siteName ?? 'Becca Rhew'}
      </h1>
      <p className="mt-3 text-lg text-muted">{t('heroSubtitle')}</p>
      {settings?.tagline && (
        <p className="mt-4 max-w-md text-xl text-text-primary">{settings.tagline}</p>
      )}
      <Link
        href="/offerings"
        className="mt-8 inline-block bg-accent px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-opacity hover:opacity-80"
      >
        {t('cta')}
      </Link>
    </section>
  );
}
