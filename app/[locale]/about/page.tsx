import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PortableText } from '@portabletext/react';
import { getSiteSettings } from '@/sanity/lib/queries';
import type { Locale } from '@/sanity/lib/types';

// CAVEMAN: demo data until Sanity connected. Bilingual so language toggle visibly works.
const PLACEHOLDER_BIO: Record<Locale, string[]> = {
  en: [
    'Becca Rhew is a certified Pilates teacher based in Bern, Switzerland. With over a decade of practice and training, she brings warmth, precision, and a deep understanding of movement to every session.',
    'Originally from the United States, Becca moved to Bern in 2015 and has since built a thriving practice rooted in the classical Pilates method. She works with beginners and experienced practitioners alike.',
    'Her approach focuses on building strength from the inside out — creating a body that moves with ease, balance, and confidence.',
  ],
  de: [
    'Becca Rhew ist zertifizierte Pilates-Lehrerin in Bern, Schweiz. Mit über einem Jahrzehnt Praxis und Ausbildung bringt sie Wärme, Präzision und ein tiefes Verständnis für Bewegung in jede Stunde.',
    'Ursprünglich aus den USA, zog Becca 2015 nach Bern und hat seither eine blühende Praxis aufgebaut, die in der klassischen Pilates-Methode verwurzelt ist. Sie arbeitet mit Anfängern wie auch Fortgeschrittenen.',
    'Ihr Ansatz konzentriert sich darauf, Kraft von innen heraus aufzubauen — für einen Körper, der sich mit Leichtigkeit, Balance und Selbstvertrauen bewegt.',
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('aboutTitle'), description: t('aboutDescription') };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, settings] = await Promise.all([
    getTranslations('about'),
    getSiteSettings(locale as Locale),
  ]);
  const hasBio = Array.isArray(settings?.bioText) && settings.bioText.length > 0;

  return (
    <section className="mx-auto max-w-container px-6 py-20">
      <h1 className="font-heading text-4xl font-semibold">{t('title')}</h1>
      <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-start">
        <div className="aspect-[3/4] w-full rounded-lg bg-[#D9D3CC]" aria-hidden="true" />
        <div>
          {hasBio ? (
            <PortableText value={settings!.bioText as Parameters<typeof PortableText>[0]['value']} />
          ) : (
            PLACEHOLDER_BIO[locale as Locale].map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-text-primary">
                {para}
              </p>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
