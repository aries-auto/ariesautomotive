import React, { Component, PropTypes } from 'react';
import s from './LatestNewsItem.scss';
import cx from 'classnames';
import NewsStore from '../../stores/NewsStore';
import NewsActions from '../../actions/NewsActions';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

const title = 'Latest News';

@withStyles(s)
@connectToStores
class LatestNewsItem extends Component {

	static propTypes = {
		item: PropTypes.object,
		title: PropTypes.string,
		context: PropTypes.shape({
			id: PropTypes.string,
		}),
	};

	static defaultProps = {
		item: {},
		title: '',
		context: {
			id: '',
		},
	};

	constructor(props) {
		super();

		NewsActions.get(props.context.id);
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

	renderItem() {
		if (this.props.item) {
			return (
				<div>
					<h1 className="newsitem-header">{this.props.item.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: this.props.item.content }} />
				</div>
			);
		}
	}

	render() {
		return (
			<div className={cx(s.root, 'container')}>
				{this.renderItem()}
				<a href="/news">BACK TO NEWS</a>
			</div>
		);
	}

}

export default LatestNewsItem;
