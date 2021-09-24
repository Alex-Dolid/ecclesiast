// Utils
const { mergeSassVariables } = require('@vuetify/cli-plugin-utils');

module.exports = {
  transpileDependencies: ['vuetify'],
  productionSourceMap: false,

  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
  },

  chainWebpack: (config) => {
    const modules = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    modules.forEach((match) => {
      config.module
        .rule('sass')
        .oneOf(match)
        .use('sass-loader')
        .tap((opt) => mergeSassVariables(opt, "'@/styles/variables.scss'"));
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap((opt) => mergeSassVariables(opt, "'@/styles/variables.scss';"));
    });
  },
};
