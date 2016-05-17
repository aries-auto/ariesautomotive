import React, { Component, PropTypes } from 'react';
import s from './ErrorPage.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Error';

@withStyles(s)
class ErrorPage extends Component {

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	componentWillMount() {
		this.context.onSetTitle(title);
		const seo = {
			title,
		};
		this.context.seo(seo);
	}

	render() {
		return (
			<div>
				<h1>{title}</h1>
				<p>Sorry, an critical error occurred on this page.</p>
			</div>
		);
	}

}

export default ErrorPage;
