import { defineField, defineType } from 'sanity';

export const offering = defineType({
  name: 'offering',
  title: 'Offering',
  type: 'document',
  fields: [
    defineField({ name: 'title_en', title: 'Title (EN)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'title_de', title: 'Title (DE)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', validation: r => r.required() }),
    defineField({ name: 'description_de', title: 'Description (DE)', type: 'text', validation: r => r.required() }),
    defineField({ name: 'linkUrl', title: 'Link URL', type: 'url' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt_en', title: 'Alt text (EN)', type: 'string' }),
        defineField({ name: 'alt_de', title: 'Alt text (DE)', type: 'string' }),
      ],
    }),
  ],
});
