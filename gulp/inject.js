'use strict';

var gulp = require('gulp');

var path = require('path');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('config:dev', ['inject','styles'],function(){
    gulp.src(paths.src +'/app/constants/dev.json')
      .pipe($.ngConstant({
          name: 'AppConfig',
          templatePath: path.join(__dirname, '../src/app/constants', 'config.template.ejs')
      }))
      .pipe($.rename('config.js'))
      .pipe(gulp.dest(paths.src + '/app/constants'));
});

gulp.task('config:prod', ['inject','styles'],function(){
    gulp.src(paths.src +'/app/constants/prod.json')
      .pipe($.ngConstant({
          name: 'AppConfig',
          templatePath: path.join(__dirname, '../src/app/constants', 'config.template.ejs')
      }))
      .pipe($.rename('config.js'))
      .pipe(gulp.dest(paths.src + '/app/constants'));
});

gulp.task('inject', ['styles'], function () {

  var injectStyles = gulp.src([
    paths.tmp + '/serve/{app,components}/**/*.css',
    '!' + paths.tmp + '/serve/app/vendor.css'
  ], { read: false });

  var injectScripts = gulp.src([
    paths.src + '/{app,components}/**/*.js',
    '!' + paths.src + '/{app,components}/**/*.spec.js',
    '!' + paths.src + '/{app,components}/**/*.mock.js'
  ]).pipe($.angularFilesort());

  var injectOptions = {
    ignorePath: [paths.src, paths.tmp + '/serve'],
    addRootSlash: false
  };

  var wiredepOptions = {
    directory: 'src/lib',
    exclude: [/bootstrap\.css/, /bootstrap\.css/, /foundation\.css/]
  };

  return gulp.src(paths.src + '/*.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.tmp + '/serve'));

});
