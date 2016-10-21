import React, { Component, PropTypes } from 'react';
import s from './Actions.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Actions extends Component {

	static propTypes = {
		pricing: PropTypes.array,
		sku: PropTypes.string,
		upc: PropTypes.string,
	};

	render() {
		let price;
		(this.props.pricing || []).map((pr) => {
			if (pr.type.toLowerCase() === 'list' && pr.price > 0) {
				price = (
					<span>${ pr.price.toFixed(2) }</span>
				);
			}
		});

		return (
			<div className={s.root}>
				<div>{price}</div>
				<div>
					<span><strong>Part #</strong>{ this.props.sku }</span>
					<span>UPC: { this.props.upc }</span>
				</div>

				{/* Share Icons */}
				<div>
					<a href="#Facebook" title="Share us on Facebook" onClick={this.shareFacebook}>
						<img src="/img/facebook-icon.png" alt="Facebook" />
					</a>
					<a href="#Twitter" title="Tweet Us on Twitter" onClick={this.shareTwitter}>
						<img src="https://storage.googleapis.com/aries-website/site-assets/twitter-icon.png" alt="Twitter" />
					</a>
					<a href="#GooglePlus" title="Share Us on Google Plus" onClick={this.shareGoogle}>
						<img src="/img/googleplus-icon.png" alt="Google Plus" />
					</a>
				</div>
			</div>
		);
	}
}

export default Actions;
