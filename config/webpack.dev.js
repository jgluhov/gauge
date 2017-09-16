const helper = require('./helper'),
  commonConfig = require('./webpack.common'),
  webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-cheap-module-source-map',

  output: {
    path: helper.root('dist'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: helper.root('dist'),
    port: 3000,
    historyApiFallback: true,
    stats: 'minimal'
  },
});
