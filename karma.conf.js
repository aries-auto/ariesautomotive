// Karma configuration
// Generated on Wed Oct 29 2014 19:04:49 GMT-0500 (CDT)

module.exports = function(config) {
	config.set({

		files: [
			'public/js/tests/tests-main.js',
			{ pattern: 'public/js/**/*.js', included: false },
			{ pattern: 'public/js/**/*.coffee', included: false },
			{ pattern: 'public/js/**/*.map', included: false },
			{ pattern: 'public/js/lib/**/*.js', included: false },
			{ pattern: 'public/js/lib/**/*.map', included: false },
		],
		exclude: [
			'public/js/lib/**/*spec.js',
			'public/js/lib/**/*spec.coffee'
		],

		browsers: ['Chrome'],
		// Chrome, ChromeCanary, Firefox, IE (only Windows), Opera, PhantomJS, Safari (only Mac)

		reporters: [
			'dots',
			// 'coverage',
		],
		preprocessors: {
			// 'public/js/**/*.js': 'coverage',
			'public/js/**/*.spec.coffee': 'coffee'
		},
		coffeePreprocessor: {
			options: { sourceMap: true },
			transformPath: function (filepath) {
				return filepath.replace(/spec\.coffee$/, 'coffee.spec.js');
			}
		},
		// Optionally, configure the reporter:
		//
		// coverageReporter: {
		//   type: 'html',
		//   dir: 'coverage/',
		// },

		basePath: './',
		captureTimeout: 60000,
		colors: true,
		frameworks: ['jasmine', 'requirejs'],
		logLevel: config.LOG_INFO,
		port: 9876,
		reportSlowerThan: 500,
		runnerPort: 9100,
	});
};
