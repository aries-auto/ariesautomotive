import React, { Component, PropTypes } from 'react';
import s from './Footer.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import { brand } from '../../config';
import footer from '../../data/footer';
import SiteStore from '../../stores/SiteStore';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Footer extends Component {

	static propTypes = {
		contentMenus: PropTypes.array,
	}

	static getStores() {
		return [SiteStore];
	}

	static getPropsFromStores() {
		return SiteStore.getState();
	}

	getYear() {
		return new Date().getFullYear();
	}

	renderFooterNav() {
		const customContent = [];
		if (this.props.contentMenus && this.props.contentMenus.length > 0) {
			this.props.contentMenus.map((content, i) => {
				const path = `/page/${content.id}`;
				if (content.title && (content.requireAuthentication === undefined || content.requireAuthentication === false)) {
					customContent.push(<li key={i}><a href={path} title={content.title}>{content.title.toUpperCase()}</a></li>);
				}
			});
		}
		return (
			<ul className={cx(s.nav, 'nav')}>
				{footer.links.map((link, i) => {
					return (
						<li key={i} className={s.item}><a href={link.href} title={link.title}>{link.value}</a></li>
					);
				})}
				{customContent}
			</ul>
			);
	}

	render() {
		const styles = {
			background: "url('https://storage.googleapis.com/luverne/website/misc-images/footerBackground.png')",
		};
		return (
			<footer>
				<div className={cx(s.root, 'row', 'footer-outer-row')} style={styles}>
					<div className={cx('container', s.container)}>
						<div className={cx('col-xs-12', 'col-sm-3', 'col-md-3', 'col-lg-3')}>
							<h4>REACH US</h4>
							<address itemScope itemType="//schema.org/Organization">
								<div className={s.phoneNumber}>
									<img src="https://storage.googleapis.com/aries-website/site-assets/phone.png" alt="phone image" />
									<span className={s.phone}>
										CALL
										<a itemProp="telephone" href="tel:+18888002743" title="Call Us (888) 800-2743">
											(888) 800-2743
										</a>
									</span>
								</div>
								<span itemProp="name" className={s.addressName}>{brand.name}</span>
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
									<a href={brand.facebook.link} title="Visit us on Facebook">
										<img src="https://storage.googleapis.com/aries-website/site-assets/facebook-icon.png" alt="Facebook Logo" />
									</a>
									<a href={`https://twitter.com/${brand.twitter}`} title="Visit us on Twitter">
										<img src="https://storage.googleapis.com/aries-website/site-assets/twitter-icon.png" alt="Twitter Logo" />
									</a>
									<a href={`http://www.youtube.com/user/${brand.youtube}`} title="Visit us on YouTube">
										<img src="https://storage.googleapis.com/aries-website/site-assets/youtube-icon.png" alt="YouTube Logo" />
									</a>
								</div>
							</div>
							<div className="row col-lg-2 col-md-2 col-xs-4">
								<div className={s.semaLogo}>
									<a href="http://www.sema.org" title="SEMA Website">
										<img src="https://storage.googleapis.com/aries-website/site-assets/sema-logo.png" width="64px" alt="SEMA Logo" />
									</a>
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-3 col-md-3 col-lg-4">
							<img src={brand.footerLogo} alt={brand.name} className={cx('img-responsive', s.footerLogo)} />
							<div className="clearfix">&nbsp;</div>
							<br />
							<span className={s.conditions}>
								&copy;
								{brand.copyrightStart ? `${brand.copyrightStart} - ${this.getYear()}` : this.getYear()}
								{brand.name}
								<a href="/terms" className={s.terms}>TERMS & CONDITIONS</a>
							</span>
						</div>
					</div>
				</div>
			</footer>
		);
	}

}

export default Footer;
