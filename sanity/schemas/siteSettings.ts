import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // @ts-ignore -- experimental Sanity singleton guard, not yet typed
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'tagline_en', title: 'Tagline (EN)', type: 'string' }),
    defineField({ name: 'tagline_de', title: 'Tagline (DE)', type: 'string' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt_en', type: 'string', title: 'Alt text (EN)' }),
        defineField({ name: 'alt_de', type: 'string', title: 'Alt text (DE)' }),
      ],
    }),
    defineField({
      name: 'bioImage',
      title: 'Biography Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt_en', type: 'string', title: 'Alt text (EN)' }),
        defineField({ name: 'alt_de', type: 'string', title: 'Alt text (DE)' }),
      ],
    }),
    defineField({ name: 'bioText_en', title: 'Biography (EN)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'bioText_de', title: 'Biography (DE)', type: 'array', of: [{ type: 'block' }] }),
  ],
});
