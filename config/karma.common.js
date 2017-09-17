const karmaChromeLauncher = require('karma-chrome-launcher'),
  karmaSourceMapSupport = require('karma-source-map-support'),
  karmaJasmine = require('karma-jasmine'),
  karmaWebpack = require('karma-webpack'),
  webpackConfig = require('./webpack.test');

module.exports = {
  basePath: '',

  frameworks: [
    'jasmine',
    'source-map-support'
  ],

  mime: {
    'text/x-typescript': [
      'ts'
    ]
  },

  webpack: webpackConfig,

  webpackMiddleware: {
    stats: 'errors-only'
  },

  webpackServer: {
    noInfo: true
  },

  plugins: [
    karmaWebpack,
    karmaJasmine,
    karmaChromeLauncher,
    karmaSourceMapSupport
  ],

  reporters: [],

  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['ChromeHeadless']
};
