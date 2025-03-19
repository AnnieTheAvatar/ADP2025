import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Ensure Amplify serves the correct build
  experimental: {
    appDir: true, // Explicitly enable App Router
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
