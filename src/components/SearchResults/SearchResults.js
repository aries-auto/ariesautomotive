import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import PartResults from '../PartResults';
import s from './SearchResults.scss';
import withStyles from '../../decorators/withStyles';
import SearchStore from '../../stores/SearchStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import { brand } from '../../config';

@withStyles(s)
@connectToStores
class SearchResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.object,
		searchResults: PropTypes.object,
		searchTerm: PropTypes.string,
		page: PropTypes.number,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.pagination = this.pagination.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.scrollTo = this.scrollTo.bind(this);
		this.hits = 0;
		this.total = 0;
	}

	componentWillMount() {
		const title = this.props.searchTerm ? `Search: ${this.props.searchTerm}` : `Search ${brand.name}`;
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		if (!this.props.searchResults) {
			this.hits = 0;
			this.total = 0;
		} else if (this.props.searchResults.hits && this.props.searchResults.hits.hits) {
			this.hits = this.props.searchResults.hits.hits.length;
			this.total = this.props.searchResults.hits.total;
		}
		const seo = {
			title,
		};
		this.context.seo(seo);
	}

	static getStores() {
		return [SearchStore];
	}

	static getPropsFromStores() {
		return SearchStore.getState();
	}

	scrollTo() {
		this.refs.header.scrollIntoView();
	}

	loadMore(e) {
		e.preventDefault();
		SearchStore.fetchSearchResults(this.props.searchTerm, this.props.page + 1);
	}

	took() {
		if (!this.props.searchResults) {
			return '.0140';
		}
		return parseFloat(((this.props.searchResults.took || 1) * 0.001).toFixed(4));
	}

	pagination() {
		if (!this.props.searchResults || !this.props.searchResults.hits || !this.props.searchResults.hits.hits) {
			return null;
		}
		const res = this.props.searchResults;
		if (res.hits.hits.length > 0 && res.hits.hits.length < res.hits.total) {
			return (
				<a href="#" className={s.pagination} onClick={this.loadMore}>
					<span>Load more</span>
				</a>
			);
		}
	}

	renderParts() {
		const searchResults = true;
		if (!this.props.searchResults || !this.props.searchResults.hits || !this.props.searchResults.hits.hits) {
			return null;
		}
		const parts = [];
		for (let i = 0; i < this.props.searchResults.hits.hits.length; i++) {
			if (this.props.searchResults.hits.hits[i]._type === 'category') {
				continue;
			}
			parts.push(this.props.searchResults.hits.hits[i]._source);
		}

		return <PartResults parts={parts} searchResults={searchResults} />;
	}

	renderScrollTo() {
		return (
			<div className={s.scrollTo} onClick={this.scrollTo}>
				<span>Top</span>
			</div>
		);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'container')} role="navigation">
				<h2 id="catTitleProds" ref="header">
					SEARCH RESULTS
					<span className="small">1 - {this.props.searchResults.hits.hits.length} of {this.total} results for "<em>{this.props.searchTerm}</em>" returned in {this.took()} seconds</span>
				</h2>

				<div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
					{this.renderParts()}
				</div>

				<div className="clearfix"></div>
				{this.pagination()}
				{this.renderScrollTo()}
			</div>
		);
	}

}

export default SearchResults;
