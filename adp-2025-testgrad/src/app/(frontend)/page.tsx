import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import ProjectsList from '@/components/ProjectList'

import config from '@/payload.config'
import './styles.css'
import DegreeList from '@/components/DegreeList'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
        <source srcSet="/api/media/file/usyd_logo.png" />
          <Image
            alt="University of Sydney Logo"
            height={200}
            src="/api/media/file/usyd_logo.png"
            width={200}
          />
        </picture>
        <h1>Welcome to the ADP Grad Show</h1>
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Payload Documentation
          </a>
        </div>
        <h1><a href="https://adpgradshow.com">2024 Grad Show</a></h1>
        <div className="links">
          <h2><a href="https://2020.adpgradshow.com">2020</a></h2>
          <h2><a href="https://2021.adpgradshow.com">2021</a></h2>
          <h2><a href="https://2022.adpgradshow.com">2022</a></h2>
          <h2><a href="https://2023.adpgradshow.com">2023</a></h2>
        </div>
        <DegreeList />
        <ProjectsList />
      </div>
      <div className="footer">
        <p><a href='https://issuu.com/sydneyschool/docs/241124_catalogue_digital?fr=sYTNkYjYzODc5Njg'>View the 2024 catalogue here</a></p>
      </div>
    </div>
  )
}
