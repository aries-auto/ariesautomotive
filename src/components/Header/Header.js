import React, { Component, PropTypes } from 'react';
import s from './Header.scss';
// import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Navigation from '../Navigation';
// import Navigation from '../Navigation';
// import TopNav from '../TopNav';
// import MobileSearchForm from '../MobileSearchForm';

@withStyles(s)
class Header extends Component {

	static propTypes = {
		context: PropTypes.shape({
			insertCss: PropTypes.func,
			onSetTitle: PropTypes.func,
			onSetMeta: PropTypes.func,
			onPageNotFound: PropTypes.func,
			categories: PropTypes.array,
			vehicle: PropTypes.array,
			params: PropTypes.object,
			siteContents: PropTypes.array,
			siteMenu: PropTypes.array,
		}),
	};

	render() {
		return (
			<div className={s.header}>
				<Navigation
					menu={this.props.context.siteMenu || []}
					vehicle={this.props.context.vehicle}
					params={this.props.context.params}
				/>
			</div>
		);
	}

	// render() {
	// 	return (
	// 		<div className={s.root}>
	// 			<TopNav />
	// 			<div className={s.container}>
	// 				<div className={cx('navbar-header', s.navbarHeader)}>
	// 					<Link className={cx(s.brand, 'navbar-brand')} to="/">
	// 						<img src="https://storage.googleapis.com/aries-logo/SVG_Logo%20(2c_white%20with%20black%20outline%20on%20transparent).svg" alt="ARIES Automotive Logo" className="logo" />
	// 					</Link>
	//
	// 					<button
	// 						type="button"
	// 						className={cx('navbar-toggle', 'collapsed', s.collapse)}
	// 						data-toggle="collapse"
	// 						data-target="#categoryMenu"
	// 						aria-expanded="false"
	// 					>
	// 						<span className="sr-only">Toggle navigation</span>
	// 						<span className="icon-bar"></span>
	// 						<span className="icon-bar"></span>
	// 						<span className="icon-bar"></span>
	// 					</button>
	// 					<div className={cx('visible-xs', 'visible-sm', s.mobileContainer)}>
	// 						<MobileSearchForm />
	// 					</div>
	// 				</div>
	// 				<div className="col-md-8 col-lg-8 col-sm-12 col-xs-12">
	// 					<Navigation categories={this.props.categories} className={s.nav} />
	// 				</div>
	// 				<div className={cx(s.phoneNum, 'pull-right', 'visible-md', 'visible-lg')}>
	// 					<a className={s.callLink} href="tel:+18888002743">Call Us: (888) 800-2743</a>
	// 				</div>
	// 				<div className="clearfix"></div>
	// 			</div>
	// 		</div>
	// 	);
	// }

}

export default Header;
