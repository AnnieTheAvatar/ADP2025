import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', 
  experimental: {
    logging: 'verbose',
  },
  reactStrictMode: true, 
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
