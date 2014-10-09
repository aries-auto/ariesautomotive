'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('public/sass/**/*.scss', ['styles']);
  gulp.watch('public/js/**/*.js', ['scripts']);
  gulp.watch('public/img/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
