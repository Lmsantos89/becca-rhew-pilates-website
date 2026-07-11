import { getTranslations } from 'next-intl/server';
import { getSchedule } from '@/sanity/lib/queries';
import type { Locale, ClassScheduleEntry } from '@/sanity/lib/types';

// CAVEMAN: demo rows until Sanity filled
const PLACEHOLDER_SCHEDULE: Record<Locale, ClassScheduleEntry[]> = {
  en: [
    { _id: 's1', dayOfWeek: 'monday', time: '09:00', className: 'Mat Pilates', language: 'Deutsch', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's2', dayOfWeek: 'monday', time: '18:30', className: 'Reformer Pilates', language: 'Deutsch/Eng', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's3', dayOfWeek: 'tuesday', time: '09:00', className: 'Mat Pilates', language: 'English', locationName: 'Power Arena', locationCity: 'Muri bei Bern', isActive: true },
    { _id: 's4', dayOfWeek: 'tuesday', time: '19:00', className: 'Reformer Pilates', language: 'Deutsch', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's5', dayOfWeek: 'wednesday', time: '10:00', className: 'Mat Pilates', language: 'Deutsch/Eng', locationName: 'Power Arena', locationCity: 'Muri bei Bern', isActive: true },
  ],
  de: [
    { _id: 's1', dayOfWeek: 'monday', time: '09:00', className: 'Matten-Pilates', language: 'Deutsch', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's2', dayOfWeek: 'monday', time: '18:30', className: 'Reformer-Pilates', language: 'Deutsch/Eng', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's3', dayOfWeek: 'tuesday', time: '09:00', className: 'Matten-Pilates', language: 'English', locationName: 'Power Arena', locationCity: 'Muri bei Bern', isActive: true },
    { _id: 's4', dayOfWeek: 'tuesday', time: '19:00', className: 'Reformer-Pilates', language: 'Deutsch', locationName: 'Pilates Bern', locationCity: 'Bern', isActive: true },
    { _id: 's5', dayOfWeek: 'wednesday', time: '10:00', className: 'Matten-Pilates', language: 'Deutsch/Eng', locationName: 'Power Arena', locationCity: 'Muri bei Bern', isActive: true },
  ],
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

// CAVEMAN: table split out so Schedule stays under 40 lines
function ScheduleTable({ rows, t, days }: { rows: ClassScheduleEntry[]; t: Translator; days: Translator }) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink/20 text-ink">
            <th className="py-3 pr-4 font-semibold">{t('colDay')}</th>
            <th className="py-3 pr-4 font-semibold">{t('colTime')}</th>
            <th className="py-3 pr-4 font-semibold">{t('colLanguage')}</th>
            <th className="py-3 font-semibold">{t('colClass')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-b border-ink/10 text-ink/80">
              <td className="py-3 pr-4">{days(row.dayOfWeek)}</td>
              <td className="py-3 pr-4">{row.time}</td>
              <td className="py-3 pr-4">{row.language}</td>
              <td className="py-3">
                {row.className}
                {row.locationName && (
                  <span className="block text-ink/60">
                    {row.locationName}
                    {row.locationCity ? `, ${row.locationCity}` : ''}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    <section id="schedule" className="bg-mint py-24">
      <div className="mx-auto max-w-container px-6">
        <h2 className="font-heading text-3xl font-semibold text-ink">{t('title')}</h2>
        {rows.length === 0 ? (
          <p className="mt-8 text-ink/70">{t('noClasses')}</p>
        ) : (
          <ScheduleTable rows={rows} t={t} days={days} />
        )}
        <blockquote className="mt-12 text-center font-heading text-xl italic text-ink">
          “{t('quote')}”
          <footer className="mt-2 text-sm not-italic text-ink/70">— {t('quoteAuthor')}</footer>
        </blockquote>
      </div>
    </section>
  );
}
