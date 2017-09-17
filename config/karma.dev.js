const webpackMerge = require('webpack-merge'),
  karmaSpecReporter = require('karma-spec-reporter'),
  commonConfig = require('./karma.common');

module.exports = function(config) {

  const _config = webpackMerge(commonConfig, {
    files: [
      'spec/*.spec.ts'
    ],

    preprocessors: {
      'src/*.ts': ['webpack'],
      'spec/*.spec.ts': ['webpack']
    },
    
    plugins: [
      karmaSpecReporter
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

    logLevel: config.LOG_INFO,
    singleRun: false
  });

  config.set(_config);
}
