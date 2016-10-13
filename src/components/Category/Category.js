import React, { Component, PropTypes } from 'react';
import ga from 'react-ga';
import cx from 'classnames';
import PartResults from '../PartResults';
import s from './Category.scss';
import withStyles from '../../decorators/withStyles';
import { brand } from '../../config';

@withStyles(s)
class SearchResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		category: PropTypes.object,
		context: PropTypes.shape({
			category: PropTypes.object,
		}),
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	constructor() {
		super();

		this.scrollTo = this.scrollTo.bind(this);
	}

	componentWillMount() {
		if (!this.props || !this.props.context || !this.props.context.category) {
			return;
		}

		const title = this.props.context.category && this.props.context.category.title ? this.props.context.category.title : `${brand.name} Product Categories`;
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		const image = this.props.context.category &&
		this.props.context.category.image &&
		this.props.context.category.image.Scheme &&
		this.props.context.category.image.Host &&
		this.props.context.category.image.Path ?
		`${this.props.context.category.image.Scheme}://${this.props.context.category.image.Host}${this.props.context.category.image.Path}`
		: '';
		const seo = {
			title: this.props.context.category.meta_description,
			description: this.props.context.category.long_description,
			image,
		};
		this.context.seo(seo);
	}

	componentWillUpdate() {
		const node = this.getDOMNode();
		this.scrollHeight = node.scrollHeight;
		this.scrollTop = node.scrollTop;
	}

	getContent() {
		let content = '';
		this.props.category.content.map((con) => {
			content = `${content} ${con.text}`;
		});

		return {
			__html: content,
		};
	}

	loadMore() {
		ga.pageview('/category/' + this.props.category.id + '#page=');
	}

	showParts() {
		if (this.props.category && this.props.category.parts && this.props.category.parts.parts && this.props.category.parts.parts.length > 0) {
			return <PartResults parts={this.props.category.parts.parts} />;
		}
	}

	pagination() {
		const res = this.props.category.parts ? this.props.category.parts : [];
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
		if (this.props.category.vehicle_specific) {
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
				<h2 id="categoryProdHeader">{this.props.category.title} Products</h2>

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
		if (!this.props.category || !this.props.category.title) {
			return <div></div>;
		}

		return (
			<div className={cx(s.root, this.props.className, 'container')} role="navigation">
				<div className="category-content container">
					<h1 id="catTitle">{this.props.category.title}</h1>
					<div dangerouslySetInnerHTML={this.getContent()} />
				</div>
				{this.renderParts()}
			</div>
		);
	}

}

export default SearchResults;
