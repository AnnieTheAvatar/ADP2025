import Image from 'next/image'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import DegreeList from '@/components/DegreeList'

export default async function HomePage() {
  const payloadConfig = await config

  return (
    <div className="home">
      <div className="content">
        <h1>Under Construction</h1>
        <picture>
        <source srcSet="https://grad2025.s3.ap-southeast-2.amazonaws.com/usyd_logo.png" />
          <Image
            alt="University of Sydney Logo"
            height={200}
            src="https://grad2025.s3.ap-southeast-2.amazonaws.com/usyd_logo.png"
            width={200}
          />
        </picture>
        <DegreeList />
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
        <h2><a href="https://adpgradshow.com">2024 Grad Show</a></h2>
        <div className="links">
          <h2><a href="https://2020.adpgradshow.com">2020</a></h2>
          <h2><a href="https://2021.adpgradshow.com">2021</a></h2>
          <h2><a href="https://2022.adpgradshow.com">2022</a></h2>
          <h2><a href="https://2023.adpgradshow.com">2023</a></h2>
        </div>
      </div>
      <div className="footer">
        <p><a href='https://issuu.com/sydneyschool/docs/241124_catalogue_digital?fr=sYTNkYjYzODc5Njg'>View the 2024 catalogue here</a></p>
      </div>
    </div>
  )
}
