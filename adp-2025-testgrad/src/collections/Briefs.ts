import type { CollectionConfig } from 'payload'

export const Briefs: CollectionConfig = {
  slug: 'briefs',
  labels: {
    singular: 'Brief',
    plural: 'Briefs'
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
        name: 'title',
        type: 'text'
      },
      {
        name: 'brief',
        label: 'Brief Title',
        type: 'number'
      },
    {
        name: 'description',
        type: 'textarea'
    },
    {
        name: 'coordinator',
        label: 'Unit Coordinator (press enter to add a new entry)',
        type: 'text',
        hasMany: true
    },
    {
        name: 'tutors',
        label: 'Tutors (press enter to add a new entry)',
        type: 'text',
        hasMany: true
    },
    {
        name: 'Studio',
        type: 'relationship',
        relationTo: 'studio'
    },
    {
        name: 'image',
        label: 'Featured Image',
        type: 'upload',
        relationTo: 'media'
    }
  ]
}
