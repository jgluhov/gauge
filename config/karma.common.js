const karmaChromeLauncher = require('karma-chrome-launcher'),
  karmaSourceMapSupport = require('karma-source-map-support'),
  karmaJasmine = require('karma-jasmine'),
  karmaWebpack = require('karma-webpack'),
  karmaFixture = require('karma-fixture'),
  karmaHtml2JsPreprocessor = require('karma-html2js-preprocessor'),
  webpackConfig = require('./webpack.test');

module.exports = {
  basePath: '',

  frameworks: [
    'jasmine',
    'source-map-support',
    'fixture'
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
    karmaSourceMapSupport,
    karmaFixture,
    karmaHtml2JsPreprocessor
  ],

  reporters: [],

  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['ChromeHeadless']
};
