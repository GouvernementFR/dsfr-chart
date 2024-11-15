const webpack = require('webpack')
module.exports = {
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  filenameHashing: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
}
