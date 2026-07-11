import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'author', title: 'Author', type: 'string', validation: r => r.required() }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', validation: r => r.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
});
