const webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map'
})
