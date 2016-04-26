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
	};

	constructor() {
		super();
		this.pagination = this.pagination.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.scrollTo = this.scrollTo.bind(this);
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
		const page = 1;
		SearchActions.search(this.props.term, page, this.props.searchResult);
	}

	showParts() {
		const parts = [];
		for (let i = 0; i < this.props.searchResult.hits.hits.length; i++) {
			parts.push(this.props.searchResult.hits.hits[i]._source);
		}

		return <PartResults parts={parts} />;
	}

	took() {
		return parseFloat((this.props.searchResult.took * 0.001).toFixed(4));
	}

	pagination() {
		const res = this.props.searchResult;
		if (res.hits.hits.length > 0 && res.hits.hits.length < res.hits.total) {
			return (
				<a href="#" className={s.pagination} onClick={this.loadMore}>
					<span>Load more</span>
				</a>
			);
		}
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
					<span className="small">1 - {this.props.searchResult.hits.hits.length} of {this.props.searchResult.hits.total} results for "<em>{this.props.term}</em>" returned in {this.took()} seconds</span>
				</h2>

				<div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
					{/* Products */}
					{this.showParts()}
				</div>

				{/* Pagination */}
				<div className="clearfix"></div>
				{this.pagination()}
				{this.renderScrollTo()}
			</div>
		);
	}

}

export default SearchResults;
