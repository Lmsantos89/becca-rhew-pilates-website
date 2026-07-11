import { getTranslations } from 'next-intl/server';
import { PortableText } from '@portabletext/react';
import { getSiteSettings } from '@/sanity/lib/queries';
import FallbackImage from './FallbackImage';
import type { Locale, Certification } from '@/sanity/lib/types';

// CAVEMAN: demo bio until Sanity filled. DE machine-drafted, confirm with client
const PLACEHOLDER_BIO: Record<Locale, string[]> = {
  en: [
    'Becca Rhew has taught Pilates in Bern for over a decade. A certified mat and reformer instructor with pre/post-natal and osteoporosis certifications, she is an American who has lived in Bern for more than 15 years, teaching in English and Hochdeutsch.',
    'Her approach centers on midlife clients — meeting each body where it is and building strength, mobility and confidence through mindful, science-based movement.',
  ],
  de: [
    'Becca Rhew unterrichtet seit über einem Jahrzehnt Pilates in Bern. Als zertifizierte Matten- und Reformer-Instruktorin mit Zertifizierungen für prä- und postnatales Training sowie Osteoporose ist sie Amerikanerin und lebt seit mehr als 15 Jahren in Bern, wo sie auf Englisch und Hochdeutsch unterrichtet.',
    'Ihr Ansatz richtet sich an Kundinnen in der Lebensmitte — sie holt jeden Körper dort ab, wo er steht, und baut durch achtsame, wissenschaftlich fundierte Bewegung Kraft, Beweglichkeit und Selbstvertrauen auf.',
  ],
};

// CAVEMAN: confirm Stott Reformer year 2026 with client, looks wrong
const PLACEHOLDER_CERTS: Certification[] = [
  { name: 'Polestar Pilates, Mat', year: '2013' },
  { name: 'Stott Pilates, Reformer', year: '2026' },
];

type Translator = Awaited<ReturnType<typeof getTranslations>>;

// CAVEMAN: bio column split out so About stays under 40 lines
function Biography({
  t,
  locale,
  bioValue,
  certifications,
}: {
  t: Translator;
  locale: Locale;
  bioValue: unknown[] | null;
  certifications: Certification[];
}) {
  return (
    <div>
      <h2 className="font-heading text-3xl font-semibold text-ink">{t('title')}</h2>
      <div className="mt-6 space-y-4 leading-relaxed text-ink/80">
        {bioValue ? (
          <PortableText value={bioValue as Parameters<typeof PortableText>[0]['value']} />
        ) : (
          PLACEHOLDER_BIO[locale].map((paragraph, index) => <p key={index}>{paragraph}</p>)
        )}
      </div>
      <h3 className="mt-8 font-heading text-lg font-semibold text-ink">
        {t('certificationsTitle')}
      </h3>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/80">
        {certifications.map((certification) => (
          <li key={`${certification.name}-${certification.year}`}>
            {certification.name} — {certification.year}
          </li>
        ))}
      </ul>
    </div>
  );
}

// CAVEMAN: headshot placeholder + arced approach text split out so About stays under 40 lines
function ApproachArc({ approach }: { approach: string }) {
  return (
    <div className="relative flex justify-center pt-24">
      <svg
        viewBox="0 0 300 170"
        className="pointer-events-none absolute top-0 left-1/2 h-60 w-[28rem] -translate-x-1/2"
        aria-hidden="true"
      >
        <defs>
          <path id="approachArc" d="M 20 160 A 130 130 0 0 1 280 160" fill="none" />
        </defs>
        <text className="fill-steel font-heading text-[12px]">
          <textPath href="#approachArc" startOffset="50%" textAnchor="middle">
            {approach}
          </textPath>
        </text>
      </svg>
      <FallbackImage
        src="/images/about/becca.jpg"
        alt="Becca Rhew"
        tint="#C5D8E2"
        className="aspect-square w-80 rounded-full"
      />
    </div>
  );
}

export default async function About({ locale }: { locale: Locale }) {
  const [t, settings] = await Promise.all([
    getTranslations('about'),
    getSiteSettings(locale),
  ]);
  const hasBio = Array.isArray(settings?.bioText) && settings.bioText.length > 0;
  const certifications = settings?.certifications?.length
    ? settings.certifications
    : PLACEHOLDER_CERTS;
  const approach = settings?.approachText ?? t('approach');

  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto grid max-w-container gap-16 px-6 md:grid-cols-2 md:items-start">
        <Biography
          t={t}
          locale={locale}
          bioValue={hasBio ? (settings!.bioText as unknown[]) : null}
          certifications={certifications}
        />
        <ApproachArc approach={approach} />
      </div>
    </section>
  );
}
