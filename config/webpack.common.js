const helper = require('./helper'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: helper.root('tsconfig.json')
        }
      }
    ],

    noParse: /lodash/
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gauge.JS',
      template: './src/index.html'
    })
  ]
}
