require(['require','./config-require'],function(require, config){
	// set cache penetration
	config.urlArgs = 'bust=v0.0.1';

	// update global require config
	window.require.config(config);

	// load typekit fonts
	(function(d) {
		var Typekit = {};
		var config = {
			kitId: 'gah1dnk',
			scriptTimeout: 3000
		},
		h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!=="complete"&&a!=="loaded"){return}f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
	})(document);

	// load app
	require(['/js/main.js']);
});