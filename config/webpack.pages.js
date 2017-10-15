const webpack = require('webpack'),
  helper = require('./helper'),
  commonConfig = require('./webpack.common'),
  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
  BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helper.root('pages'),
    filename: 'assets/bundle.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new BabelMinifyWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Gauge.JS',
      template: './src/index.html'
    }),
    new ExtractTextWebpackPlugin('assets/bundle.[hash].css')
  ]
});
