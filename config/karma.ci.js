const webpackMerge = require('webpack-merge'),
  devConfig = require('./karma.dev');

  module.exports = function(config) {

    const _config = webpackMerge(devConfig, {
      singleRun: true
    });

    config.set(_config);
  }
