import React, { Component, PropTypes } from 'react';
import s from './LatestNews.scss';
import cx from 'classnames';
import NewsStore from '../../stores/NewsStore';
import NewsActions from '../../actions/NewsActions';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

const title = 'Latest News';

@withStyles(s)
class LatestNews extends Component {

	static propTypes = {
		news: PropTypes.array,
		title: PropTypes.string,
	};

	static defaultProps = {
		news: [],
	};

	constructor() {
		super();

		NewsActions.get();
	}

	componentWillMount() {
		this.setState({
			title,
		});
	}

	static getStores() {
		return [NewsStore];
	}

	static getPropsFromStores() {
		return NewsStore.getState();
	}

	render() {
		return (
			<div className={cx(s.root, 'container')}>
				<h1>{this.state.title}</h1>
			</div>
		);
	}

}

export default connectToStores(LatestNews);
