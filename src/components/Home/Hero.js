import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import cx from 'classnames';
import s from './Hero.scss';
import withStyles from '../../decorators/withStyles';

const carouselImages = [
	{
		image: 'http://storage.googleapis.com/aries-website/hero-images/jeep.png',
		text: 'Never Fear the Uncertain Road',
		button_text: 'VIEW BULL BARS',
		link: '/category/332',
		order: 5,
		styles: {
			backgroundImage: 'url(http://storage.googleapis.com/aries-website/hero-images/jeep.png)',
		},
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/GrandCherokee.png',
		text: 'Find Out What It Means to Be a Pro',
		button_text: 'VIEW PRO SERIES',
		link: '/category/331',
		order: 2,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/GrandCherokee.png)',
		},
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png',
		text: 'Choose Your Configuration and Start Customizing',
		button_text: 'VIEW MODULAR BUMPERS',
		link: '/category/324',
		order: 3,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png)',
		},
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/Floor%20Liner%20-%20Grey%20(1).jpg',
		text: 'ARIES Unveils StyleGuard™ as New Name for Floor Liners',
		button_text: 'READ MORE',
		link: '/news/47',
		order: 1,
		styles: {
			backgroundImage: `url('https://storage.googleapis.com/aries-website/hero-images/Floor%20Liner%20-%20Grey%20(1).jpg')`,
		},
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/navyjeep.jpg',
		text: 'Decked Out Jeep to Be Donated to Navy SEAL Foundation',
		button_text: 'READ MORE',
		link: '/news/48',
		order: 4,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/navyjeep.jpg)',
		},
	},
];

@withStyles(s)
class Hero extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	render() {
		return (
			<Carousel bsClass={cx(s.root, 'carousel')} indicators={false}>
				{carouselImages.map((img, i) => {
					return (
						<CarouselItem key={i}>
							<div className={cx(s.carouselImg)} style={img.styles}></div>
							<div className="carousel-caption">
								<span className={cx('big-text')}>{img.text}</span>
								<div className="clearfix"></div>
								<a className="white-transparent-button" href={img.link}>{img.button_text}</a>
							</div>
						</CarouselItem>
					);
				})}
			</Carousel>
		);
	}

}

export default Hero;
