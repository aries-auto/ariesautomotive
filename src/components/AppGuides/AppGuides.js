import React, { Component, PropTypes } from 'react';
import s from './AppGuides.scss';
import AppGuideActions from '../../actions/AppGuideActions';
import AppGuideStore from '../../stores/AppGuideStore';
import withStyles from '../../decorators/withStyles';
import cx from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';

const title = 'Application Guides';

@withStyles(s)
@connectToStores
class AppGuides extends Component {

	static propTypes = {
		guides: PropTypes.array,
		title: PropTypes.string,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
	};

	static defaultProps = {
		guides: [],
		title,
	};

	constructor() {
		super();

		AppGuideActions.all();
	}

	componentWillMount() {
		this.context.onSetTitle(title);
	}

	static getStores() {
		return [AppGuideStore];
	}

	static getPropsFromStores() {
		return AppGuideStore.getState();
	}

	renderGuides() {
		const output = [];
		this.props.guides.map((guide, i) => {
			output.push(
				<a key={i} className={cx(s.guide, 'row', 'well')} href={`/appguides/${guide}`}>
					<div className="pull-left">
						{ guide }
					</div>
					<div className="pull-right">
						<span className="glyphicon glyphicon-chevron-right"></span>
					</div>
				</a>
			);
		});

		return output;
	}

	render() {
		console.log(this.state);
		return (
			<div className={s.appguidesContainer}>
				<div className="container">
					<ol className="breadcrumb">
						<li><a href="/">Home</a></li>
						<li className="active">Application Guides</li>
					</ol>
					<h1>APPLICATION GUIDES</h1>
					<p>The application guides below will help you determine which ARIES parts will fit your vehicle. Each app guide is category-specific and broken down by vehicle make, model, year and style.</p>

					{this.renderGuides()}
				</div>
			</div>
		);
	}

}

export default AppGuides;
