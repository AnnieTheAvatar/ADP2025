import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', 
  reactStrictMode: true, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grad2025.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.resolve.fallback = {
      fs: false, 
      path: false,
      os: false,
      buffer: false,
    };
    return config;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
