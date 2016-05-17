import React, { Component, PropTypes } from 'react';
import s from './LatestNews.scss';
import cx from 'classnames';
import _ from 'lodash';
import NewsStore from '../../stores/NewsStore';
import NewsActions from '../../actions/NewsActions';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

const title = 'Latest News';

@withStyles(s)
@connectToStores
class LatestNews extends Component {

	static propTypes = {
		news: PropTypes.array,
		title: PropTypes.string,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	static defaultProps = {
		news: [],
	};

	constructor() {
		super();

		NewsActions.all();
	}

	componentWillMount() {
		this.context.onSetTitle(title);
		this.context.onSetMeta(title);
		const seo = {
			title: 'ARIES Latest News',
			description: 'Latest News',
			image: 'http://storage.googleapis.com/aries-website/hero-images/jeep.png',
		};
		this.context.seo(seo);
	}

	static getStores() {
		return [NewsStore];
	}

	static getPropsFromStores() {
		return NewsStore.getState();
	}

	renderNews() {
		const out = [];
		const news = _.sortBy(this.props.news, (o) => {
			return new Date(o.publishStart);
		}).reverse();
		news.map((n, i) => {
			if (
				(
					new Date(n.publishEnd) > new Date() ||
					!(n.publishEnd > 0)
				) &&
				n.active === true &&
				new Date(n.publishStart) <= new Date()
			) {
				const dt = new Date(n.publishStart);
				if (!dt) {
					return;
				}
				out.push(
					<div className={s.news} key={i}>
						<a href={`/news/${n.id}`}>
                            <h4>{n.title}</h4>
                            <h5 className={s.bigger}>
								<div className="col-xs-8">{n.lead}</div>
                                <div className="col-xs-4">
									<small>{dt.toDateString()}</small>
								</div>
								<div className="clearfix"></div>
                            </h5>
                        </a>
					</div>
				);
			}
		});

		return out;
	}

	render() {
		return (
			<div className={cx(s.root, 'container')}>
				<h1>{title}</h1>
				{this.renderNews()}
			</div>
		);
	}

}

export default LatestNews;
