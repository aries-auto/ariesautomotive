import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import cx from 'classnames';
import s from './Product.scss';
import PartActions from '../../actions/PartActions';
import PartStore from '../../stores/PartStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

const title = 'Part Details';
@withStyles(s)
@connectToStores
class Product extends Component {

	static propTypes = {
		part: PropTypes.object,
		category: PropTypes.object,
		className: PropTypes.string,
		context: PropTypes.shape({
			id: PropTypes.string,
		}),
		carouselIndex: PropTypes.number,
		carouselDirection: PropTypes.string,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
	};

	static defaultProps = {
		part: {},
		category: {},
		carouselIndex: 0,
		carouselDirection: 'next',
		title,
	};

	constructor(props) {
		super();

		PartActions.get(props.context.id);
	}

	componentWillMount() {
		this.context.onSetTitle(title);
	}

	static getStores() {
		return [PartStore];
	}

	static getPropsFromStores() {
		return PartStore.getState();
	}

	setActiveImage() {

	}

	shadowbox() {

	}

	openLightbox() {

	}

	renderCrumbs() {
		const links = [];
		if (!this.props.part.categories || this.props.part.categories.length === 0) {
			return links;
		}

		this.props.part.categories.slice().reverse().map((cat, i) => {
			links.push(
				<li key={i}>
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
					<a ng-href="/buy" aria-controls="Where to buy" role="button" data-toggle="tab">
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
		this.props.part.images.map((img, i) => {
			if (img.size !== 'Venti') {
				return;
			}

			const path = `${img.path.Scheme}://${img.path.Host}${img.path.Path}`;
			items.push(
				<CarouselItem key={i}>
					<img src={path} />
				</CarouselItem>
			);
			thumbs.push(
				<li className={s.thumb} onClick={this.setActiveImage(i)}>
					<img className="thumbImg img-responsive" src={path} />
				</li>
			);
		});

		this.props.part.videos.map((vid, i) => {
			videoThumbs.push(
				<li key={i} className={cx(s.thumb, s.videoThumb)} onClick={this.shadowbox(vid, 'video')}>
					<div>
						<img onClick={this.openLightbox(vid)} className="thumbImg img-responsive" src={vid.thumbnail} />
						<span className={s.arrow} onClick={this.openLightbox(vid)}>
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
					onSelect={this.handleSelect}
					indicators={false}
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

	renderPart() {
		if (!this.props.part || !this.props.part.id) {
			return (<div></div>);
		}

		return (
			this.renderTop()
		);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)} role="navigation">
				{this.renderPart()}
			</div>
		);
	}

}

export default Product;
