import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import cx from 'classnames';
import s from './Hero.scss';
import withStyles from '../../decorators/withStyles';

const carouselImages = [
	{
		image: 'https://storage.googleapis.com/aries-website/hero-images/Team_ARIES.jpg',
		text: 'Elite Pro Builders Join Team ARIES!',
		button_text: 'READ MORE',
		link: '/news/86',
		order: 4,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/Team_ARIES.jpg)',
		},
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/black-bull-bar.jpg',
		text: 'Never Fear the Uncertain Road',
		button_text: 'VIEW BULL BARS',
		link: '/category/342/AdvantEDGE%205.5%22%20Bull%20Bars',
		order: 5,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/black-bull-bar.jpg)',
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
		image: 'https://storage.googleapis.com/aries-website/hero-images/TrailerChaser_Bumpers.jpg',
		text: 'Ready to Customize. Ready for the Trail.',
		button_text: 'VIEW TRAILCHASER',
		link: '/category/397',
		order: 3,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/TrailerChaser_Bumpers.jpg)',
		},
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/AdvantEDGE_with_LEDs.jpg',
		text: 'Unique Design. All-Aluminum. Integrated LEDs.',
		button_text: 'VIEW ADVANTEDGE',
		link: '/category/342/',
		order: 1,
		styles: {
			backgroundImage: `url('https://storage.googleapis.com/aries-website/hero-images/AdvantEDGE_with_LEDs.jpg')`,
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
