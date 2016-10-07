import React, { Component, PropTypes } from 'react';
import { googleAnalyticsId, brand } from '../../config';

class Html extends Component {

	static propTypes = {
		title: PropTypes.string,
		description: PropTypes.string,
		css: PropTypes.string,
		body: PropTypes.string.isRequired,
		entry: PropTypes.string.isRequired,
		metas: PropTypes.object,
	};

	static defaultProps = {
		title: '',
		description: '',
		metas: {},
	};

	trackingCode() {
		return ({ __html:
		`(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=` +
			`function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;` +
			`e=o.createElement(i);r=o.getElementsByTagName(i)[0];` +
			`e.src='https://www.google-analytics.com/analytics.js';` +
			`r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));` +
			`ga('create','${googleAnalyticsId}','auto');ga('send','pageview');`,
		});
	}

	typekit() {
		return ({ __html:
			`
			(function() {
				var config = {
					kitId: 'abc1def',
					scriptTimeout: 3000
				};
				var h = document.getElementsByTagName('html')[0];
				h.className += ' wf-loading';
				var t = setTimeout(function() {
					h.className = h.className.replace(/(\s|^)wf-loading(\s|$)/g, ' ');
					h.className += ' wf-inactive';
				}, config.scriptTimeout);
				var d = false;
				var tk = document.createElement('script');
				tk.src = '//use.typekit.net/' + config.kitId + '.js';
				tk.type = 'text/javascript';
				tk.async = 'true';
				tk.onload = tk.onreadystatechange = function() {
					var rs = this.readyState;
					if (d || rs && rs != 'complete' && rs != 'loaded') return;
					d = true;
					clearTimeout(t);
					try { Typekit.load(config); } catch (e) {}
				};
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(tk, s);
			})();
			`,
		});
	}

	typekit2() {
		return ({ __html:
			`try{Typekit.load({ async: true });}catch(e){}`,
		});
	}

	render() {
		return (
			<html className="no-js" lang="" style={{ maxWidth: '100%' }}>
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<title>{brand.name} | {this.props.title}</title>
					<meta name="description" content={this.props.description} />
					<meta property="og:type" content={this.props.metas['og:type']} />
					<meta property="og:url" content={this.props.metas['og:url']} />
					<meta property="og:title" content={this.props.metas['og:title']} />
					<meta property="og:description" content={this.props.metas['og:description']} />
					<meta property="og:image" content={this.props.metas['og:image']} />
					<meta property="fb:app_id" content="1176652602358801" />
					<meta name="twitter:type" content={this.props.metas['twitter:type']} />
					<meta name="twitter:url" content={this.props.metas['twitter:url']} />
					<meta name="twitter:title" content={this.props.metas['twitter:title']} />
					<meta name="twitter:description" content={this.props.metas['twitter:description']} />
					<meta name="twitter:image" content={this.props.metas['twitter:image']} />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content={brand.twitter || ''} />
					<meta name="google-site-verification" content="2YAIw2si-iBLQTUFUuNXfq8u5uoXzTysfiBTsFntY00" />
					<meta name="keywords" ng-bind="pageKywds" content="" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />

					{(brand.favicons ? brand.favicons.apple || [] : []).map((fv) => <link rel={fv.rel} sizes={fv.sizes} href={`${fv.href}?v=${brand.favicons.version}`} />)}
					{(brand.favicons ? brand.favicons.microsoft || [] : []).map((fv) => <meta name={fv.name} content={`${fv.content}?v=${brand.favicons.version}`} />)}

					<style id="css" dangerouslySetInnerHTML={{ __html: this.props.css }} />
				</head>
				<body>
					<div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
					<script src={this.props.entry}></script>
					<script dangerouslySetInnerHTML={this.trackingCode()} />
				</body>
			</html>
		);
	}

}

export default Html;
