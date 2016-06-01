import React, { Component, PropTypes } from 'react';
import s from './Footer.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Footer extends Component {

	static propTypes = {
		siteContents: PropTypes.array,
	}

	getYear() {
		return new Date().getFullYear();
	}

	renderFooterNav() {
		const customContent = [];
		if (this.props.siteContents && this.props.siteContents.length > 0) {
			this.props.siteContents.map((content, i) => {
				const path = `/page/${content.id}`;
				if (content.title) {
					customContent.push(<li key={i}><a href={path} title={content.title}>{content.title.toUpperCase()}</a></li>);
				}
			});
		}
		return (
			<ul className={cx(s.nav, 'nav')}>
				<li><a href="/about" title="About Us">ABOUT</a></li>
				<li><a href="/appguides" title="Application Guides">APPLICATION GUIDES</a></li>
				<li><a href="/becomedealer" title="Become a Dealer">BECOME A DEALER</a></li>
				<li><a href="/buy" title="Where To Buy">WHERE TO BUY</a></li>
				<li><a href="http://orders.ariesautomotive.com/" title="COMNET">COMNET</a></li>
				<li><a href="/news" title="Latest News">LATEST NEWS</a></li>
				<li><a href="/techsupport" title="Technical Support">TECH SUPPORT</a></li>
				<li><a href="/warranties" title="Online Warranties">ONLINE WARRANTIES</a></li>
				<li><a href="/contact" title="Contact Us">CONTACT</a></li>
				{customContent}
			</ul>
			);
	}

	render() {
		const styles = {
			background: "url('/img/footerBackground.png')",
		};
		return (
			<footer>
				<div className={cx(s.root, 'row', 'footer-outer-row')} style={styles}>
					<div className={cx('container', s.container)}>
						<div className={cx('col-xs-12', 'col-sm-3', 'col-md-3', 'col-lg-3')}>
							<h4>REACH US</h4>
							<address itemScope itemType="//schema.org/Organization">
								<div className={s.phoneNumber}>
									<img src="/img/phone.png" alt="phone image" />
									<span className={s.phone}>
										CALL
										<a itemProp="telephone" href="tel:+18888002743" title="Call Us (888) 800-2743">
											(888) 800-2743
										</a>
									</span>
								</div>
								<span itemProp="name" className={s.addressName}>ARIES Automotive</span>
								<div className={s.addressInfo} itemProp="address" itemScope itemType="//schema.org/PostalAddress">
									<span itemProp="streetAddress">6208 Industrial Drive</span>
									<br />
									<span itemProp="addressLocality">Eau Claire,</span>
									<span itemProp="addressRegion">WI</span>
									<span itemProp="postalCode">54701</span>
								</div>
							</address>
						</div>
						<div className={cx('col-xs-6', 'col-sm-3', 'col-md-2', 'col-lg-2', s.footerNav)}>
							{this.renderFooterNav()}
						</div>
						<div className="col-xs-6 col-sm-3 col-md-4 col-lg-3">
							<div className={cx('row', 'col-lg-10', 'col-md-10', 'col-xs-8', s.social)}>
								<h4 className="hidden-xs hidden-sm">GET THE LATEST</h4>
								<div className="col-xs-12 col-md-12 col-lg-12">
									<a href="https://www.facebook.com/pages/Aries-Automotive-Inc/113778149023" title="Visit us on Facebook">
										<img src="/img/facebook-icon.png" alt="Facebook Logo" />
									</a>
									<a href="https://twitter.com/ariesautomotive" title="Visit us on Twitter">
										<img src="/img/twitter-icon.png" alt="Twitter Logo" />
									</a>
									<a href="http://www.youtube.com/user/AriesAutomotive" title="Visit us on YouTube">
										<img src="/img/youtube-icon.png" alt="YouTube Logo" />
									</a>
								</div>
							</div>
							<div className="row col-lg-2 col-md-2 col-xs-4">
								<div className={s.semaLogo}>
									<a href="http://www.sema.org" title="SEMA Website">
										<img src="/img/sema-logo.png" width="64px" alt="SEMA Logo" />
									</a>
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-3 col-md-3 col-lg-4">
							<img src="https://storage.googleapis.com/aries-logo/ARIES%20Logo%20(1c_red%20on%20transparent).svg" alt="Aries Automotive" className={cx('img-responsive', s.footerLogo)} />
							<div className="clearfix">&nbsp;</div>
							<br />
							<span className={s.conditions}>&copy; 1997 - {this.getYear()} ARIES AUTOMOTIVE <a href="/terms" className={s.terms}>TERMS & CONDITIONS</a></span>
						</div>
					</div>
				</div>
			</footer>
		);
	}

}

export default Footer;
