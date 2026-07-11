import { getTranslations } from 'next-intl/server';
import { getSiteSettings } from '@/sanity/lib/queries';
import HeroSlideshow from './HeroSlideshow';
import type { Locale } from '@/sanity/lib/types';

// CAVEMAN: drop photos in public/images/hero as slide-1/2/3.jpg, tint shows until then
const PLACEHOLDER_SLIDES = [
  { tint: '#8FB0C4', alt: 'Mat pilates stretch', src: '/images/hero/slide-1.jpg' },
  { tint: '#A9C4C0', alt: 'Reformer session', src: '/images/hero/slide-2.jpg' },
  { tint: '#C4B7A9', alt: 'Private training', src: '/images/hero/slide-3.jpg' },
];

export default async function Hero({ locale }: { locale: Locale }) {
  const [t, settings] = await Promise.all([
    getTranslations('hero'),
    getSiteSettings(locale),
  ]);
  const headline = settings?.heroHeadline ?? t('headline');
  const subheading = settings?.heroSubheading ?? t('subheading');

  return (
    <section id="home" className="grid grid-cols-1 md:min-h-[90vh] md:grid-cols-2">
      <div className="min-h-[50vh] bg-cream p-6 md:min-h-0">
        <HeroSlideshow slides={PLACEHOLDER_SLIDES} />
      </div>
      <div className="flex flex-col justify-center bg-steel px-8 py-16 text-white md:px-16">
        <h1 className="font-heading text-4xl font-semibold leading-tight md:text-5xl">
          {headline}
        </h1>
        <p className="mt-6 max-w-md text-lg text-white/90">{subheading}</p>
      </div>
    </section>
  );
}
