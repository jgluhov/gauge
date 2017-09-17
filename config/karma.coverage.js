const webpackMerge = require('webpack-merge'),
  karmaCoverage = require('karma-coverage'),
  commonConfig = require('./karma.common');

module.exports = function(config) {
  const _config = webpackMerge(commonConfig, {
    files: [
      '../spec/*.spec.ts'
    ],

    preprocessors: {
      '../src/*.ts': ['webpack'],
      '../spec/*.spec.ts': ['webpack']
    },

    plugins: [
      karmaCoverage
    ],

    reporters: ['coverage'],

    coverageReporter: {
      type : 'html',
      dir : '../coverage/'
    },

    logLevel: config.LOG_INFO,
    singleRun: true
  });

  config.set(_config);
}
