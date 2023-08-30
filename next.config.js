// @ts-check
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static exports
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    quietDeps: false,
    loadPaths: ['node_modules'],
    functions: require('sass-cast/legacy').sassFunctions,
  },
  webpack: config => {
    return {
      ...config,
      stats: {
        ...(config.stats ?? {}),
        loggingDebug: [...(config.stats?.loggingDebug ?? []), 'sass-loader'],
      },
    }
  },
}

module.exports = withPWA(nextConfig)
