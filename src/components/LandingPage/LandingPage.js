import React, { Component, PropTypes } from 'react';
import s from './LandingPage.scss';
import cx from 'classnames';
import SiteStore from '../../stores/SiteStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';
import { brand } from '../../config';

@withStyles(s)
@connectToStores
class LandingPage extends Component {

	static propTypes = {
		customContent: PropTypes.object,
		landingPage: PropTypes.object,
	}

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	componentWillMount() {
		const title = (this.props.landingPage && this.props.landingPage.Name) ? this.props.landingPage.Name : brand.code;
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', (this.props.landingPage && this.props.landingPage.Name ? this.props.landingPage.Name : brand.name));
		const seo = {
			title,
		};
		this.context.seo(seo);
	}

	static getStores() {
		return [SiteStore];
	}

	static getPropsFromStores() {
		return SiteStore.getState();
	}

	renderText() {
		if (!this.props.landingPage || !this.props.landingPage.HtmlContent) {
			return null;
		}

		return <div dangerouslySetInnerHTML={{ __html: this.props.landingPage.HtmlContent }} />;
	}

	render() {
		return (
			<div className={cx(s.root)}>
				<h2>{this.props.landingPage.Name || ''}</h2>
				{this.renderText()}
			</div>
		);
	}

}

export default LandingPage;
