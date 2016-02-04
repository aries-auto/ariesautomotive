import React, { Component, PropTypes } from 'react';
import s from './Header.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';
import TopNav from '../TopNav';

@withStyles(s)
class Header extends Component {

    static propTypes = {
        categories: PropTypes.array,
    };

    render() {
        return (
            <div className={s.root}>
                <TopNav />
                <div className={s.container}>
                    <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12 navbar-header">
                        <button type="button" className={cx('navbar-toggle', 'collapsed', s.collapse)} data-toggle="collapse" data-target="#categoryMenu" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className={cx(s.brand, 'navbar-brand')} to="/">
                            <img src="https://storage.googleapis.com/aries-logo/SVG_Logo%20(2c_white%20with%20black%20outline%20on%20transparent).svg" alt="ARIES Automotive Logo" className="logo" />
                        </Link>
                    </div>
                    <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                        <Navigation categories={this.props.categories} className={s.nav} />
                    </div>
                    <div className={cx(s.phoneNum, 'col-md-2', 'col-lg-2', 'visible-md', 'visible-lg')}>
                        <a className={s.callLink} href="tel:+18888002743">Call Us: (888) 800-2743</a>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }

}

export default Header;
