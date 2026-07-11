import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Experiences from '@/components/sections/Experiences';
import Schedule from '@/components/sections/Schedule';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
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
  const typedLocale = locale as Locale;
  return (
    <>
      <Hero locale={typedLocale} />
      <Experiences locale={typedLocale} />
      <Schedule locale={typedLocale} />
      <About locale={typedLocale} />
      <Testimonials locale={typedLocale} />
      <Contact locale={typedLocale} />
    </>
  );
}
