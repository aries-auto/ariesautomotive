require(['require','./config-require'],function(require, config){
	// set cache penetration
	config.urlArgs = 'bust=v0.0.1';

	// update global require config
	window.require.config(config);

	// load typekit
	(function() {
		var config = {
			kitId: 'zgp0frb'
		};
		var d = false;
		var tk = document.createElement('script');
		tk.src = '//use.typekit.net/' + config.kitId + '.js';
		tk.type = 'text/javascript';
		tk.async = 'true';
		tk.onload = tk.onreadystatechange = function() {
			var rs = this.readyState;
			if (d || rs && rs !== 'complete' && rs !== 'loaded') {
				return;
			}
			d = true;
			try { 
				Typekit.load(config); 
			} catch (e) {}
		};
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(tk, s);
	})();


	// load app
	require(['/js/main.js']);
});