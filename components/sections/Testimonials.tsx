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
        'Becca creates a warm, welcoming space. Her classes are challenging yet accessible, and I always leave feeling stronger and more grounded.',
    },
    {
      _id: 't2',
      author: 'Cristina A.',
      quote:
        'Her attention to detail and precise cues have transformed how I move. Becca truly sees each person in the room.',
    },
    {
      _id: 't3',
      author: 'Mari S.',
      quote:
        'More than a class — it is a community. Becca brings knowledge, care and genuine warmth to every session.',
    },
  ],
  de: [
    {
      _id: 't1',
      author: 'Anastasia A.',
      quote:
        'Becca schafft einen warmen, einladenden Raum. Ihre Kurse sind fordernd und zugleich zugänglich, und ich gehe immer gestärkt und geerdet nach Hause.',
    },
    {
      _id: 't2',
      author: 'Cristina A.',
      quote:
        'Ihre Liebe zum Detail und ihre präzisen Anweisungen haben verändert, wie ich mich bewege. Becca sieht wirklich jede Person im Raum.',
    },
    {
      _id: 't3',
      author: 'Mari S.',
      quote:
        'Mehr als ein Kurs — eine Gemeinschaft. Becca bringt Wissen, Fürsorge und echte Herzlichkeit in jede Stunde.',
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
