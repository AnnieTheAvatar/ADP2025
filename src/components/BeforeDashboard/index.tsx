import React from 'react'
import Link from 'next/link'

import './index.scss'

const baseClass = 'before-dashboard'


const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <h1>Welcome to the Dashboard</h1>
      <p>Here&apos;s what to do next:</p>
      <ol>
        <li>
          Make your student profile <Link href="/admin/collections/students/create">here</Link>
        </li>
        <li>
          Make your project page <Link href="/admin/collections/projects/create">here</Link>
          <ul>
            <li>
              If you&apos;re part of a group project, please make sure there is only ONE project page for your group. Then choose each group member within the project details.
            </li>
          </ul>
        </li>
      </ol>
      <p>Once you&apos;ve submitted both the student profile and project page, feel free to edit them.</p>
      <br></br>
      <p>If you need any help with the form please email adp.web@sydney.edu.au</p>
    </div>
  )
}

export default BeforeDashboard
