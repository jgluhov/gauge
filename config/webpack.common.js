const helper = require('./helper'),
  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
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
      },
      {
        test: /\.css$/,
        exclude: [
          helper.root('src', 'gauge'),
          helper.root('src', 'slider')
        ],
        loader: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.css$/,
        include: [
          helper.root('src', 'gauge'),
          helper.root('src', 'slider')
        ],
        loader: 'raw-loader'
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
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gauge.JS',
      template: './src/index.html'
    })
  ]
}
