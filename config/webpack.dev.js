const helper = require('./helper'),
  commonConfig = require('./webpack.common'),
  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',

  output: {
    path: helper.root('dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gauge.JS',
      template: './src/index.html'
    }),
    new ExtractTextWebpackPlugin('[name].css')
  ],
  devServer: {
    contentBase: helper.root('dist'),
    port: 3000,
    historyApiFallback: true,
    stats: 'minimal'
  },
});
