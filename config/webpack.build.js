const webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin'),
  helper = require('./helper'),
  commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  entry: {
    gauge: './src'
  },

  devtool: 'inline-source-map',

  output: {
    path: helper.root('dist'),
    filename: 'gauge.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new BabelMinifyWebpackPlugin()
  ]
});
