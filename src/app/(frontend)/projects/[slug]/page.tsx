import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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

  if (!project) {
    notFound() // This will trigger the Next.js 404 page
  }

  return (
    <article className="pt-16 pb-16">
         <div className='project'>
          <h1>{project.title}</h1>
          <Image className="headerImg" src={'https://grad2025.s3.ap-southeast-2.amazonaws.com/grad2025/' + (project.coverimg as Media)?.sizes?.og?.filename || 'https://grad2025.s3.ap-southeast-2.amazonaws.com/default-image.jpg'} alt={project.title} width={800} height={600} />
          <p>{project.description}</p>
          {/* Render the images and captions */}
        {project.images && project.images.length > 0 && (
          <div className="project-images">
            {project.images.map((item, index) => {
              // Destructure item to get image and caption
              const { image, caption } = item;

              return (
                <div key={index} className="image-item">
                  {image && (
                    <Image
                      className="project-image"
                      src={'https://grad2025.s3.ap-southeast-2.amazonaws.com/grad2025/' + (image as Media)?.sizes?.og?.filename || 'https://grad2025.s3.ap-southeast-2.amazonaws.com/default-image.jpg'}
                      alt={caption || 'Project Image'}
                      width={800}
                      height={600}
                    />
                  )}
                  {caption && <p>{caption}</p>}
                </div>
              );
            })}
          </div>
          )}

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
