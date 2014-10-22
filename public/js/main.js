/**
 * Bootstraps angular onto the window.document node.
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
	'angular',
	'bootstrap',
	'app'
], function (angular) {
	'use strict';

	// You can place operations that need to initialize prior to app start here
	// using the `run` function on the top-level module
	var Typekit = {};
	var TypekitConfig = {
		kitId: 'gah1dnk'
	};

	(function() {
	 	var tk = document.createElement('script');
	 	tk.src = '//use.typekit.com/' + TypekitConfig.kitId + '.js';
	 	tk.type = 'text/javascript';
	 	tk.async = 'true';
	 	tk.onload = tk.onreadystatechange = function() {
	 		var rs = this.readyState;
	 		if (rs && rs !== 'complete' && rs !== 'loaded'){
	 			return;
	 		}
	 		try { Typekit.load(TypekitConfig); } catch (e) {}
	 	};

	 	var s = document.getElementsByTagName('script')[0];
	 	s.parentNode.insertBefore(tk, s);
	 })();

	// as script is at the very bottom of the page no waiting for domReady
	angular.bootstrap(document, ['app']);
});
