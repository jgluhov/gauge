const karmaSpecReporter = require('karma-spec-reporter'),
  karmaChromeLauncher = require('karma-chrome-launcher'),
  karmaJasmine = require('karma-jasmine'),
  karmaWebpack = require('karma-webpack'),
  webpackConfig = require('./webpack.test');

module.exports = function (config) {
  const _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'spec/*.spec.ts'
    ],

    preprocessors: {
      'spec/*.spec.ts': ['webpack']
    },

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
      karmaSpecReporter,
      karmaJasmine,
      karmaChromeLauncher
    ],

    reporters: ['spec'],

    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: true,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: false,
      failFast: false
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  };

  config.set(_config);
};
