import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Product.scss';
import withStyles from '../../decorators/withStyles';
// import Link from '../Link';


@withStyles(s)
class Product extends Component {

    static propTypes = {
        className: PropTypes.string,
        part: PropTypes.object,
    };

    render() {
        const part = {
            short_description: 'Some Part',
        };

        return (
            <div className={cx(s.root, this.props.className)} role="navigation">
                { part.short_description }
            </div>
        );
    }

}

export default Product;
