const path = require('path'),
  commonConfig = require('./webpack.common'),
  webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-cheap-module-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    stats: 'minimal'
  },
});
