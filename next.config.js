/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.graphassets.com"]
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
    appDir: true,
  }
}

module.exports = nextConfig
