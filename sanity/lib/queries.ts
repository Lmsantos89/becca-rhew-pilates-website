import { getClient } from './client';
import type { Locale, Offering, ClassScheduleEntry, SiteSettings } from './types';

const DAY_ORDER: string[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
];

export async function getSiteSettings(locale: Locale): Promise<SiteSettings | null> {
  const client = getClient();
  if (!client) return null;
  const data = await client.fetch(
    `*[_type == "siteSettings"][0]{
      siteName,
      "tagline": tagline_${locale},
      contactEmail,
      instagramUrl,
      heroImage { asset, alt_en, alt_de },
      bioImage { asset, alt_en, alt_de },
      "bioText": bioText_${locale}
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
  return data ?? null;
}

export async function getOfferings(locale: Locale): Promise<Offering[]> {
  const client = getClient();
  if (!client) return [];
  const data = await client.fetch(
    `*[_type == "offering"] | order(_createdAt asc) {
      _id,
      "title": title_${locale},
      "description": description_${locale},
      image { asset, alt_en, alt_de }
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
  return data ?? [];
}

export async function getSchedule(locale: Locale): Promise<ClassScheduleEntry[]> {
  const client = getClient();
  if (!client) return [];
  const raw: ClassScheduleEntry[] = await client.fetch(
    `*[_type == "classSchedule" && isActive == true] {
      _id,
      dayOfWeek,
      time,
      "className": className_${locale},
      location,
      isActive
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
  return (raw ?? []).sort(
    (a, b) =>
      DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek) ||
      a.time.localeCompare(b.time)
  );
}
