import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import PartResults from '../PartResults';
import s from './SearchResults.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class SearchResults extends Component {

    static propTypes = {
        className: PropTypes.string,
        context: PropTypes.shape({
            searchResult: PropTypes.object,
        }),
    };

    constructor() {
        super();
        this.state = {
            context: {},
        };
    }

    componentWillMount() {
        if (!this.props || !this.props.context || !this.props.context.searchResult) {
            return;
        }

        this.setState({
            context: this.props.context,
        });
    }

    scrollTo(str) {
        return str;
    }

    loadMore() {

    }

    showParts() {
        if (this.state.context.searchResult.hits.hits.length > 0) {
            return <PartResults parts={this.state.context.searchResult.hits.hits} className="search-part-box" />;
        }
    }

    took() {
        return parseFloat((this.state.context.searchResult.took * 0.001).toFixed(4));
    }

    pagination() {
        const res = this.state.context.searchResult;
        if (res.hits.hits.length > 0 && res.hits.hits < res.hits.total) {
            return (
                <a href="#" className="pagination" onClick={this.loadMore()}>
                    <span>Load more</span>
                </a>
            );
        }
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className, 'container')} role="navigation">
                <h2 id="catTitleProds">
					SEARCH RESULTS
					<span className="small">1 - {this.state.context.searchResult.hits.hits.length} of {this.state.context.searchResult.hits.total} results for "<em>{this.state.term}</em>" returned in {this.took()} seconds</span>
				</h2>

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

}

export default SearchResults;
