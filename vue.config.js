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
  outputDir: 'dist'
});