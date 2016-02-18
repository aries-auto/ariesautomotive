import React, { Component, PropTypes } from 'react';
import { googleAnalyticsId } from '../../config';

class Html extends Component {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        css: PropTypes.string,
        body: PropTypes.string.isRequired,
        entry: PropTypes.string.isRequired,
    };

    static defaultProps = {
        title: '',
        description: '',
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
            `(function() {` +
			`var config = {` +
			`	kitId: 'zgp0frb'` +
			`};` +
			`var d = false;` +
			`var tk = document.createElement('script');` +
			`tk.src = '//use.typekit.net/' + config.kitId + '.js';` +
			`tk.type = 'text/javascript';` +
			`tk.async = 'true';` +
			`tk.onload = tk.onreadystatechange = function() {` +
			`	var rs = this.readyState;` +
			`	if (d || rs && rs !== 'complete' && rs !== 'loaded') {` +
			`		return;` +
			`	}` +
			`	d = true;` +
			`	try {` +
			`		Typekit.load(config);` +
			`	} catch (e) {}` +
			`};` +
			`var s = document.getElementsByTagName('script')[0];` +
			`s.parentNode.insertBefore(tk, s);` +
            `})();`,
        });
    }

    render() {
        return (
            <html className="no-js" lang="">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <title>{this.props.title}</title>
                    <meta name="description" content={this.props.description} />
                    <meta name="google-site-verification" content="2YAIw2si-iBLQTUFUuNXfq8u5uoXzTysfiBTsFntY00" />
                    <meta name="keywords" ng-bind="pageKywds" content="" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    {/* For iPad with high-resolution Retina display running iOS ≥ 7: */}
                    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/path/to/favicon-152.png?v=2" />

                    {/* For iPad with high-resolution Retina display running iOS ≤ 6 */}
                    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/assets/img/ico/apple-touch-icon-144x144-precompressed.png?v=2" />
                    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/assets/img/ico/apple-icon-144x144.png?v=2" />

                    {/* For iPhone with high-resolution Retina display running iOS ≥ 7 */}
                    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/path/to/favicon-120.png?v=2" />

                    {/* For iPhone with high-resolution Retina display running iOS ≤ 6 */}
                    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/assets/img/ico/apple-touch-icon-114x114-precompressed.png?v=2" />
                    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/assets/img/ico/apple-icon-114x114.png?v=2" />

                    {/* For first- and second-generation iPad */}
                    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/assets/img/ico/apple-touch-icon-72x72-precompressed.png?v=2" />
                    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/assets/img/ico/apple-icon-72x72.png?v=2" />

                    {/* For non-Retina iPhone, iPod Touch, and Android 2.1+ devices */}
                    <link rel="apple-touch-icon-precomposed" href="/assets/img/ico/apple-touch-icon-57x57-precompressed.png?v=2" />
                    <link rel="apple-touch-icon-precomposed" href="/assets/img/ico/apple-icon-57x57.png?v=2" />
                    <link rel="icon" href="/assets/img/ico/favicon-32x32.png?v=2" sizes="32x32" />
                    <meta name="msapplication-TileColor" content="#FFFFFF" />
                    <meta name="msapplication-TileImage" content="/assets/img/ico/apple-touch-icon-144x144-precompressed.png?v=2" />

                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
                    <style id="css" dangerouslySetInnerHTML={{ __html: this.props.css }} />
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
                    <script src={this.props.entry}></script>
                    <script dangerouslySetInnerHTML={this.trackingCode()} />
                    <script dangerouslySetInnerHTML={this.typekit()} />
                    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
                </body>
            </html>
        );
    }

}

export default Html;