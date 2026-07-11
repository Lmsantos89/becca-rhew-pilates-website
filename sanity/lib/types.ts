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
  linkUrl?: string;
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
  language: string;
  locationName?: string;
  locationCity?: string;
  isActive: boolean;
}

export interface Certification {
  name: string;
  year: string;
}

export interface Testimonial {
  _id: string;
  author: string;
  quote: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheading: string;
  contactEmail: string;
  phone?: string;
  instagramUrl?: string;
  heroImage?: SanityImage;
  bioImage?: SanityImage;
  bioText: unknown[];
  approachText: string;
  certifications: Certification[];
}
