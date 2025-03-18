import type { CollectionConfig } from 'payload'

export const Studios: CollectionConfig = {
  slug: 'studio',
  labels: {
    singular: 'Studio',
    plural: 'Studios'
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
        name: 'studioN',
        label: 'Studio Number',
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
        name: 'degree',
        type: 'relationship',
        relationTo: 'degrees'
    },
    {
        name: 'image',
        label: 'Featured Image',
        type: 'upload',
        relationTo: 'media'
    }
  ]
}
