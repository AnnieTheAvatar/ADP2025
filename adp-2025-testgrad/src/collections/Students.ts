import type { CollectionConfig } from 'payload'

export const Students: CollectionConfig = {
  slug: 'students',
  labels: {
    singular: 'Student',
    plural: 'Students'
  },
  admin: {
    useAsTitle: 'unikey',
  },
  fields: [
    {
        name: 'unikey',
        type: 'text',
        maxLength: 8,
        required: true,
        unique: true
      },
    {
        name: 'firstName',
        type: 'text',
        maxLength: 50,
        required: true
      },
      {
        name: 'lastName',
        type: 'text',
        maxLength: 50,
        required: true
      },
    {
        name: 'shortBio',
        type: 'textarea',
        required: true
    },
    {
        name: 'degree',
        type: 'relationship',
        relationTo: 'degrees'
    },
    {
        name: 'linkedIn',
        label: 'LinkedIn',
        type: 'text'
    },
    {
        name: 'instagram',
        type: 'text'
    },
    {
        name: 'external',
        type: 'text'
    }
  ]
}
