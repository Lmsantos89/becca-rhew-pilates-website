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
        "Mat Pilates offers a low-impact, full-body workout for all body types and abilities. We use props like Therabands, Pilates balls and Pilates Rings to enhance our movement. These classes are for all levels and movements can be modified to meet your body where it's at on any given day.",
    },
    {
      _id: 'reformer',
      title: 'Reformer',
      description:
        'In the heart of old town Bern, Pilates Bern studio offers reformer classes for all levels. Reformer classes use the resistance and support of the reformer machine to guide you through a full-body workout that builds strength, improves flexibility, and enhances body awareness. Each class is designed to challenge and support you in equal measure — leaving you feeling stronger, more mobile, and deeply connected to your body.',
      linkUrl: '#',
    },
    {
      _id: 'private',
      title: 'Private Training',
      description:
        'One-on-one sessions tailored to your specific goals and needs. Please get in touch for more information.',
    },
  ],
  de: [
    {
      _id: 'mat',
      title: 'Matte',
      description:
        'Matten-Pilates bietet ein gelenkschonendes Ganzkörpertraining für alle Körpertypen und Fähigkeiten. Wir nutzen Hilfsmittel wie Therabänder, Pilates-Bälle und Pilates-Ringe, um unsere Bewegungen zu unterstützen. Diese Kurse eignen sich für alle Niveaus, und die Übungen lassen sich anpassen, um deinen Körper dort abzuholen, wo er an jedem Tag gerade steht.',
    },
    {
      _id: 'reformer',
      title: 'Reformer',
      description:
        'Im Herzen der Berner Altstadt bietet das Studio Pilates Bern Reformer-Kurse für alle Niveaus. Reformer-Kurse nutzen den Widerstand und die Unterstützung des Reformer-Geräts, um dich durch ein Ganzkörpertraining zu führen, das Kraft aufbaut, die Beweglichkeit verbessert und das Körperbewusstsein schärft. Jede Stunde fordert und unterstützt dich zu gleichen Teilen — und lässt dich stärker, beweglicher und tiefer mit deinem Körper verbunden zurück.',
      linkUrl: '#',
    },
    {
      _id: 'private',
      title: 'Privattraining',
      description:
        'Einzelstunden, ganz auf deine Ziele und Bedürfnisse abgestimmt. Bitte kontaktiere mich für weitere Informationen.',
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
                className="mt-2 inline-block text-sm font-medium text-steel underline underline-offset-4 hover:text-ink"
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
