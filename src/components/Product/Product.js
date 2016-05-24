import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import cx from 'classnames';
import s from './Product.scss';
import Upsell from './Upsell';
import PartActions from '../../actions/PartActions';
import PartStore from '../../stores/PartStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Product extends Component {

	static propTypes = {
		part: PropTypes.object,
		category: PropTypes.object,
		className: PropTypes.string,
		context: PropTypes.shape({
			id: PropTypes.string,
			part: PropTypes.object,
		}),
		carouselIndex: PropTypes.number,
		carouselDirection: PropTypes.string,
		featured: PropTypes.array,
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
		const title = this.props.part.short_description && this.props.part.short_description ? this.props.part.short_description : 'Part Details';
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		if (!this.props.part || this.props.part.part_number !== this.props.context.id) {
			PartActions.get(this.props.context.id);
		}
		// desc
		let description = 'Part';
		this.props.part.content.map((con) => {
			if (con.contentType.type.toLowerCase() === 'marketingdescription') {
				description = con.text;
			}
		});
		// image
		let image = {};
		this.props.part.images.map((i) => {
			if ((i.height < image.height || !image.height) && i.sort === 'a') {
				image = i;
			}
		});
		const seo = {
			title,
			description,
			image: `${image.path.Scheme}://${image.path.Host}${image.path.Path}`,
		};
		this.context.seo(seo);
	}

	static getStores() {
		return [PartStore];
	}

	static getPropsFromStores() {
		return PartStore.getState();
	}

	setActiveImage(e) {
		PartActions.setCarouselIndex(e);
	}

	shadowbox(vid) {
		PartActions.setVideo(vid);
		window.addEventListener('wheel', this.noScroll);
	}

	noScroll(e) {
		e.preventDefault();
	}

	handleSelect(e) {
		PartActions.setCarouselIndex(e);
	}

	handleModalClose() {
		window.removeEventListener('wheel', this.noScroll);
		PartActions.setVideo(null);
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

	renderCrumbs() {
		const links = [];
		if (!this.props.part.categories || this.props.part.categories.length === 0) {
			return links;
		}

		this.props.part.categories.slice().reverse().map((cat, i) => {
			links.push(
				<li key={`breadcrumb${i}`}>
					<a href={`/category/${cat.id}`}>{ cat.title }</a>
				</li>
			);
		});

		return (
			<div className="breadcrumbs">
				<ol className={cx(s.breadcrumb, 'breadcrumb')}>
					{links}
					<li className={s.active}>Part #{ this.props.part.part_number}</li>
				</ol>
			</div>
		);
	}

	renderInstallButtons() {
		let iSheet;
		let iVideo;
		if (this.props.part.install_sheet && this.props.part.install_sheet.Path !== '') {
			const l = this.props.part.install_sheet;
			iSheet = (
				<div className={cx(s.installSheet, 'pull-left')}>
					<a href={`${l.Scheme}://${l.Host}${l.Path}`} target="_blank">
						<span className="glyphicon glyphicon-wrench"></span>
						Install Sheet
					</a>
				</div>
			);
		}

		if (this.props.part.video) {
			for (let i = this.props.part.videos.length - 1; i >= 0; i--) {
				const vid = this.props.part.videos[i];
				if (vid.Type === 'Installation Video') {
					iVideo = (
						<div className={cx(s.installSheet, 'pull-left')}>
							<a onClick="openInstallVideo()" aria-controls="Installation Videos" role="button" data-toggle="tab">
								<span className="glyphicon glyphicon-play"></span>
								Install Video
							</a>
						</div>
					);
				}
			}
		}

		return (
			<div className={cx(s.installContainer, 'col-lg-8')}>
				{/* Install Sheet */}
				{iSheet}

				{/* Install Video */}
				{iVideo}

				{/* Where To Buy */}
				<div className={cx(s.installSheet, 'pull-left')}>
					<a href="/buy" role="button">
						<span className="glyphicon glyphicon-usd"></span>
						Where To Buy
					</a>
				</div>
			</div>
		);
	}

	renderActions() {
		let price;
		for (let i = this.props.part.pricing.length - 1; i >= 0; i--) {
			const pr = this.props.part.pricing[i];
			if (pr.type === 'List' && pr.price > 0) {
				price = (
					<span>MSRP ${ pr.price }</span>
				);
			}
		}
		return (
			<div className={s.actions}>
				<div className={cx(s.linkContainer, 'col-xs-4', 'col-sm-4', 'col-md-4', 'col-lg-4')}>
					<div className={s.partNum}>
						<span>PART #{ this.props.part.part_number }</span>
					</div>
					<div>{price}</div>


					{/* Share Icons */}
					<div className={s.shareIcons}>
						<a href="#Facebook" title="Share us on Facebook" onClick={this.shareFacebook}>
							<img src="/img/facebook-icon.png" alt="Facebook" />
						</a>
						<a href="#Twitter" title="Tweet Us on Twitter" onClick={this.shareTwitter}>
							<img src="/img/twitter-icon.png" alt="Twitter" />
						</a>
						<a href="#GooglePlus" title="Share Us on Google Plus" onClick={this.shareGoogle}>
							<img src="/img/googleplus-icon.png" alt="Google Plus" />
						</a>
					</div>
				</div>

				{this.renderInstallButtons()}
				<div className="clearfix"></div>
			</div>
		);
	}

	renderContent() {
		if (!this.props.part.content || this.props.part.content.length === 0) {
			return (<div></div>);
		}
		let htmlDesc;
		let bulls = [];
		this.props.part.content.map((c, i) => {
			if (c.contentType.type === 'HTMLDescription') {
				htmlDesc = c.text;
				return;
			} else if (c.contentType.type === 'Bullet') {
				bulls.push(<li key={i}>{c.text}</li>);
			}
		});
		bulls = (
			<ul>{bulls}</ul>
		);
		return (
			<div className={s.content}>
				<div dangerouslySetInnerHTML={{ __html: htmlDesc }}></div>

				{bulls}
			</div>
		);
	}

	renderImages() {
		const items = [];
		let thumbs = [];
		const videoThumbs = [];
		let carouselIndex = 0;
		this.props.part.images.map((img) => {
			if (img.size !== 'Venti' || !img.path) {
				return;
			}

			const path = `${img.path.Scheme}://${img.path.Host}${img.path.Path}`;
			items.push(
				<CarouselItem key={`carousel-${carouselIndex}`}>
					<img src={path} />
				</CarouselItem>
			);
			thumbs.push(
				<li key={`thumb-${carouselIndex}`} className={s.thumb} onClick={this.setActiveImage.bind(this, carouselIndex)}>
					<img className="thumbImg img-responsive" src={path} />
				</li>
			);
			carouselIndex++;
		});

		this.props.part.videos.map((vid, i) => {
			videoThumbs.push(
				<li key={`video-${i}`} className={cx(s.thumb, s.videoThumb)} onClick={this.shadowbox.bind(this, vid)}>
					<div>
						{vid.thumbnail ? <img className="thumbImg img-responsive" src={vid.thumbnail} /> : null}
						<span className={s.arrow}>
							<span className={s.arrowRight}></span>
						</span>
					</div>
				</li>
			);
		});

		thumbs = (
			<ol className={s.thumbs}>
				{thumbs}
				{videoThumbs}
			</ol>
		);

		return (
			<div className={s.carousel}>
				<Carousel
					direction={this.props.carouselDirection}
					indicators={false}
					activeIndex={this.props.carouselIndex}
					onSelect={this.handleSelect}
				>
					{items}
				</Carousel>
				{thumbs}
			</div>
		);
	}

	renderTop() {
		return (
			<div className={cx(s.top, 'container')}>
				<div className={cx(s.leftSection, 'col-sm-12', 'col-xs-12', 'col-md-6')}>
					{this.renderCrumbs()}
					<h1>{ this.props.part.short_description }</h1>

					<div className="visible-xs visible-sm">
						{this.renderImages()}
					</div>

					{this.renderActions()}

					{this.renderContent()}
				</div>
				<div className={cx(s.rightSection, 'col-sm-12', 'col-xs-12', 'col-md-6', 'hidden-xs', 'hidden-sm')}>
					{this.renderImages()}
				</div>
			</div>
		);
	}

	renderApplications() {
		if (!this.props.part.vehicle_applications || this.props.part.vehicle_applications.length === 0) {
			return (<div></div>);
		}

		const apps = [];
		this.props.part.vehicle_applications.map((v, i) => {
			apps.push(
				<tr key={`application-${i}`}>
					<td className="year">{ v.year }</td>
					<td className="make">{ v.make }</td>
					<td className="model">{ v.model }</td>
					<td className="style">{ v.style }</td>
				</tr>
			);
		});

		return (
			<div
				className={cx(
					s.applications,
					'col-xs-12',
					'col-sm-12',
					'col-md-12',
					'col-lg-12'
				)}
			>
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

	renderRelated() {
		const parts = [];
		const header = (<h3>YOU MAY ALSO LIKE</h3>);
		const rel = this.props.part.related.slice(0, 4);
		rel.map((r, i) => {
			let image;
			if (!r.images) {
				return;
			}
			r.images.map((img) => {
				if (img.sort === 'a' && img.size === 'Grande') {
					image = `${img.path.Scheme}://${img.path.Host}${img.path.Path}`;
				}
			});
			parts.push(
				<div key={`related-${i}`} className={cx(s.featuredProd, 'col-xs-12', 'col-md-3', 'col-5')}>
					<h4>
						<a href={`/part/${r.part_number}`}>
							{r.short_description}
						</a>
					</h4>
					<a href={`/part/${r.part_number}`}>
						<img src={image} className="img-responsive" alt={`Image for ${r.title}`} />
					</a>
					<hr className="visible-xs-block" />
				</div>
			);
		});
		return (
			<div className={s.upsell}>
				{parts.length ? header : null}
				<div>
					{parts}
				</div>
			</div>
		);
	}

	renderFeatured() {
		const parts = [];
		const header = (<h3>YOU MAY ALSO LIKE (featured)</h3>);
		const rel = this.props.featured.slice(0, 4);

		rel.map((r, i) => {
			let image;
			r.images.map((img) => {
				if (!r.images) {
					return;
				}
				if (img.sort === 'a' && img.size === 'Grande') {
					image = `${img.path.Scheme}://${img.path.Host}${img.path.Path}`;
				}
			});
			parts.push(
				<div key={`featured${i}`} className={cx(s.featuredProd, 'col-xs-12', 'col-md-3', 'col-5')}>
					<h4>
						<a href={`/part/${r.part_number}`}>
							{r.short_description}
						</a>
					</h4>
					<a href={`/part/${r.part_number}`}>
						<img src={image} className="img-responsive" alt={`Image for ${r.title}`} />
					</a>
					<hr className="visible-xs-block" />
				</div>
			);
		});
		return (
			<div className={s.upsell}>
				{parts.length ? header : null}
				<div>
					{parts}
					<Upsell parts={parts} />
				</div>
			</div>
		);
	}

	renderBottom() {
		let catBrief = '';
		this.props.part.content.map((c) => {
			if (c.contentType.type === 'CategoryBrief') {
				catBrief = c.text;
				return;
			}
		});

		const details = [];
		this.props.part.attributes.map((attr, i) => {
			if (!attr.name || !attr.value) {
				return;
			}
			details.push(
				<div className="row" key={`details-${i}`}>
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<span className={s.field}>{ attr.name }</span>
					</div>
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<span className={s.value}>{ attr.value }</span>
					</div>
				</div>
			);
		});

		let upsell;
		if (this.props.part.related && this.props.part.related.length > 0) {
			upsell = this.renderRelated();
		} else {
			upsell = this.renderFeatured();
		}

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
					{upsell}
				</div>
			</div>
		);
	}

	renderPart() {
		if (!this.props.part || !this.props.part.id) {
			return (<h3 className={s.loading}>Loading part...</h3>);
		}

		return (
			<div>
				{this.renderTop()}
				{this.renderBottom()}
			</div>
		);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)} role="navigation">
				{this.props.video ? this.renderVideo() : this.renderPart()}
			</div>
		);
	}

}

export default Product;
