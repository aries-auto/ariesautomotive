import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Vehicle.scss';
import SearchForm from '../SearchForm';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Vehicle extends Component {

    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        return (
            <div className={cx(s.root, this.props.className) + ' row'}>
                
            </div>
        );
    }

}

export default Vehicle;
