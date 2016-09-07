import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import s from './LatestNewsItem.scss';
import cx from 'classnames';
import SiteStore from '../../stores/SiteStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class LatestNewsItem extends Component {

	static propTypes = {
		newsItem: PropTypes.object,
		title: PropTypes.string,
		context: PropTypes.shape({
			id: PropTypes.string,
		}),
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};


	static defaultProps = {
		context: {
			id: '',
		},
	};

	componentWillMount() {
		const title = this.props.newsItem && this.props.newsItem.title ? this.props.newsItem.title : 'Lastest News';
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		const seo = {
			title,
			description: this.props.newsItem.content ? this.props.newsItem.content : 'News',
		};
		this.context.seo(seo);
	}

	static getStores() {
		return [SiteStore];
	}

	static getPropsFromStores() {
		return SiteStore.getState();
	}

	render() {
		return (
			<div className={cx(s.root, 'container')}>
				<div>
					<h1 className="newsitem-header">{this.props.newsItem.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: this.props.newsItem.content }} />
				</div>
				<Link to={`/news`} title="Back to News">BACK TO NEWS</Link>
			</div>
		);
	}

}

export default LatestNewsItem;
