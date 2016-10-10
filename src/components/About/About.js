import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import SiteStore from '../../stores/SiteStore';

@connectToStores
class About extends Component {

	static propTypes = {
		className: PropTypes.string,
		pageData: PropTypes.object,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
	};

	componentWillMount() {
		this.context.onSetTitle(this.props.pageData.metaTitle);
		this.context.onSetMeta('description', this.props.pageData.metaDescription);
	}

	static getStores() {
		return [SiteStore];
	}

	static getPropsFromStores() {
		return {
			...SiteStore.getState(),
		};
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={{ __html: this.props.pageData.contentRevisions[0].text }} />
		);
	}

}

export default About;
