import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Product.scss';
import withStyles from '../../decorators/withStyles';


@withStyles(s)
class Product extends Component {

    static propTypes = {
        className: PropTypes.string,
        part: PropTypes.object,
    };

    constructor() {
        super();
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className)} role="navigation">
                { this.props.part.short_description }
            </div>
        );
    }

}

export default Product;
