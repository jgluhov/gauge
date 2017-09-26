const webpackMerge = require('webpack-merge'),
  karmaSpecReporter = require('karma-spec-reporter'),
  commonConfig = require('./karma.common');

module.exports = function(config) {

  const _config = webpackMerge(commonConfig, {
    files: [
      'spec/main.ts',
      'spec/**/*.spec.ts',
      'spec/fixtures/*.fixture.html'
    ],

    preprocessors: {
      'spec/main.ts': ['webpack'],
      'src/**/*.ts': ['webpack'],
      'spec/**/*.spec.ts': ['webpack'],
      'spec/fixtures/*.fixture.html': ['html2js'],
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
