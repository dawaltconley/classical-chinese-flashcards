/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    loadPaths: ['node_modules'],
    functions: require('sass-cast/legacy').sassFunctions,
  },
}

module.exports = nextConfig
