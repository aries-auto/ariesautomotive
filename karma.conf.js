'use strict';

module.exports = function(config) {

  config.set({
    autoWatch : true,
    colors: true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-jasmine'
    ]
  });
};
