const helper = require('./helper'),
  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

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
      },
      {
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.html$/,
        loader: 'html-loader?exportAsEs6Default'
      }
    ],

    noParse: /lodash/
  },

  resolve: {
    extensions: ['.ts', '.js', '.css', '.html']
  }
}
