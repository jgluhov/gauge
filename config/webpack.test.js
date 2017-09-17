const webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        enforce: 'post',
        test: /\.ts$/,
        exclude: [
            'node_modules',
            /\.spec\.ts$/
        ],
        loader: 'istanbul-instrumenter-loader',
      },
    ]
  }
})
