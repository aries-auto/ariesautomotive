import React, { Component, PropTypes } from 'react';
import s from './AppGuidesLuverne.scss';
import AppGuideStore from '../../stores/AppGuideStoreLuverne';
import withStyles from '../../decorators/withStyles';
// import cx from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';
import { brand } from '../../config.js';
import CategoryTree from '../CategoryTree';

const title = 'Luverne Application Guides';

@withStyles(s)
@connectToStores
class AppGuidesLuverne extends Component {

	static propTypes = {
		guideGroups: PropTypes.array,
		title: PropTypes.string,
		guide: PropTypes.object,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	static defaultProps = {
		guideGroups: [],
		title,
		guide: null,
	};

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
		return (
			<div>
				<h1>APPLICATION GUIDES</h1>
				<p>
					The application guides below will help you determine which {brand.code} parts
					will fit your vehicle.<br /> Each app guide is
					category-specific and broken down by vehicle make, model,
					year and style.
				</p>
				<CategoryTree linkOverride={'/appguides'} />
			</div>
		);
	}

	render() {
		return (
			<div className={s.appguidesContainer}>
				<div className="container">
					<ol className="breadcrumb">
						<li><a href="/">Home</a></li>
						<li><a className="active">Application Guides</a></li>
					</ol>
					{this.renderGuides()}
				</div>
			</div>
		);
	}

}

export default AppGuidesLuverne;
