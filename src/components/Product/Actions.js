import React, { Component, PropTypes } from 'react';
import s from './Actions.scss';
import withStyles from '../../decorators/withStyles';
import { brand } from '../../config';
import { ShareButtons, ShareCounts } from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
} = ShareButtons;
const {
  FacebookShareCount,
  GooglePlusShareCount,
} = ShareCounts;

@withStyles(s)
class Actions extends Component {

	static propTypes = {
		pricing: PropTypes.array,
		sku: PropTypes.string,
		upc: PropTypes.string,
		brand: PropTypes.object,
		primaryPic: PropTypes.string,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	render() {
		let price = <span></span>;
		(this.props.pricing || []).map((pr) => {
			if (pr.type.toLowerCase() === 'list' && pr.price > 0 && this.props.brand.pricing) {
				price = (
					<div><span>${ pr.price.toFixed(2) }</span></div>
				);
			}
		});
		const shareURL = brand.website + '/part/' + this.props.sku;
		const primaryPic = this.props.primaryPic ? this.props.primaryPic : brand.shareImage;
		const shareTitle = brand.code + ' Part #' + this.props.sku;
		const hashtags = [brand.code, brand.code + 'PRODUCTS']; // would be cool if it pulled hashtags from the product
		return (
			<div className={s.root}>
				{ price }
				<div>
					<span><strong>Part #</strong>{ this.props.sku }</span>
					<span>UPC: { this.props.upc }</span>
				</div>

				{/* Share Icons */}
				<div>
					<FacebookShareButton
						url={shareURL}
						title={shareTitle}
						picture={primaryPic}
						className={s.shareButton}
					>
						<img src="/img/facebook-icon.png" alt="Facebook" />
					</FacebookShareButton>

					<FacebookShareCount
						url={shareURL}
						className={s.sharecount}
					>
						{count => count}
					</FacebookShareCount>

					<TwitterShareButton
						url={shareURL}
						title={shareTitle}
						hashtags={hashtags}
						className={s.shareButton}
					>
						<img src="https://storage.googleapis.com/aries-website/site-assets/twitter-icon.png" alt="Twitter" />
					</TwitterShareButton>


					<GooglePlusShareButton
						url={shareURL}
						className={s.shareButton}
					>
						<img src="/img/googleplus-icon.png" alt="Google Plus" />
					</GooglePlusShareButton>

					<GooglePlusShareCount
						url={shareURL}
						className={s.sharecount}
					>
						{count => count}
					</GooglePlusShareCount>
				</div>
			</div>
		);
	}
}

export default Actions;
