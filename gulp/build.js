'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var saveLicense = require('uglify-save-license');
var runSequence = require('run-sequence');
var exec = require('gulp-exec');

gulp.task('styles', function () {
  return gulp.src('public/sass/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({style: 'compressed'}))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('public/css'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src(['public/js/**/*.js', '!public/js/lib/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('partials', function () {
  return gulp.src('templates/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: "ariesautomotive",
      prefix: "templates/"
    }))
    .pipe(gulp.dest(".tmp/partials"))
    .pipe($.size());
});

gulp.task('html', ['styles', 'scripts', 'partials'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src('templates/*.html')
    .pipe($.inject(gulp.src('.tmp/templates/**/*.js'), {
      read: false,
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe($.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngmin())
    .pipe($.uglify({preserveComments: saveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap','fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('public/img/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public/img/dest'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return $.bowerFiles()
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build-be',function(){
	console.log('build be');
	var options = {
		continueOnError: false,
		pipeStdout: false,
		customTemplatingThing: 'test'
	};
	var reportOptions = {
		err: true,
		stderr: true,
		stdout: true
	};
	gulp.src('./**/*.go').pipe(exec('go run index.go', options)).pipe(exec.reporter(reportOptions));
});

gulp.task('build-fe', ['html', 'partials', 'images', 'fonts']);

gulp.task('build',function(callback){
	runSequence('build-fe','build-be', callback);
});
