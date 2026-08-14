import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/en`, lastModified: new Date() },
    { url: `${SITE_URL}/de`, lastModified: new Date() },
  ];
}
