import type { CollectionConfig } from 'payload'

export const Degrees: CollectionConfig = {
  slug: 'degrees',
  access: {
    read: () => true, // Allow public read access to the collection (modify based on your needs)
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  labels: {
    singular: 'Degree',
    plural: 'Degrees'
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
        name: 'slug',
        label: 'Short Title (e.g. Arch)',
        type: 'text',
        unique: true,
        required: true
      },
    {
        name: 'degreeType',
        label: 'Degree Type',
        type: 'radio',
        options: [{
            label: "Bachelor's",
            value: 'Bachelor\'s'
        },
        {
            label: "Master's",
            value: 'Master\'s'
        }
    ]
    },
    {
      name: 'faculty',
      type: 'relationship',
      relationTo: 'faculty'
    },
    {
        name: 'description',
        type: 'textarea'
    },
    {
        name: 'coordinators',
        label: 'Degree Coordinator (press enter to add a new entry)',
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
