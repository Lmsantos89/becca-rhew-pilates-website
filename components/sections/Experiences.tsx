import { getTranslations } from 'next-intl/server';
import { getOfferings } from '@/sanity/lib/queries';
import FallbackImage from './FallbackImage';
import type { Locale, Offering } from '@/sanity/lib/types';

// CAVEMAN: demo copy until Sanity filled. DE machine-drafted, confirm with client
const PLACEHOLDER_EXPERIENCES: Record<Locale, Offering[]> = {
  en: [
    {
      _id: 'mat',
      title: 'Mat',
      description:
        'Low-impact, full-body mat classes using props like Therabands, Pilates balls and rings to build strength, mobility and control.',
    },
    {
      _id: 'reformer',
      title: 'Reformer',
      description: 'Reformer classes at the Pilates Bern studio in the old town of Bern.',
      linkUrl: '#',
    },
    {
      _id: 'private',
      title: 'Private Training',
      description: 'One-on-one sessions tailored to your goals. Contact me for information.',
    },
  ],
  de: [
    {
      _id: 'mat',
      title: 'Matte',
      description:
        'Sanfte Ganzkörper-Mattenkurse mit Hilfsmitteln wie Therabändern, Pilates-Bällen und -Ringen, um Kraft, Beweglichkeit und Kontrolle aufzubauen.',
    },
    {
      _id: 'reformer',
      title: 'Reformer',
      description: 'Reformer-Kurse im Pilates Bern Studio in der Berner Altstadt.',
      linkUrl: '#',
    },
    {
      _id: 'private',
      title: 'Privattraining',
      description:
        'Einzelstunden, ganz auf deine Ziele abgestimmt. Kontaktiere mich für weitere Informationen.',
    },
  ],
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

// CAVEMAN: single photo, tint shows until file lands in public/images/experiences
function ExperiencePhotos() {
  return (
    <FallbackImage
      src="/images/experiences/photo-1.jpg"
      alt="Reformer class at the studio"
      tint="#DCEBE6"
      className="aspect-[3/4] w-full rounded-lg"
    />
  );
}

function ExperienceList({ t, items }: { t: Translator; items: Offering[] }) {
  return (
    <div>
      <h2 className="font-heading text-3xl font-semibold text-ink">{t('title')}</h2>
      <div className="mt-8 flex flex-col gap-8">
        {items.map((item) => (
          <div key={item._id}>
            <h3 className="font-heading text-xl font-semibold text-steel">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-ink/80">{item.description}</p>
            {item.linkUrl && (
              <a
                href={item.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-teal underline underline-offset-4 hover:text-steel"
              >
                {t('reformerLinkLabel')} →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Experiences({ locale }: { locale: Locale }) {
  const [t, offerings] = await Promise.all([
    getTranslations('experiences'),
    getOfferings(locale),
  ]);
  const items = offerings.length > 0 ? offerings : PLACEHOLDER_EXPERIENCES[locale];

  return (
    <section id="experiences" className="mx-auto max-w-container px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        <ExperiencePhotos />
        <ExperienceList t={t} items={items} />
      </div>
    </section>
  );
}
