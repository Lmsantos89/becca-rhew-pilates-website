import type { ClassScheduleEntry } from '@/sanity/lib/types';

interface Props {
  entry: ClassScheduleEntry;
  locationLabel: string;
}

export default function ClassCard({ entry, locationLabel }: Props) {
  const dayAbbr = entry.dayOfWeek.slice(0, 3).toUpperCase();

  return (
    <article className="flex items-start gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex w-20 flex-shrink-0 flex-col items-center rounded bg-beige py-2">
        <span className="text-xs uppercase tracking-widest text-muted">{dayAbbr}</span>
        <span className="font-heading text-lg font-semibold text-accent">{entry.time}</span>
      </div>
      <div className="pt-1">
        <h3 className="font-heading text-base font-semibold">{entry.className}</h3>
        {entry.location && (
          <p className="mt-1 text-sm text-muted">
            {locationLabel}: {entry.location}
          </p>
        )}
      </div>
    </article>
  );
}
