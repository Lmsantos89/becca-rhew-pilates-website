import { getTranslations } from 'next-intl/server';
import { getSiteSettings } from '@/sanity/lib/queries';
import HeroSlideshow from './HeroSlideshow';
import type { Locale } from '@/sanity/lib/types';

// CAVEMAN: drop photos in public/images/hero as slide-1..6.jpg, tint shows until then
const HERO_SLIDES = [
  { tint: '#0D2B45', alt: 'Reformer group class doing a seated side stretch', src: '/images/hero/slide-1.jpg' },
  { tint: '#5A7D9A', alt: 'Instructor correcting a mat class in all fours', src: '/images/hero/slide-2.jpg' },
  { tint: '#3E5A73', alt: 'Private session on the tower, guided side stretch', src: '/images/hero/slide-3.jpg' },
  { tint: '#5A7D9A', alt: 'Hands on cue during a reformer group class', src: '/images/hero/slide-4.jpg' },
  { tint: '#8DBFB7', alt: 'Mat class lying down with arms reaching overhead', src: '/images/hero/slide-5.jpg' },
  {
    tint: '#3E5A73',
    alt: 'Private mat session, instructor mobilising a hip',
    src: '/images/hero/slide-6.jpg',
    // CAVEMAN: high crop cuts her head, low crop cuts the woman on the mat, sit between
    positionClass: 'object-[42%_32%] md:object-[center_32%]',
  },
];

// CAVEMAN: german headline is longer, needs a wider box to stay on two lines
const HEADLINE_WIDTH: Record<Locale, string> = {
  en: 'max-w-2xl',
  de: 'max-w-4xl',
};

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
        <HeroSlideshow slides={HERO_SLIDES} rounded={false} showDots={false} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent" />
      <div className="relative mx-auto w-full max-w-container px-6 pb-16 text-white md:pb-24">
        <h1
          className={`${HEADLINE_WIDTH[locale]} font-heading text-4xl font-semibold leading-[1.05] md:text-6xl`}
        >
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
