import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getOfferings } from '@/sanity/lib/queries';
import OfferingCard from '@/components/OfferingCard';
import type { Locale, Offering } from '@/sanity/lib/types';

const PLACEHOLDER_OFFERINGS: Offering[] = [
  {
    _id: 'placeholder-1',
    title: 'Mat Pilates',
    description:
      'Build core strength and flexibility on the mat. Accessible and effective for all levels.',
  },
  {
    _id: 'placeholder-2',
    title: 'Reformer Pilates',
    description:
      'Precision training on the reformer machine. Challenge your body in new and targeted ways.',
  },
  {
    _id: 'placeholder-3',
    title: 'Private Sessions',
    description:
      'One-on-one sessions tailored entirely to your goals, needs, and schedule.',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('offeringsTitle'), description: t('offeringsDescription') };
}

export default async function OfferingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, offerings] = await Promise.all([
    getTranslations('offerings'),
    getOfferings(locale as Locale),
  ]);
  const items = offerings.length > 0 ? offerings : PLACEHOLDER_OFFERINGS;

  return (
    <section className="mx-auto max-w-container px-6 py-20">
      <h1 className="font-heading text-4xl font-semibold">{t('title')}</h1>
      <p className="mt-2 text-muted">{t('subtitle')}</p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((offering) => (
          <OfferingCard key={offering._id} offering={offering} />
        ))}
      </div>
    </section>
  );
}
