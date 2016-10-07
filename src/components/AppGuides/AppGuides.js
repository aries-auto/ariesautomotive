import React, { Component, PropTypes } from 'react';
import s from './AppGuides.scss';
import AppGuideActions from '../../actions/AppGuideActions';
import AppGuideStore from '../../stores/AppGuideStore';
import withStyles from '../../decorators/withStyles';
import cx from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';
import AppGuide from './AppGuide/AppGuide';
import { brand } from '../../config.js';

const title = 'Application Guides';

@withStyles(s)
@connectToStores
class AppGuides extends Component {

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

	constructor() {
		super();

		// AppGuideActions.all();
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

	handleAppGuide(g) {
		AppGuideActions.set(g.collection, 0);
	}

	handleAppguides() {
		AppGuideActions.reset();
	}

	renderGuides() {
		// loop through each main category ('Running boards, nerf bars, side steps, side steps, etc')
		const mainGuides = [];
		if (!this.props.guideGroups) {
			return null;
		}
		this.props.guideGroups.map((group, i) => {
			mainGuides.push(<h2 key={i}>{group.title}</h2>);
			const ags = [];

			// loop through each sub category (RidgeStep, 4 oval wheel to wheel, big step 4 inch round nerf bars, etc)
			group.appGuides.map((g, ii) => {
				ags.push(
					<div key={ii} className={cx(s.guideRow, 'col-xs-12', 'col-sm-6', 'col-md-6', 'col-lg-6')}>
						<a className={cx(s.guide, 'well')} href={`/appguides/${g.collection}/0`}>
							<img className={cx(s.guideImage)} src={g.imagePath} />
							<div className={cx(s.guideTitle)}>{g.title}</div>
						</a>
					</div>
				);
			});
			mainGuides.push(<div className={cx(s.subGuides, 'col-lg-12', 'col-md-12', 'col-sm-12')}>{ags}</div>);
		});

		return (
			<div>
				<h1>APPLICATION GUIDES</h1>
				<p>
					The application guides below will help you determine which
					{brand.code} parts will fit your vehicle.<br /> Each app guide is
					category-specific and broken down by vehicle make, model,
					year and style.
				</p>
				{mainGuides}
			</div>
		);
	}

	renderBreadCrumbs() {
		if (this.props.guide) {
			return (
				[
					<li key="app"><a href={`/appguides`}>Application Guides</a></li>,
					<li key="apps" className="active">{this.props.guide ? this.props.guide.name : null}</li>,
				]
			);
		}
		return <li key="apps" className="active">Application Guides</li>;
	}

	render() {
		return (
			<div className={s.appguidesContainer}>
				<div className="container">
					<ol className="breadcrumb">
						<li><a href="/">Home</a></li>
						{this.renderBreadCrumbs()}
					</ol>
					{this.props.guide ? <AppGuide guide={this.props.guide} /> : this.renderGuides()}
				</div>
			</div>
		);
	}

}

export default AppGuides;
