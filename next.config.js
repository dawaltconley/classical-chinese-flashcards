/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig
