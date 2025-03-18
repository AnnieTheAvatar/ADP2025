import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true, // Allow public read access to the collection (modify based on your needs)
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  labels: {
    singular: 'Project',
    plural: 'Projects'
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
        name: 'title',
        type: 'text',
        maxLength: 50,
        required: true
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
        },
    {
        name: 'description',
        type: 'textarea',
        required: true
    },
    {
        name: 'degree',
        type: 'relationship',
        relationTo: 'degrees'
    },
    {
        name: 'students',
        type: 'relationship',
        relationTo: 'students',
        hasMany: true
    },
    {
        name: 'coverimg',
        label: 'Cover Image',
        type: 'upload',
        relationTo: 'media',
        required: true
    },
    {
        name: 'captionCover',
        label: 'Enter a caption for your cover image',
        type: 'text',
        required: true
    },
    {
        name: 'images',
        type: 'array',
        maxRows: 5,
        fields: [
            {
                name: 'image',
                type: 'upload',
                relationTo: 'media'
            },
            {
                name: 'caption',
                type: 'text'
            }
        ]
    }
  ]
}
