// Protractor configuration file.
exports.config = {

	baseUrl: 'http://localhost:8080',

	// The address of a running selenium server.
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': 'chrome'
	},
	specs:['./**/*.e2e.js'],

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};