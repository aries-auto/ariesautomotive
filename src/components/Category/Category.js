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

    scrollTo(str) {
        return str;
    }

    loadMore() {

    }

    showParts() {
        console.log(this.state.context.category.parts.parts);
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

    render() {
        return (
            <div className={cx(s.root, this.props.className, 'container')} role="navigation">
                <h2 id="catTitleProds">
					{this.props.context.category.title}
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
