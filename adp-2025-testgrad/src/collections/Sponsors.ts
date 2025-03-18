import type { CollectionConfig } from 'payload'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  labels: {
    singular: 'Sponsor',
    plural: 'Sponsors'
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
        name: 'level',
        label: 'Sponsor Level',
        type: 'radio',
        options: [{
            label: "Platinum",
            value: 'platinum'
        },
        {
            label: "Gold",
            value: 'gold'
        },
        {
            label: "Silver",
            value: 'silver'
        },
        {
            label: "Bronze",
            value: 'bronze'
        }
    ]
    },
    {
        name: 'link',
        type: 'text'
    },
    {
        name: 'logo',
        label: 'Featured Image',
        type: 'upload',
        relationTo: 'media'
    }
  ]
}
