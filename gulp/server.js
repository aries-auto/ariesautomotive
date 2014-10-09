'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');
var httpProxy = require('http-proxy');

/* This configuration allow you to configure browser sync to proxy your backend */
var proxyTarget = 'http://server/context/'; // The location of your backend
var proxyApiPrefix = 'api'; // The element in the URL which differentiate between API request and static file request

var proxy = httpProxy.createProxyServer({
  target: proxyTarget
});

function proxyMiddleware(req, res, next) {
  if (req.url.indexOf(proxyApiPrefix) !== -1) {
    proxy.web(req, res);
  } else {
    next();
  }
}

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  browserSync.instance = browserSync.init(files, {
  	// By default, Martini is listening on port 3000
  	proxy: 'localhost:8000',
  	// We will set BrowserSync on the port 3001
  	port: 8001,
  	open: false,
    startPath: '/',
    browser: browser
  });

}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    'public',
    'templates',
    '.tmp'
  ], [
    'templates/*.html',
    '.tmp/styles/**/*.css',
    'public/css/**/*.css',
    'public/js/**/*.js',
    'templates/**/*.html',
    'public/img/**/*'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});

gulp.task('serve:e2e', function () {
  browserSyncInit(['.tmp'], null, []);
});

gulp.task('serve:e2e-dist', ['watch'], function () {
  browserSyncInit('dist', null, []);
});
