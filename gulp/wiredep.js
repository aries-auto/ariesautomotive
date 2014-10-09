'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('public/sass/*.scss')
    .pipe(wiredep({
        directory: 'public/js/lib'
    }))
    .pipe(gulp.dest('public/sass'));

  gulp.src('templates/**/*.html')
    .pipe(wiredep({
      directory: 'public/js/lib',
      exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('.tmp'));
});
