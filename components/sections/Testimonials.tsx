import { getTranslations } from 'next-intl/server';
import { getTestimonials } from '@/sanity/lib/queries';
import TestimonialsScroller from './TestimonialsScroller';
import type { Locale, Testimonial } from '@/sanity/lib/types';

// CAVEMAN: demo quotes until Sanity filled. DE machine-drafted, confirm with client
const PLACEHOLDER_TESTIMONIALS: Record<Locale, Testimonial[]> = {
  en: [
    {
      _id: 't1',
      author: 'Anastasia A.',
      quote:
        "Becca's classes are the highlight of my week! I've noticed so much progress in my strength and flexibility thanks to her expert guidance. Her careful attention to details ensures I'm always performing exercises safely and correctly. Her anatomical knowledge helps me to get the most out of every movement. Becca has such a warm and patient way of teaching that makes everyone feel comfortable, no matter their fitness level. I always leave Becca's class feeling stronger and happier!",
    },
    {
      _id: 't2',
      author: 'Cristina A.',
      quote:
        'Becca is an exceptional teacher. She is always attentive to the needs of each student and adapts the exercises so that everyone can progress at their own pace. Her Pilates classes are dynamic, motivating, and full of positive energy. You can truly see the passion she puts into her work and the care with which she supports each of her students.',
    },
    {
      _id: 't3',
      author: 'Mari S.',
      quote:
        "I love Becca's classes! She puts a great deal of thought into making the exercises just the right amount of challenge for a wide range of people. As an older client with knee and back issues, I appreciate that Becca gives me modifications so that I can participate safely. She also gives us helpful hands-on adjustments to help us practice safely. No class is the same, so I always feel like I am learning something new. Best of all, Becca has created a caring community among her students. I highly recommend Becca!",
    },
    {
      _id: 't4',
      author: 'Jasmin M.',
      quote:
        "Becca's class is always great! The group is wonderful and the atmosphere is pleasant and motivating. Becca keeps the class varied and makes sure there is really something for everyone — regardless of skill level. It's just fun to participate and I always go home feeling great.",
    },
    {
      _id: 't5',
      author: 'Marianne B.',
      quote:
        "Ever since I started doing Pilates with Becca, I haven't had any more shoulder or back pain. I feel completely at ease. The exercises she chooses and the way she makes sure they're done properly are simply brilliant. I'm looking forward to many more lovely training evenings with Becca.",
    },
  ],
  de: [
    {
      _id: 't1',
      author: 'Anastasia A.',
      quote:
        'Beccas Kurse sind das Highlight meiner Woche! Dank ihrer fachkundigen Anleitung habe ich grosse Fortschritte bei Kraft und Beweglichkeit gemacht. Ihre sorgfältige Liebe zum Detail sorgt dafür, dass ich die Übungen stets sicher und korrekt ausführe. Ihr anatomisches Wissen hilft mir, das Beste aus jeder Bewegung herauszuholen. Becca unterrichtet auf so warmherzige und geduldige Weise, dass sich alle wohlfühlen — unabhängig vom Fitnesslevel. Ich verlasse Beccas Kurs immer stärker und glücklicher!',
    },
    {
      _id: 't2',
      author: 'Cristina A.',
      quote:
        'Becca ist eine aussergewöhnliche Lehrerin. Sie geht stets auf die Bedürfnisse jeder einzelnen Person ein und passt die Übungen so an, dass alle in ihrem eigenen Tempo Fortschritte machen können. Ihre Pilates-Stunden sind dynamisch, motivierend und voller positiver Energie. Man sieht wirklich, mit wie viel Leidenschaft sie ihre Arbeit macht und mit welcher Sorgfalt sie jede und jeden unterstützt.',
    },
    {
      _id: 't3',
      author: 'Mari S.',
      quote:
        'Ich liebe Beccas Kurse! Sie überlegt sich sehr genau, wie sie die Übungen für ganz unterschiedliche Menschen genau richtig fordernd gestaltet. Als ältere Teilnehmerin mit Knie- und Rückenproblemen schätze ich es, dass Becca mir Anpassungen gibt, damit ich sicher mitmachen kann. Ausserdem gibt sie uns hilfreiche manuelle Korrekturen, damit wir sicher üben. Keine Stunde gleicht der anderen, sodass ich immer das Gefühl habe, etwas Neues zu lernen. Das Beste von allem: Becca hat unter ihren Teilnehmenden eine fürsorgliche Gemeinschaft geschaffen. Ich kann Becca wärmstens empfehlen!',
    },
    {
      _id: 't4',
      author: 'Jasmin M.',
      quote:
        'Beccas Kurs ist immer super! Die Gruppe ist toll und die Stimmung angenehm und motivierend. Becca gestaltet den Kurs abwechslungsreich und sorgt dafür, dass wirklich für alle etwas dabei ist — unabhängig vom Können. Es macht einfach Spass mitzumachen, und ich gehe immer mit einem guten Gefühl nach Hause.',
    },
    {
      _id: 't5',
      author: 'Marianne B.',
      quote:
        'Seit ich mit Becca Pilates mache, habe ich keine Schulter- oder Rückenschmerzen mehr. Ich fühle mich rundum wohl. Die Übungen, die sie auswählt, und die Art, wie sie auf die korrekte Ausführung achtet, sind einfach genial. Ich freue mich auf viele weitere schöne Trainingsabende mit Becca.',
    },
  ],
};

export default async function Testimonials({ locale }: { locale: Locale }) {
  const [t, testimonials] = await Promise.all([
    getTranslations('testimonials'),
    getTestimonials(),
  ]);
  const items = testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS[locale];

  return (
    <section id="testimonials" className="bg-steel py-24">
      <div className="mx-auto max-w-container px-6">
        <h2 className="font-heading text-3xl font-semibold text-white">{t('title')}</h2>
        <div className="mt-10">
          <TestimonialsScroller
            testimonials={items}
            previousLabel={t('previous')}
            nextLabel={t('next')}
          />
        </div>
      </div>
    </section>
  );
}
