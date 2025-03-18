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
    collection: 'projects',
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
  const url = '/projects/' + slug
  const project = await queryPostBySlug({ slug })

  if (!project) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
         <div className='project'>
          <h1>{project.title}</h1>
          <Image className="headerImg" src={(project.coverimg as Media)?.sizes?.og?.url || '/default-image.jpg'} alt={project.title} width={800} height={600} />
          <p>{project.description}</p>
        </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const project = await queryPostBySlug({ slug })

  return generateMeta({ doc: project })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
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
