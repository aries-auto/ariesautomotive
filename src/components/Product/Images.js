import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import cx from 'classnames';
import s from './Images.scss';
import ProductActions from '../../actions/ProductActions';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Product extends Component {

	static propTypes = {
		images: PropTypes.array,
		videos: PropTypes.array,
		className: PropTypes.string,
		activeImageIndex: PropTypes.number,
	};

	setActiveImage(i) {
		ProductActions.setActiveImage(i);
	}

	setActiveVideo(i) {
		ProductActions.setActiveVideo(this.props.videos[i]);
	}

	renderCarousel() {
		const items = [];
		this.props.images.filter((img) => img.size === 'Venti' && img.path).map((img, i) => {
			items.push(
				<CarouselItem key={i}>
					<img src={`${img.path.Scheme}://${img.path.Host}${img.path.Path}`} />
				</CarouselItem>
			);
		});
		return (
			<Carousel
				indicators={false}
				activeIndex={this.props.activeImageIndex}
				bsClass={cx(s.carousel, 'carousel')}
			>
				{items}
			</Carousel>
		);
	}

	renderThumbnails() {
		const thumbs = [];
		(this.props.images || []).filter((img) => img.size === 'Tall' && img.path).map((img, i) => {
			thumbs.push(
				<li key={i} className={s.thumb} onClick={this.setActiveImage.bind(this, i)}>
					<img src={`${img.path.Scheme}://${img.path.Host}${img.path.Path}`} />
				</li>
			);
		});

		(this.props.videos || []).map((vid, i) => {
			thumbs.push(
				<li key={thumbs.length} className={cx(s.thumb, s.videoThumb)} onClick={this.setActiveVideo.bind(this, i)}>
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
