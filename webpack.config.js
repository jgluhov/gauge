const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main',

  output: {
    path: path.resolve(__dirname, 'dist'),

    filename: 'bundle.js'
  },

  devtool: 'inline-cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gauge.JS'
    })
  ]
}
