const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        // additionalData: `@import "@/path/to/mixins.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/PlayVision/'
    : '/',
  outputDir: 'dist',
  chainWebpack: config => {
    config.plugin('copy').tap(args => {
      args[0].patterns[0].globOptions = {
        ...args[0].patterns[0].globOptions,
        ignore: ['**/index.html']
      };
      return args;
    });
  }
});