export type Locale = 'en' | 'de';

export interface SanityImageAsset {
  _ref: string;
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt_en?: string;
  alt_de?: string;
}

export interface Offering {
  _id: string;
  title: string;
  description: string;
  image?: SanityImage;
}

export type DayOfWeek =
  | 'monday' | 'tuesday' | 'wednesday' | 'thursday'
  | 'friday' | 'saturday' | 'sunday';

export interface ClassScheduleEntry {
  _id: string;
  dayOfWeek: DayOfWeek;
  time: string;
  className: string;
  location?: string;
  isActive: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  instagramUrl?: string;
  heroImage?: SanityImage;
  bioImage?: SanityImage;
  bioText: unknown[];
}
