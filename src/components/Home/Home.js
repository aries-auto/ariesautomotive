import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Home.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Home extends Component {

    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        return (
            <div className={cx(s.root, this.props.className)} role="navigation"></div>
        );
    }

}

export default Home;
