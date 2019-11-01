const path = require('path')

module.exports = {
  pluginOptions: {
    loader: 'sass-resources-loader',
    options: {
      resources: path.resolve(__dirname, '../src/assets/styles/main.scss')
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "src/assets/styles/main.scss";
        `
      }
    }
  }
}
