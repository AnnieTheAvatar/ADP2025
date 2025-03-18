// import type { Metadata } from 'next'

// import { PayloadRedirects } from '@/components/PayloadRedirects'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
// import React, { cache } from 'react'
// import Image from 'next/image'

// import { generateMeta } from '@/utilities/generateMeta'
// import { Media } from '@/payload-types'

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })
//   const posts = await payload.find({
//     collection: 'degrees',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = posts.docs.map(({ slug }) => {
//     return { slug }
//   })

//   return params
// }

// type Args = {
//   params: Promise<{
//     slug?: string
//   }>
// }

// export default async function Post({ params: paramsPromise }: Args) {
//   const { slug = '' } = await paramsPromise
//   const url = '/degrees/' + slug
//   const degree = await queryPostBySlug({ slug })

//   if (!degree) return <PayloadRedirects url={url} />

//   return (
//     <article className="pt-16 pb-16">
//          <div className='degree'>
//           <h1>{degree.title}</h1>
//           <Image className="headerImg" src={(degree.image as Media)?.url ?? '/default-image.jpg'} alt={degree.title || 'Default Title'} width={800} height={600} />
//           <p>{degree.description}</p>
//         </div>
//     </article>
//   )
// }

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//   const { slug = '' } = await paramsPromise
//   const degree = await queryPostBySlug({ slug })

//   return generateMeta({ doc: degree })
// }

// const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {

//   const payload = await getPayload({ config: configPromise })

//   const result = await payload.find({
//     collection: 'degrees',
//     limit: 1,
//     pagination: false,
//     where: {
//       slug: {
//         equals: slug,
//       },
//     },
//   })

//   return result.docs?.[0] || null
// })

import { PayloadRedirects } from '@/components/PayloadRedirects'
import Image from 'next/image'
import { getPayload } from 'payload'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'

// This is the main degree page component
export default async function DegreePage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  
  // Fetch the degree by slug
  const payload = await getPayload({ config: configPromise })
  
  // Fetch the degree data based on the slug
  const degreeRes = await payload.find({
    collection: 'degrees',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    pagination: false,
  })

  const degree = degreeRes.docs[0]

  // If the degree doesn't exist, return a 404 redirect
  if (!degree) {
    return <PayloadRedirects url="/404" />
  }

  // Fetch the projects associated with this degree
  const projectsRes = await payload.find({
    collection: 'projects',
    where: {
      degree: { equals: degree.id },
    },
    limit: 100,
    pagination: false,
  })

  const projects = projectsRes.docs

  return (
    <article className="degree-page">
      <h1>{degree.degreeType} of {degree.title}</h1>
      <div>
      <div>
        <h2>Unit Coordinators</h2>
        {degree.coordinators && degree.coordinators.length === 0 ? (
          <p>No coordinators assigned to this degree.</p>
        ) : (
          <ul>
            {degree.coordinators?.map((coordinators, index) => (
              <li key={index}>{coordinators}</li>
            ))}
          </ul>
        )}
      </div>
        {projects.length === 0 ? (
          <p>No projects found for this degree.</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <h3><a href={`/projects/${project.slug}`}>{project.title}</a></h3>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
