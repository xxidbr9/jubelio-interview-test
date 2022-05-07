module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['@babel/preset-typescript', 'next/babel'],
    plugins: [
      'babel-plugin-twin',
      'babel-plugin-macros',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx'],
          alias: {
            '@assets/images': './src/assets/images',
            '@assets/css': './src/assets/css',
            '@assets/scss': './src/assets/scss',
            '@assets/svg': './src/assets/svg',
            '@domain': './src/domain',
            '@components/atoms': './src/components/atoms',
            '@components/molecules': './src/components/molecules',
            '@components/organisms': './src/components/organisms',
            '@components/templates': './src/components/templates',
            '@rdxFeatures': './src/redux-state/features',
            '@redux-state': './src/redux-state',
            '@styles': './src/styles',
            '@configs': './src/configs',
            '@constants': './src/utils/constants',
            '@libs': './src/utils/libs',
            '@helpers': './src/utils/helpers',
            '@hooks': './src/utils/hooks',
            '@base': '.',
            '@app': './src',
          },
        },
      ],
    ],
  }
}
