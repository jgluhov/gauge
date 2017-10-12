const webpackMerge = require('webpack-merge'),
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

      reporters: ['progress'],

      logLevel: config.LOG_INFO,
      singleRun: true
    });

    config.set(_config);
  }
