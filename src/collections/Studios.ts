import type { CollectionConfig } from 'payload';

export const Studios: CollectionConfig = {
  slug: 'studio',
  labels: {
    singular: 'Studio',
    plural: 'Studios',
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
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'studioN',
      label: 'Studio Number',
      type: 'number',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'coordinator',
      label: 'Unit Coordinator (press enter to add a new entry)',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'tutors',
      label: 'Tutors (press enter to add a new entry)',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'degree',
      type: 'relationship',
      relationTo: 'degrees',
    },
    {
      name: 'image',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
    },
    // ✅ Meta fields for SEO
    {
      name: 'meta',
      label: 'SEO Metadata',
      type: 'group',
      admin: {
        description: 'Settings for search engine & social media - This is auto-populated from the fields above.',
      },
      fields: [
        {
          name: 'title',
          label: 'Meta Title',
          type: 'text',
          admin: {
            description: 'Title used for SEO and social sharing.',
            readOnly: true,
          },
        },
        {
          name: 'description',
          label: 'Meta Description',
          type: 'textarea',
          admin: {
            description: 'A short description for SEO and social media.',
            readOnly: true,
          },
        },
        {
          name: 'image',
          label: 'Meta Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'An image used for Open Graph previews.',
            disabled: true,
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (!data) return data;

        // Generate slug if it doesn't exist
        if (!data.slug && data.title) {
          const baseSlug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Convert to kebab-case
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

          let uniqueSlug = baseSlug;
          let count = 1;

          // Check for existing slugs and append a number if necessary
          const existingStudios = await req.payload.find({
            collection: 'studio',
            where: { slug: { equals: uniqueSlug } },
          });

          while (existingStudios.docs.length > 0) {
            uniqueSlug = `${baseSlug}-${count}`;
            count++;

            const updatedCheck = await req.payload.find({
              collection: 'studio',
              where: { slug: { equals: uniqueSlug } },
            });

            if (updatedCheck.docs.length === 0) {
              break;
            }
          }

          data.slug = uniqueSlug;
        }

        // Auto-fill meta fields
        if (!data.meta) {
          data.meta = {};
        }
        if (!data.meta.title && data.title) {
          data.meta.title = `${data.title} | Studio`;
        }
        if (!data.meta.description && data.description) {
          data.meta.description = data.description.substring(0, 150) + '...';
        }
        if (!data.meta.image && data.image) {
          data.meta.image = data.image;
        }

        return data;
      },
    ],
  },
};
