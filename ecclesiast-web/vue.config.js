module.exports = {
  /*transpileDependencies: [
    "vuetify"
  ],*/
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    },
  }
};
