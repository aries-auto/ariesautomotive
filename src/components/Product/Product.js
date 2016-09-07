import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Product.scss';
import FeaturedProducts from '../Home/FeaturedProducts';
import Content from './Content';
import Actions from './Actions';
import InstallButtons from './InstallButtons';
import Images from './Images';
import Breadcrumbs from './Breadcrumbs';
import ProductStore from '../../stores/ProductStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Product extends Component {

	static propTypes = {
		product: PropTypes.object,
		category: PropTypes.object,
		className: PropTypes.string,
		context: PropTypes.shape({
			id: PropTypes.string,
			part: PropTypes.object,
		}),
		carouselIndex: PropTypes.number,
		carouselDirection: PropTypes.string,
		featuredProducts: PropTypes.array,
		video: PropTypes.object,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	static defaultProps = {
		category: {},
		carouselIndex: 0,
		carouselDirection: 'next',
	};

	constructor() {
		super();
		this.setActiveImage = this.setActiveImage.bind(this);
		this.shadowbox = this.shadowbox.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.noScroll = this.noScroll.bind(this);
	}

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

	getCmpFunc(primer, reverse) {
		const dfc = this.defaultCmp; // closer in scope
		let cmp = this.defaultCmp;
		if (primer) {
			cmp = (a, b) => {
				return dfc(primer(a), primer(b));
			};
		}
		if (reverse) {
			return (a, b) => {
				return -1 * cmp(a, b);
			};
		}
		return cmp;
	}

	setActiveImage(e) {
		console.log(e);
		// PartActions.setCarouselIndex(e);
	}

	shadowbox(vid) {
		console.log(vid);
		// PartActions.setVideo(vid);
		window.addEventListener('wheel', this.noScroll);
	}

	defaultCmp(a, b) {
		if (a === b) {
			return 0;
		}
		return a < b ? -1 : 1;
	}

	sortBy() {
		const fields = [];
		const nFields = arguments.length;
		let field;
		let name;
		let cmp;

		// preprocess sorting options
		for (let i = 0; i < nFields; i++) {
			field = arguments[i];
			if (typeof field === 'string') {
				name = field;
				cmp = this.defaultCmp;
			} else {
				name = field.name;
				cmp = this.getCmpFunc(field.primer, field.reverse);
			}
			fields.push({
				name,
				cmp,
			});
		}

		// final comparison function
		return (A, B) => {
			let n;
			let result;
			for (let i = 0; i < nFields; i++) {
				result = 0;
				field = fields[i];
				n = field.name;

				result = field.cmp(A[n], B[n]);
				if (result !== 0) break;
			}
			return result;
		};
	}

	noScroll(e) {
		e.preventDefault();
	}

	handleSelect(e) {
		console.log(e);
		// PartActions.setCarouselIndex(e);
	}

	handleModalClose() {
		window.removeEventListener('wheel', this.noScroll);
		// PartActions.setVideo(null);
	}

	renderVideo() {
		if (!this.props.video) {
			return null;
		}
		const embedCode = () => { return { __html: this.props.video.channel[0].embed_code }; };
		return (
			<div className={s.shadow} onClick={this.handleModalClose}>
				<div className={s.shadowBackground}>
					{this.renderPart()}
				</div>
				<div className={s.videoModal} dangerouslySetInnerHTML={embedCode()}></div>
			</div>
		);
	}

	renderApplications() {
		if (!this.props.product.vehicle_applications || this.props.product.vehicle_applications.length === 0) {
			return (<div></div>);
		}

		const apps = [];
		this.props.product.vehicle_applications.sort(
			this.sortBy(
				{ name: 'year', primer: parseInt, reverse: true },
				'make',
				'model',
				'style',
			),
		);
		this.props.product.vehicle_applications.map((v, i) => {
			apps.push(
				<tr key={i}>
					<td className="year">{ v.year }</td>
					<td className="make">{ v.make }</td>
					<td className="model">{ v.model }</td>
					<td className="style">{ v.style }</td>
				</tr>
			);
		});

		return (
			<div className={cx(s.applications, 'container')}>
				<h3>Application</h3>
				<p>Check out our Application Guides to see what fits your vehicle.</p>
				<div className={s.vehicle}>
					<table className={cx(s.responsiveTable, s.applicationsTbl)}>
						<thead>
							<tr>
								<th>Year</th>
								<th>Make</th>
								<th>Model</th>
								<th>Style</th>
							</tr>
						</thead>
						<tbody>
							{ apps }
						</tbody>
					</table>
				</div>
				<a href="/appguides" className={s.appguideLink}>
					VIEW APPLICATION GUIDES
				</a>
			</div>
		);
	}

	renderBottom() {
		let catBrief = '';
		this.props.product.content.map((c) => {
			if (c.contentType.type === 'CategoryBrief') {
				catBrief = c.text;
				return;
			}
		});

		const details = [];
		this.props.product.attributes.map((attr, i) => {
			if (!attr.name || !attr.value) {
				return;
			}
			details.push(
				<div className="row" key={i}>
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<span className={s.field}>{ attr.name }</span>
					</div>
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<span className={s.value}>{ attr.value }</span>
					</div>
				</div>
			);
		});

		return (
			<div className={cx(s.bottom, 'container-fluid')}>
				<div className="container">
					<div className={cx(s.more, 'col-xs-12', 'col-sm-12', 'col-md-7', 'col-lg-7')}>
						{catBrief ? <h3>More Details</h3> : null}
						<div dangerouslySetInnerHTML={{ __html: catBrief }}></div>
					</div>

					<div className={cx(s.attributes, 'col-xs-12', 'col-sm-12', 'col-md-4', 'col-lg-4', 'col-lg-offset-1', 'col-md-offset-1')}>
						{details.length ? <h3>Technical Details</h3> : null}
						{details}
					</div>

					<div className="clearfix"></div>

					{this.renderApplications()}
					<FeaturedProducts
						products={this.props.product.related.length || this.props.featuredProducts}
						className={cx(s.upsell, 'container')}
						title={(this.props.product.related.length) ? 'Related Products' : 'Featured Products'}
					/>
				</div>
			</div>
		);
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
						<Content content={this.props.product.content || []} />
					</div>

					<Images images={this.props.product.images} video={this.props.product.videos} className={s.images} />
				</div>
				<div className={cx(s.bottom, 'container-fluid')}>
					<FeaturedProducts
						products={this.props.product.related.length || this.props.featuredProducts}
						className={s.upsell}
						title={(this.props.product.related.length) ? 'Related Products' : 'Featured Products'}
					/>
				</div>
			</div>
		);
	}

}

export default Product;
