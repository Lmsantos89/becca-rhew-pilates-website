import { getTranslations } from 'next-intl/server';
import { getSiteSettings } from '@/sanity/lib/queries';
import HeroSlideshow from './HeroSlideshow';
import type { Locale } from '@/sanity/lib/types';

// CAVEMAN: drop photos in public/images/hero as slide-1/2/3.jpg, tint shows until then
const PLACEHOLDER_SLIDES = [
  { tint: '#0D2B45', alt: 'Mat pilates stretch', src: '/images/hero/slide-1.jpg' },
  { tint: '#5A7D9A', alt: 'Reformer session', src: '/images/hero/slide-2.jpg' },
  { tint: '#3E5A73', alt: 'Private training', src: '/images/hero/slide-3.jpg' },
];

export default async function Hero({ locale }: { locale: Locale }) {
  const [t, settings] = await Promise.all([
    getTranslations('hero'),
    getSiteSettings(locale),
  ]);
  const headline = settings?.heroHeadline ?? t('headline');
  const subheading = settings?.heroSubheading ?? t('subheading');

  return (
    <section id="home" className="relative flex min-h-[70vh] items-end overflow-hidden md:min-h-[88vh]">
      <div className="absolute inset-0">
        <HeroSlideshow slides={PLACEHOLDER_SLIDES} rounded={false} showDots={false} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent" />
      <div className="relative mx-auto w-full max-w-container px-6 pb-16 text-white md:pb-24">
        <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-[1.05] md:text-6xl">
          {headline}
        </h1>
        <p className="mt-5 max-w-lg text-lg text-white/90">{subheading}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#schedule"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream"
          >
            {t('viewSchedule')}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/60 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t('getInTouch')}
          </a>
        </div>
      </div>
    </section>
  );
}
