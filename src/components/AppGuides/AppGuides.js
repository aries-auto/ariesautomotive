import React, { Component, PropTypes } from 'react';
import s from './AppGuides.scss';
import AppGuideActions from '../../actions/AppGuideActions';
import AppGuideStore from '../../stores/AppGuideStore';
import withStyles from '../../decorators/withStyles';
import cx from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';
import AppGuide from './AppGuide/AppGuide';

const title = 'Application Guides';

@withStyles(s)
@connectToStores
class AppGuides extends Component {

	static propTypes = {
		guides: PropTypes.array,
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
		guides: [],
		title,
		guide: null,
	};

	constructor() {
		super();

		AppGuideActions.all();
	}

	componentWillMount() {
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		const seo = {
			title,
			description: 'ARIES Automotive Application Guides',
			image: 'http://storage.googleapis.com/aries-website/hero-images/jeep.png',
		};
		this.context.seo(seo);
	}

	static getStores() {
		return [AppGuideStore];
	}

	static getPropsFromStores() {
		return AppGuideStore.getState();
	}

	handleAppGuide(i) {
		AppGuideActions.set(this.props.guides[i], 0);
	}

	handleAppguides() {
		AppGuideActions.reset();
	}

	renderGuides() {
		const output = [];
		output.push(<h1 key="head">APPLICATION GUIDES</h1>);
		output.push(<p key="p">The application guides below will help you determine which ARIES parts will fit your vehicle. Each app guide is category-specific and broken down by vehicle make, model, year and style.</p>);
		this.props.guides.map((guide, i) => {
			output.push(
				<a key={i} className={cx(s.guide, 'row', 'well')} onClick={this.handleAppGuide.bind(this, i)}>
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

	renderGuide() {
		return (
			<AppGuide guide={this.props.guide} />
		);
	}

	renderBreadCrumbs() {
		const output = [];
		const apps = <li key="apps" className="active">Application Guides</li>;
		const appsinact = <li key="app" onClick={this.handleAppguides}><a>Application Guides</a></li>;
		const app = <li key="apps" className="active">{this.props.guide ? this.props.guide.name : null}</li>;
		if (this.props.guide) {
			output.push(appsinact);
			output.push(app);
		} else {
			output.push(apps);
		}
		return output;
	}

	render() {
		return (
			<div className={s.appguidesContainer}>
				<div className="container">
					<ol className="breadcrumb">
						<li><a href="/">Home</a></li>
						{this.renderBreadCrumbs()}
					</ol>
					{this.props.guide ? this.renderGuide() : this.renderGuides()}
				</div>
			</div>
		);
	}

}

export default AppGuides;
