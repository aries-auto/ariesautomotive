require(['require','./config-require'],function(require, config){
	// set cache penetration
	config.urlArgs = 'bust=v0.0.1';

	// update global require config
	window.require.config(config);

	// load app
	require(['/js/main.js']);
});