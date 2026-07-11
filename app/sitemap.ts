import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://beccarhew.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/en`, lastModified: new Date() },
    { url: `${BASE}/de`, lastModified: new Date() },
  ];
}
