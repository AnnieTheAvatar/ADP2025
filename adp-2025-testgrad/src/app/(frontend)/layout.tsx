import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Archtecture, Design, and Planning Grad Show 2025',
  title: 'ADP Grad Show 2025',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
