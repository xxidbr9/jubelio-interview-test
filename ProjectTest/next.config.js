const TerserPlugin = require('terser-webpack-plugin')
const { nanoid } = require('nanoid')

const isDEV = process.env.NODE_ENV !== 'production'

const buildID = nanoid()


const config = {
  generateBuildId: async () => {
    return buildID
  },
  images: {
    domains: [
      'image.elevenia.co.id'
    ],
  },
  reactStrictMode: true,

  webpack: config => {
    const newConfig = config

    newConfig.resolve.alias = {
      ...config.resolve.alias,
    }

    if (!isDEV) {
      newConfig.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ]
    }

    return newConfig
  },
}

module.exports = config
