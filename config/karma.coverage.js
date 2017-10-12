const webpackMerge = require('webpack-merge'),
  karmaCoverage = require('karma-coverage'),
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
      karmaCoverage
    ],

    reporters: ['coverage'],

    coverageReporter: {
      type : 'html',
      dir : './coverage/'
    },

    logLevel: config.LOG_INFO,
    singleRun: true
  });

  config.set(_config);
}
