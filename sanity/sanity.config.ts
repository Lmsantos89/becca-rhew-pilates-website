import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { projectId, dataset } from './env';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title('Content').items([
          S.listItem()
            .title('Site Settings')
            .id('siteSettings')
            .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          S.divider(),
          S.documentTypeListItem('offering').title('Offerings'),
          S.documentTypeListItem('classSchedule').title('Schedule'),
        ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
