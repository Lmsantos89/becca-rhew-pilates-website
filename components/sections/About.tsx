import { getTranslations } from 'next-intl/server';
import { PortableText } from '@portabletext/react';
import { getSiteSettings } from '@/sanity/lib/queries';
import FallbackImage from './FallbackImage';
import type { Locale, Certification } from '@/sanity/lib/types';

// CAVEMAN: demo bio until Sanity filled. DE machine-drafted, confirm with client
const PLACEHOLDER_BIO: Record<Locale, string[]> = {
  en: [
    "Becca Rhew has been teaching Pilates in the Bern area for over a decade. She's a certified mat and reformer instructor and has additional certifications in pre- and post-natal Pilates as well as osteoporosis-focused Pilates. As an American living in Bern for over 15 years, she offers classes in English as well as Hochdeutsch.",
    'Becca is passionate about empowering clients in midlife and beyond to build and sustain a strong, healthy body while helping them understand how their bodies work and how mindful movement and exercise can keep them mobile, active, and confident throughout life.',
  ],
  de: [
    'Becca Rhew unterrichtet seit über einem Jahrzehnt Pilates in der Region Bern. Sie ist zertifizierte Matten- und Reformer-Instruktorin und verfügt über zusätzliche Zertifizierungen in prä- und postnatalem Pilates sowie in osteoporose-orientiertem Pilates. Als Amerikanerin, die seit über 15 Jahren in Bern lebt, bietet sie Kurse auf Englisch und Hochdeutsch an.',
    'Becca setzt sich mit Leidenschaft dafür ein, Kundinnen und Kunden in der Lebensmitte und darüber hinaus zu stärken — damit sie einen kräftigen, gesunden Körper aufbauen und erhalten. Zugleich hilft sie ihnen zu verstehen, wie ihr Körper funktioniert und wie achtsame Bewegung sie ein Leben lang mobil, aktiv und selbstbewusst hält.',
  ],
};

// CAVEMAN: client confirmed years by sending them
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

// CAVEMAN: 2:3 box matches the photo shape, so nothing of her gets cut off
function Headshot({ approach }: { approach: string }) {
  return (
    <div className="relative flex flex-col items-center">
      <FallbackImage
        src="/images/about/becca.jpg"
        alt="Becca Rhew"
        tint="#C5D8E2"
        className="aspect-[2/3] w-80 rounded-2xl"
      />
      {/* CAVEMAN: on wide screens the line leaves the flow, so the photo centres on the bio */}
      <p className="mt-6 w-80 text-center font-heading text-lg italic leading-relaxed text-steel md:absolute md:left-1/2 md:top-full md:-translate-x-1/2">
        {approach}
      </p>
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
      <div className="mx-auto grid max-w-container gap-16 px-6 md:grid-cols-2 md:items-center">
        <Biography
          t={t}
          locale={locale}
          bioValue={hasBio ? (settings!.bioText as unknown[]) : null}
          certifications={certifications}
        />
        <Headshot approach={approach} />
      </div>
    </section>
  );
}
