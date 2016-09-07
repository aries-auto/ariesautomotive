import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Product.scss';
import FeaturedProducts from '../Home/FeaturedProducts';
import Content from './Content';
import Actions from './Actions';
import InstallButtons from './InstallButtons';
import Images from './Images';
import Info from './Info';
import Applications from './Applications';
import ShadowboxVideo from '../ShadowboxVideo';
import Breadcrumbs from './Breadcrumbs';
import ProductStore from '../../stores/ProductStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Product extends Component {

	static propTypes = {
		product: PropTypes.object.isRequired,
		className: PropTypes.string,
		featuredProducts: PropTypes.array,
		activeImageIndex: PropTypes.number,
		activeVideo: PropTypes.object,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	componentWillMount() {
		// title
		const title = this.props.product && this.props.product.short_description ? this.props.product.short_description : 'Part Details';
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		// desc
		let description = 'Part';
		if (this.props.product && this.props.product.content) {
			this.props.product.content.map((con) => {
				if (con.contentType && con.contentType.type && con.contentType.type.toLowerCase() === 'marketingdescription') {
					description = con.text;
				}
			});
		}
		// image
		let image = {};
		if (this.props.product && this.props.product.images) {
			this.props.product.images.map((i) => {
				if ((i.height < image.height || !image.height) && i.sort === 'a') {
					image = i;
				}
			});
		}

		const seo = {
			title,
			description,
			image: image.path ? `${image.path.Scheme}://${image.path.Host}${image.path.Path}` : '',
		};
		this.context.seo(seo);
	}

	static getStores() {
		return [ProductStore];
	}

	static getPropsFromStores() {
		return ProductStore.getState();
	}

	render() {
		if (!this.props.product || !this.props.product.id) {
			return <div></div>;
		}

		return (
			<div className={s.root}>
				<div className={cx(s.top, 'container')}>
					<div className={s.left}>
						<Breadcrumbs categories={this.props.product.categories} partNumber={this.props.product.part_number} />
						<h1>{this.props.product.short_description}</h1>
						<Images
							activeImageIndex={this.props.activeImageIndex}
							images={this.props.product.images}
							videos={this.props.product.videos} className={s.images}
						/>
						<Actions
							pricing={this.props.product.pricing}
							sku={this.props.product.part_number}
							upc={this.props.product.upc}
							className={s.actions}
						/>
						<InstallButtons
							installSheet={this.props.product.install_sheet}
							videos={this.props.product.videos}
						/>
						<Content content={this.props.product.content} />
					</div>

					<Images
						activeImageIndex={this.props.activeImageIndex}
						images={this.props.product.images}
						videos={this.props.product.videos} className={s.images}
					/>
				</div>
				<div className={cx(s.bottom, 'container-fluid')}>
					<Info attributes={this.props.product.attributes} content={this.props.product.content} />
					<Applications applications={this.props.product.vehicle_applications} />
					<FeaturedProducts
						products={(this.props.product.related.length) ? this.props.product.related : this.props.featuredProducts}
						className={s.upsell}
						title={(this.props.product.related.length) ? 'Related Products' : 'Featured Products'}
					/>
				</div>
				{(this.props.activeVideo) ? <ShadowboxVideo video={this.props.activeVideo} /> : null}
			</div>
		);
	}

}

export default Product;
