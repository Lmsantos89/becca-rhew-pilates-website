import { defineField, defineType } from 'sanity';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const classSchedule = defineType({
  name: 'classSchedule',
  title: 'Class Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'dayOfWeek',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: DAYS.map(d => ({ title: d.charAt(0).toUpperCase() + d.slice(1), value: d })),
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'time', title: 'Time (HH:MM)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'className_en', title: 'Class Name (EN)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'className_de', title: 'Class Name (DE)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'isActive', title: 'Active', type: 'boolean', initialValue: true }),
  ],
});
