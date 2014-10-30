/**
 * another one monkey patch to prevent "no timestamp" error
 * https://github.com/karma-runner/karma-requirejs/issues/6#issuecomment-23037725
 */
(function (global) {
	var fileWithoutLeadingSlash;
	// array where all spec files will be included
	global.tests = [];

	for (var file in global.__karma__.files) {
		if (global.__karma__.files.hasOwnProperty(file)) {
			// get rid of leading slash in file path - prevents "no timestamp" error
			fileWithoutLeadingSlash = file.replace(/^\//, '');
			global.__karma__.files[fileWithoutLeadingSlash] = global.__karma__.files[file];
			delete global.__karma__.files[file];

			// we get all the test files automatically and store to window.tests array
			if (/spec\.js$/.test(fileWithoutLeadingSlash)) {
				global.tests.push(fileWithoutLeadingSlash);
			}
		}
	}
})(this);

require(['base/public/js/config-require.js'],function(config){
	'use strict';

	config.baseUrl = 'base/public/js';
	config.deps = window.tests;
	config.callback = window.__karma__.start;

	for (var i in config.paths){
		config.paths[i] = config.paths[i].replace('../lib','./lib');
	}

	config.paths['angular-mocks'] = './lib/angular-mocks/angular-mocks';
	config.shim['angular-mocks'] = ['angular'];

	config.paths['Source'] = '.';

	window.require.config(config);
});

