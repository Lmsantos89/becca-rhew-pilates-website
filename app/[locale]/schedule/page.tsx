import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getSchedule } from '@/sanity/lib/queries';
import ClassCard from '@/components/ClassCard';
import type { Locale, ClassScheduleEntry } from '@/sanity/lib/types';

const PLACEHOLDER_SCHEDULE: ClassScheduleEntry[] = [
  { _id: 'p1', dayOfWeek: 'monday', time: '09:00', className: 'Mat Pilates — All Levels', location: 'Studio Bern', isActive: true },
  { _id: 'p2', dayOfWeek: 'wednesday', time: '18:00', className: 'Reformer Pilates', location: 'Studio Bern', isActive: true },
  { _id: 'p3', dayOfWeek: 'friday', time: '10:00', className: 'Mat Pilates — Beginner', location: 'Studio Bern', isActive: true },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('scheduleTitle'), description: t('scheduleDescription') };
}

export default async function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, schedule] = await Promise.all([
    getTranslations('schedule'),
    getSchedule(locale as Locale),
  ]);
  const items = schedule.length > 0 ? schedule : PLACEHOLDER_SCHEDULE;

  return (
    <section className="mx-auto max-w-container px-6 py-20">
      <h1 className="font-heading text-4xl font-semibold">{t('title')}</h1>
      <p className="mt-2 text-muted">{t('subtitle')}</p>
      <div className="mt-12 flex flex-col gap-4">
        {items.length === 0 ? (
          <p className="text-muted">{t('noClasses')}</p>
        ) : (
          items.map((entry) => (
            <ClassCard key={entry._id} entry={entry} locationLabel={t('location')} />
          ))
        )}
      </div>
    </section>
  );
}
