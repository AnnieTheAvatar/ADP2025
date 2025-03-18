import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import Image from 'next/image'

import { generateMeta } from '@/utilities/generateMeta'
import { Media } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'degrees',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/degrees/' + slug
  const degree = await queryPostBySlug({ slug })

  if (!degree) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
         <div className='degree'>
          <h1>{degree.title}</h1>
          <Image className="headerImg" src={(degree.image as Media)?.url ?? '/default-image.jpg'} alt={degree.title || 'Default Title'} width={800} height={600} />
          <p>{degree.description}</p>
        </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const degree = await queryPostBySlug({ slug })

  return generateMeta({ doc: degree })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'degrees',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
