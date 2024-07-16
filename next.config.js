/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
    // Deprecate domain after asset migration
    domains: ['media.graphassets.com']
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
}

module.exports = nextConfig
