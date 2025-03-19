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
    plural: 'Degrees',
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
      name: 'slug',
      label: 'Short Title (e.g. Arch)',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'degreeType',
      label: 'Degree Type',
      type: 'radio',
      required: true,
      options: [
        { label: "Bachelor's", value: "Bachelor's" },
        { label: "Master's", value: "Master's" },
      ],
    },
    {
      name: 'faculty',
      type: 'relationship',
      relationTo: 'faculty',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'coordinators',
      label: 'Degree Coordinator (press enter to add a new entry)',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'image',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'meta',
      label: 'SEO Metadata',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'A title for SEO and social media.',
            //disabled: true,
            readOnly: true
          }
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'A short description for SEO and social media.',
            //disabled: true,
            readOnly: true
          }
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image',
          admin: {
            description: 'An image used for Open Graph previews.',
            disabled: true
          }
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data.meta) {
          data.meta = {}
        }

        // Auto-fill meta title
        if (!data.meta.title && data.title) {
          data.meta.title = `${data.title} | ${data.degreeType} Degree`
        }

        // Auto-fill meta description
        if (!data.meta.description && data.description) {
          data.meta.description = data.description.substring(0, 160) // Truncate for SEO
        }

        // Auto-fill meta image (fallback to main image)
        if (!data.meta.image && data.image) {
          data.meta.image = data.image
        }

        return data
      },
    ],
  },
}
