import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './TopNav.scss';
import SearchForm from '../SearchForm';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class TopNav extends Component {

    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        return (
            <div className={cx(s.root, this.props.className) + ' row'} role="navigation">
                <div className="hidden-sm hidden-xs col-lg-4 col-md-4">
                    <SearchForm />
                </div>
                <div className="hidden-sm hidden-xs col-lg-8 col-md-8">
                    <ul className="nav navbar-nav pull-right top-right-nav">
                        <li className="topNavItem"><a href="/buy" title="Where to Buy">WHERE TO BUY</a></li>
                        <li className="topNavItem"><a href="http://orders.ariesautomotive.com/" title="COMNET Login">COMNET LOGIN</a></li>
                        <li className="topNavItem"><a href="/becomedealer" title="Become a Dealer">BECOME A DEALER</a></li>
                        <li className="topNavItem"><a href="/about" title="About Us">ABOUT</a></li>
                        <li className="topNavItem"><a href="/techsupport" title="Technical Support">TECH SUPPORT</a></li>
                        <li className="topNavItem"><a href="/contact" title="Contact Us">CONTACT</a></li>
                    </ul>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }

}

export default TopNav;
