import { getTranslations } from 'next-intl/server';
import { getSchedule } from '@/sanity/lib/queries';
import type { Locale, ClassScheduleEntry } from '@/sanity/lib/types';

// CAVEMAN: demo rows until Sanity filled
const PLACEHOLDER_SCHEDULE: Record<Locale, ClassScheduleEntry[]> = {
  en: [
    { _id: 's1', dayOfWeek: 'monday', time: '12:15', className: 'Pilates Mat I-III', language: 'Deutsch', locationName: 'Pilates Bern + Online', locationCity: 'Bern', isActive: true },
    { _id: 's2', dayOfWeek: 'monday', time: '14:00', className: 'Reformer Light & Best Age', language: 'English/Deutsch', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's3', dayOfWeek: 'tuesday', time: '12:00', className: 'Reformer I-II', language: 'English', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's4', dayOfWeek: 'wednesday', time: '09:00', className: 'Pilates Mat (All levels)', language: 'English', locationName: 'Power Arena', locationCity: 'Muri bei Bern', isActive: true },
    { _id: 's5', dayOfWeek: 'wednesday', time: '12:00', className: 'Reformer I-III', language: 'English', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
  ],
  de: [
    { _id: 's1', dayOfWeek: 'monday', time: '12:15', className: 'Pilates Mat I-III', language: 'Deutsch', locationName: 'Pilates Bern + Online', locationCity: 'Bern', isActive: true },
    { _id: 's2', dayOfWeek: 'monday', time: '14:00', className: 'Reformer Light & Best Age', language: 'Englisch/Deutsch', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's3', dayOfWeek: 'tuesday', time: '12:00', className: 'Reformer I-II', language: 'Englisch', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's4', dayOfWeek: 'wednesday', time: '09:00', className: 'Pilates Mat (Alle Level)', language: 'Englisch', locationName: 'Power Arena', locationCity: 'Muri bei Bern', isActive: true },
    { _id: 's5', dayOfWeek: 'wednesday', time: '12:00', className: 'Reformer I-III', language: 'Englisch', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
  ],
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

// CAVEMAN: day+time badge left, class+location right
function ScheduleCard({ row, days }: { row: ClassScheduleEntry; days: Translator }) {
  return (
    <article className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
      <div className="flex w-24 flex-shrink-0 flex-col items-center rounded-lg bg-mint px-2 py-2">
        <span className="text-xs uppercase tracking-wide text-ink/60">{days(row.dayOfWeek)}</span>
        <span className="font-heading text-lg font-semibold text-steel">{row.time}</span>
      </div>
      <div className="pt-1">
        <h3 className="font-heading text-base font-semibold text-ink">{row.className}</h3>
        {row.language && <p className="mt-1 text-sm text-ink/70">{row.language}</p>}
        {row.locationName && (
          <p className="text-sm text-ink/60">
            {row.locationName}
            {row.locationCity ? `, ${row.locationCity}` : ''}
          </p>
        )}
      </div>
    </article>
  );
}

// CAVEMAN: card grid split out so Schedule stays under 40 lines
function ScheduleCards({ rows, days }: { rows: ClassScheduleEntry[]; days: Translator }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => (
        <ScheduleCard key={row._id} row={row} days={days} />
      ))}
    </div>
  );
}

export default async function Schedule({ locale }: { locale: Locale }) {
  const [t, days, schedule] = await Promise.all([
    getTranslations('schedule'),
    getTranslations('days'),
    getSchedule(locale),
  ]);
  const rows = schedule.length > 0 ? schedule : PLACEHOLDER_SCHEDULE[locale];

  return (
    <section id="schedule" className="bg-sand py-24">
      <div className="mx-auto max-w-container px-6">
        <h2 className="font-heading text-3xl font-semibold text-ink">{t('title')}</h2>
        {rows.length === 0 ? (
          <p className="mt-8 text-ink/70">{t('noClasses')}</p>
        ) : (
          <ScheduleCards rows={rows} days={days} />
        )}
        <blockquote className="mt-12 text-center font-heading text-xl italic text-ink">
          “{t('quote')}”
          <footer className="mt-2 text-sm not-italic text-ink/70">— {t('quoteAuthor')}</footer>
        </blockquote>
      </div>
    </section>
  );
}
