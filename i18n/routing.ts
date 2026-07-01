import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de'] as const,
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/offerings': { en: '/offerings', de: '/angebote' },
    '/schedule': { en: '/schedule', de: '/stundenplan' },
    '/about': { en: '/about', de: '/ueber-mich' },
    '/contact': { en: '/contact', de: '/kontakt' },
  },
});
