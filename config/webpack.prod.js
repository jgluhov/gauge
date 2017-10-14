const webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin'),
  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
  helper = require('./helper'),
  commonConfig = require('./webpack.common');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  entry: './src',

  devtool: 'inline-source-map',

  output: {
    path: helper.root('dist'),
    filename: 'gauge.min.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new BabelMinifyWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new ExtractTextWebpackPlugin('[name].[hash].css')
  ]
});
