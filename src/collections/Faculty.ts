import { CollectionConfig } from 'payload';

export const Faculty: CollectionConfig = {
  slug: 'faculty',
  labels: {
    singular: 'Faculty',
    plural: 'Faculty'
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

            {
                name: 'shortTitle',
                label: 'Short Title (e.g. Arch)',
                type: 'text'
              },
            {
                name: 'description',
                type: 'textarea'
            },
            {
                name: 'coordinators',
                label: 'Degree Coordinator and Tutors (press enter to add a new entry)',
                type: 'text',
                hasMany: true
            },
            {
                name: 'image',
                label: 'Featured Image',
                type: 'upload',
                relationTo: 'media'
            }
          ]
        }