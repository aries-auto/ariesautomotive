import React, { Component, PropTypes } from 'react';
import s from './Header.scss';
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
                    <div className="col-md-2 col-lg-2">
                        <Link className={s.brand} to="/">
                            <img src="https://storage.googleapis.com/aries-logo/SVG_Logo%20(2c_white%20with%20black%20outline%20on%20transparent).svg" alt="ARIES Automotive Logo" className="logo" />
                        </Link>
                    </div>
                    <div className="col-md-7 col-lg-7">
                        <Navigation categories={this.props.categories} className={s.nav} />
                    </div>
                    <div className="col-md-1 col-lg-1"></div>
                    <div className="col-md-2 col-lg-2">
                        Call Us: 1-888-888-8888
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }

}

export default Header;
