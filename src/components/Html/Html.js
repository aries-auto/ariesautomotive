import React, { Component, PropTypes } from 'react';
import { brand } from '../../config';

class Html extends Component {

	static propTypes = {
		title: PropTypes.string,
		description: PropTypes.string,
		canonical: PropTypes.string,
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
			`ga('create','${brand.googleAnalyticsId}','auto');ga('send','pageview');`,
		});
	}
	collectorCode() {
		return ({ __html:
			`
			window.ATL_JQ_PAGE_PROPS =  {
				"triggerFunction": function(showCollectorDialog) {
				//Requires that jQuery is available!
				jQuery("#jirafeedback").click(function(e) {
					e.preventDefault();
					showCollectorDialog();
				});
			}};
			`,
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
					<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
					{(this.props.canonical ? <link rel="canonical" href={this.props.canonical} /> : '')}
					{(brand.favicons ? brand.favicons.apple || [] : []).map((fv, i) => <link key={i} rel={fv.rel} sizes={fv.sizes} href={`${fv.href}?v=${brand.favicons.version}`} />)}
					{(brand.favicons ? brand.favicons.microsoft || [] : []).map((fv, i) => <meta key={i} name={fv.name} content={`${fv.content}?v=${brand.favicons.version}`} />)}

					<style id="css" dangerouslySetInnerHTML={{ __html: this.props.css }} />
				</head>
				<body>
					<div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
					<script src={this.props.entry}></script>
					<script type="text/javascript" src="https://curtmfg.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/y9kc0t/b/c/c8a734256c6dd2d1e4344e119e50264f/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=80171f66"></script>
					<script type="text/javascript" dangerouslySetInnerHTML={this.collectorCode()} />

					<script dangerouslySetInnerHTML={this.trackingCode()} />
				</body>
			</html>
		);
	}

}

export default Html;
