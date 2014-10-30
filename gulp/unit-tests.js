'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('test', function() {
  // var bowerDeps = wiredep({
  //   directory: 'pubic/js/lib',
  //   exclude: ['bootstrap-sass-official'],
  //   dependencies: true,
  //   devDependencies: true
  // });
  // console.log(bowerDeps);
  // var testFiles = bowerDeps.js.concat([
  //   'public/js/**/*.js',
  //   'test/unit/**/*.js'
  // ]);

  return gulp.src('./foobar')
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});
