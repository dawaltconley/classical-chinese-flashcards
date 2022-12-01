/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

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
