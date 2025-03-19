import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true, // Allow public read access
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      maxLength: 50,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true, // Prevent manual edits
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'degree',
      type: 'relationship',
      relationTo: 'degrees',
    },
    {
      name: 'students',
      type: 'relationship',
      relationTo: 'students',
      hasMany: true,
    },
    {
      name: 'coverimg',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'captionCover',
      label: 'Enter a caption for your cover image',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
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
            description: 'Title used for SEO and social sharing.',
            readOnly: true,
          }
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'A short description for SEO and social media.',
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
      async ({ data, req }) => {
        if (!data.slug && data.title) {
          const baseSlug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Convert to kebab-case
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

          let uniqueSlug = baseSlug;
          let count = 1;

          // Check for existing slugs and append a number if necessary
          const existingProjects = await req.payload.find({
            collection: 'projects',
            where: { slug: { equals: uniqueSlug } },
          });

          while (existingProjects.docs.length > 0) {
            uniqueSlug = `${baseSlug}-${count}`;
            count++;

            const updatedCheck = await req.payload.find({
              collection: 'projects',
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
          data.meta.title = `${data.title} | Student Project`;
        }
        if (!data.meta.description && data.description) {
          data.meta.description = data.description.substring(0, 160);
        }
        if (!data.meta.image && data.coverimg) {
          data.meta.image = data.coverimg;
        }

        return data;
      },
    ],
  },
};
