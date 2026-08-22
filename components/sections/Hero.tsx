import { getTranslations } from 'next-intl/server';
import { getSiteSettings } from '@/sanity/lib/queries';
import HeroSlideshow from './HeroSlideshow';
import type { Locale } from '@/sanity/lib/types';

// CAVEMAN: drop photos in public/images/hero as slide-1..6.jpg, tint shows until then
const HERO_SLIDES = [
  {
    tint: '#0D2B45',
    alt: 'Reformer group class doing a seated side stretch',
    src: '/images/hero/slide-1.jpg',
    mobileSrc: '/images/hero/slide-1-mobile.jpg',
  },
  {
    tint: '#5A7D9A',
    alt: 'Instructor correcting a mat class in all fours',
    src: '/images/hero/slide-2.jpg',
    mobileSrc: '/images/hero/slide-2-mobile.jpg',
  },
  {
    tint: '#3E5A73',
    alt: 'Private session on the tower, guided side stretch',
    src: '/images/hero/slide-3.jpg',
    mobileSrc: '/images/hero/slide-3-mobile.jpg',
  },
  {
    tint: '#5A7D9A',
    alt: 'Hands on cue during a reformer group class',
    src: '/images/hero/slide-4.jpg',
    mobileSrc: '/images/hero/slide-4-mobile.jpg',
  },
  {
    tint: '#8DBFB7',
    alt: 'Mat class lying down with arms reaching overhead',
    src: '/images/hero/slide-5.jpg',
    mobileSrc: '/images/hero/slide-5-mobile.jpg',
  },
  {
    tint: '#3E5A73',
    alt: 'Private mat session, instructor mobilising a hip',
    src: '/images/hero/slide-6.jpg',
    mobileSrc: '/images/hero/slide-6-mobile.jpg',
    // CAVEMAN: high crop cuts her head, low crop cuts the woman on the mat, sit between
    positionClass: 'md:object-[center_32%]',
  },
];

// CAVEMAN: german line is longer, needs a wider box to stay on two lines on desktop
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
    <section
      id="home"
      className="relative overflow-hidden bg-ink md:flex md:min-h-[88vh] md:items-end"
    >
      {/* CAVEMAN: phones get their own 4:5 band so no text sits on the photo */}
      <div className="relative aspect-[4/5] w-full md:absolute md:inset-0 md:aspect-auto">
        <HeroSlideshow slides={HERO_SLIDES} rounded={false} showDots={false} />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/90 via-ink/50 to-transparent md:block" />
      </div>
      <div className="relative mx-auto w-full max-w-container px-6 py-10 text-white md:py-0 md:pb-24">
        {/* CAVEMAN: 22px is the biggest phone size where both locales hold two lines at 360px */}
        <h1
          className={`${HEADLINE_WIDTH[locale]} font-heading text-[1.375rem] font-semibold leading-[1.1] md:text-6xl md:leading-[1.05]`}
        >
          {headline}
        </h1>
        <p className="mt-4 max-w-lg text-lg text-white/90 md:mt-5">{subheading}</p>
        {/* CAVEMAN: german labels are wide, equal columns keep both buttons on one row */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:flex md:flex-wrap md:items-center md:gap-4">
          <a
            href="#schedule"
            className="rounded-full bg-white px-3 py-3 text-center text-xs font-semibold text-ink transition-colors hover:bg-cream md:px-7 md:text-sm"
          >
            {t('viewSchedule')}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/60 px-3 py-3 text-center text-xs font-semibold text-white transition-colors hover:bg-white/10 md:px-7 md:text-sm"
          >
            {t('getInTouch')}
          </a>
        </div>
      </div>
    </section>
  );
}
