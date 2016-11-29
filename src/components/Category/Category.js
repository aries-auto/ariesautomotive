import React, { Component, PropTypes } from 'react';
import ga from 'react-ga';
import cx from 'classnames';
import PartResults from '../PartResults';
import CategoryParts from '../CategoryParts';
import LvCategoryParts from '../CategoryParts/LvCategoryParts';
import s from './Category.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';
import { brand } from '../../config';
import VehicleStore from '../../stores/VehicleStore';

@withStyles(s)
@connectToStores
class SearchResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		category: PropTypes.object,
		categoryProducts: PropTypes.object,
		context: PropTypes.shape({
			category: PropTypes.object,
		}),
		vehicle: PropTypes.object,
		fitments: PropTypes.array,
		envision: PropTypes.object,
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

	componentDidMount() {
		// Decode entities in the URL
		// Sometimes a URL like #/foo#bar will be encoded as #/foo%23bar
		window.location.hash = window.decodeURIComponent(window.location.hash);
		const scrollToAnchor = () => {
			const hashParts = window.location.hash.split('#');
			if (hashParts.length > 1) {
				const hash = hashParts.slice(-1)[0];
				document.querySelector(`#${hash}`).scrollIntoViewIfNeeded();
			}
		};
		scrollToAnchor();
		window.onhashchange = scrollToAnchor;
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
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
		if (!this.props.category.vehicle_specific && this.props.categoryProducts && this.props.categoryProducts.parts.length > 0) {
			return <PartResults parts={this.props.categoryProducts.parts} />;
		}

		let res;
		res = <CategoryParts catID={this.props.category.id} />;
		if (brand.id === 4) {
			res = <LvCategoryParts catID={this.props.category.id}/>;
		}

		return (
			<div>
				{ res }
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
