import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import cx from 'classnames';
import s from './Images.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Product extends Component {

	static propTypes = {
		images: PropTypes.array,
		videos: PropTypes.array,
		className: PropTypes.string,
		carouselIndex: PropTypes.number,
		carouselDirection: PropTypes.string,
	};

	constructor() {
		super();
		this.setActiveImage = this.setActiveImage.bind(this);
		this.shadowbox = this.shadowbox.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
	}

	setActiveImage(e) {
		console.log(e);
		// PartActions.setCarouselIndex(e);
	}

	shadowbox(vid) {
		console.log('shadowbox', vid);
		// PartActions.setVideo(vid);
		window.addEventListener('wheel', (e) => e.preventDefault);
	}

	handleSelect(e) {
		console.log(e);
		// PartActions.setCarouselIndex(e);
	}

	handleModalClose() {
		window.removeEventListener('wheel', this.noScroll);
		// PartActions.setVideo(null);
	}

	renderCarousel() {
		const items = [];
		this.props.images.map((img, i) => {
			if (img.size !== 'Venti' || !img.path) {
				return;
			}

			const path = `${img.path.Scheme}://${img.path.Host}${img.path.Path}`;
			items.push(
				<CarouselItem key={i}>
					<img src={path} />
				</CarouselItem>
			);
		});
		return (
			<Carousel
				direction={this.props.carouselDirection}
				indicators={false}
			>
				{items}
			</Carousel>
		);
	}

	renderThumbnails() {
		const thumbs = [];
		(this.props.images || []).map((img, i) => {
			if (img.size !== 'Venti' || !img.path) {
				return;
			}

			const path = `${img.path.Scheme}://${img.path.Host}${img.path.Path}`;
			thumbs.push(
				<li key={i} className={s.thumb}>
					<img className="thumbImg img-responsive" src={path} />
				</li>
			);
		});

		(this.props.videos || []).map((vid, i) => {
			thumbs.push(
				<li key={i} className={cx(s.thumb, s.videoThumb)} onClick={this.shadowbox.bind(this, vid)}>
					<div>
						{vid.thumbnail ? <img className="thumbImg img-responsive" src={vid.thumbnail} /> : null}
						<span className={s.arrow}>
							<span className={s.arrowRight}></span>
						</span>
					</div>
				</li>
			);
		});
		return <ol className={s.thumbs}>{thumbs}</ol>;
	}

	render() {
		return (
			<div className={cx(s.carousel, this.props.className)}>
				{this.renderCarousel()}
				{this.renderThumbnails()}
			</div>
		);
	}
}

export default Product;
