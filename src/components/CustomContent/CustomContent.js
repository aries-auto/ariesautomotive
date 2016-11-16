import React, { Component, PropTypes } from 'react';
import s from './CustomContent.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import { brand } from '../../config.js';

@withStyles(s)
class CustomContent extends Component {

	static propTypes = {
		context: PropTypes.object,
		pageData: PropTypes.object,
	}

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	componentWillMount() {
		const title = (this.props.context.customContent && this.props.context.customContent.title) ? this.props.context.customContent.title : brand.code;
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', (this.props.context.customContent) ? this.props.context.customContent.metaTitle : '');
		const seo = {
			title,
		};
		this.context.seo(seo);
	}
	shouldComponentUpdate() {
		this.setState({
			notusedstate: Math.random(),
		});
		return false;
	}

	renderText() {
		if (!this.props.context.customContent || !this.props.context.customContent.contentRevisions || this.props.context.customContent.contentRevisions.length < 1) {
			return null;
		}
		const html = { __html: this.props.context.customContent.contentRevisions[0].text };
		return (
			<div dangerouslySetInnerHTML={html} />
			);
	}

	render() {
		if (!this.props.context.customContent) {
			return null;
		}
		return (
			<div className={cx(s.root)}>
				<h2>{this.props.context.customContent.title}</h2>
				{this.renderText()}
			</div>
		);
	}

}

export default CustomContent;
