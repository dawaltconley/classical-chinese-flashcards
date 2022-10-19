/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    loadPaths: ['node_modules'],
  },
}

module.exports = nextConfig
