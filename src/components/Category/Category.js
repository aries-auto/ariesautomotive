import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import PartResults from '../PartResults';
import s from './Category.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class SearchResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.shape({
			category: PropTypes.object,
		}),
	};

	constructor() {
		super();

		this.scrollTo = this.scrollTo.bind(this);
		this.state = {
			context: {},
		};
	}

	componentWillMount() {
		if (!this.props || !this.props.context || !this.props.context.category) {
			return;
		}

		this.setState({
			context: this.props.context,
		});
	}

	componentWillUpdate() {
		const node = this.getDOMNode();
		this.scrollHeight = node.scrollHeight;
		this.scrollTop = node.scrollTop;
	}

	getContent() {
		let content = '';
		this.state.context.category.content.map((con) => {
			content = `${content} ${con.text}`;
		});

		return {
			__html: content,
		};
	}

	loadMore() {

	}

	showParts() {
		if (this.state.context.category.parts.parts.length > 0) {
			return <PartResults parts={this.state.context.category.parts.parts} />;
		}
	}

	pagination() {
		const res = this.state.context.category.parts;
		if (res.length > 0) {
			return (
				<a href="#" className="pagination" onClick={this.loadMore()}>
					<span>Load more</span>
				</a>
			);
		}
	}

	scrollTo() {
		window.scrollTo(0, 0);
	}

	renderParts() {
		if (this.state.context.category.vehicle_specific) {
			return (
				<div className="container">
					<div className={cx(s.findProducts, 'col-lg-12')}>
						<a onClick={this.scrollTo} className="red-transparent-button">
							Find Products for Your Vehicle
						</a>
						<div className="clearfix"></div>
					</div>
				</div>
			);
		}
		return (
			<div className="container">
				<h2 id="categoryProdHeader">{this.props.context.category.title} Products</h2>

				<div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
					{/* Products */}
					{this.showParts()}
				</div>

				{/* Pagination */}
				<div className="clearfix"></div>
				{this.pagination()}
			</div>
		);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'container')} role="navigation">
				<div className="category-content container">
					<h1 id="catTitle">{this.state.context.category.title}</h1>
					<div dangerouslySetInnerHTML={this.getContent()} />
				</div>
				{this.renderParts()}
			</div>
		);
	}

}

export default SearchResults;
