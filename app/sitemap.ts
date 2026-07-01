import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://beccarhew.com';

const EN_PATHS = ['', '/offerings', '/schedule', '/about', '/contact'];
const DE_PATH_MAP: Record<string, string> = {
  '/offerings': '/angebote',
  '/schedule': '/stundenplan',
  '/about': '/ueber-mich',
  '/contact': '/kontakt',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of EN_PATHS) {
    entries.push({ url: `${BASE}/en${path}`, lastModified: new Date() });
    entries.push({ url: `${BASE}/de${DE_PATH_MAP[path] ?? path}`, lastModified: new Date() });
  }
  return entries;
}
