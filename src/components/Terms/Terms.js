import React, { Component, PropTypes } from 'react';
import s from './Terms.scss';
import withStyles from '../../decorators/withStyles';
import terms from '../../data/terms';

const title = 'Terms and Conditions';

@withStyles(s)
class Terms extends Component {

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	componentWillMount() {
		this.context.onSetTitle(title);
	}

	render() {
		return (
			<div className="terms-container">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-md-12 col-lg-12">
							<h1>TERMS AND CONDITIONS</h1>
							{terms.termsHtml}
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default Terms;
