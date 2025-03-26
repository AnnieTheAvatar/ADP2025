import Image from 'next/image'
import { getPayload } from 'payload'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

// This is the main degree page component
export default async function DegreePage({ params }: { params: Promise<{ slug: string }> }) {
  // Resolve the params promise
  const { slug } = await params
  
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
    notFound() // This will trigger the Next.js 404 page
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
      <h1>{degree.title}</h1>
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
