const webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin'),
  helper = require('./helper'),
  commonConfig = require('./webpack.common');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helper.root('dist'),
    filename: 'bundle.[hash].js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new BabelMinifyWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
  ]
});
