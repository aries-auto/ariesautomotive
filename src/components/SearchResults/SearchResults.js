import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import PartResults from '../PartResults';
import s from './SearchResults.scss';
import withStyles from '../../decorators/withStyles';
import SearchActions from '../../actions/SearchActions';
import SearchStore from '../../stores/SearchStore';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class SearchResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.object,
		searchResult: PropTypes.object,
		term: PropTypes.string,
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
		const title = this.props.term ? `Search: ${this.props.term}` : 'Search ARIES';
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		if (this.props.searchResult.hits && this.props.searchResult.hits.hits) {
			this.hits = this.props.searchResult.hits.hits.length;
			this.total = this.props.searchResult.hits.total;
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
		SearchActions.search(this.props.term, this.props.page + 1, this.props.searchResult);
	}

	took() {
		if (!this.props.searchResult.took) {
			return '.0140';
		}
		return parseFloat((this.props.searchResult.took * 0.001).toFixed(4));
	}

	pagination() {
		if (!this.props.searchResult || !this.props.searchResult.hits || !this.props.searchResult.hits.hits) {
			return null;
		}
		const res = this.props.searchResult;
		if (res.hits.hits.length > 0 && res.hits.hits.length < res.hits.total) {
			return (
				<a href="#" className={s.pagination} onClick={this.loadMore}>
					<span>Load more</span>
				</a>
			);
		}
	}

	renderParts() {
		if (!this.props.searchResult || !this.props.searchResult.hits || !this.props.searchResult.hits.hits) {
			return null;
		}
		const parts = [];
		for (let i = 0; i < this.props.searchResult.hits.hits.length; i++) {
			if (this.props.searchResult.hits.hits[i]._type === 'category') {
				continue;
			}
			parts.push(this.props.searchResult.hits.hits[i]._source);
		}

		return <PartResults parts={parts} />;
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
					<span className="small">1 - {this.hits} of {this.total} results for "<em>{this.props.term}</em>" returned in {this.took()} seconds</span>
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
