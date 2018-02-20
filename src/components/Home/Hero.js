import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import cx from 'classnames';
import s from './Hero.scss';
import withStyles from '../../decorators/withStyles';

const carouselImages = [
	{
		image: 'https://storage.googleapis.com/aries-website/hero-images/new/Switchback-Banner.jpg',
		text: 'Innovative Step-within-a-Step™.',
		button_text: 'View ActionTrac™ Powered Running Boards',
		link: '/category/467/ActionTrack%20Powered%20Running%20Boards',
		external: false,
		order: 1,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/Current-Site---Header-Image.jpg)',
		},
	},
	{
		image: 'https://storage.googleapis.com/aries-website/hero-images/new/Switchback-Banner.jpg',
		text: 'Aggressive Style. All Aluminum.',
		button_text: 'View Switchback™',
		link: '/category/432/Switchback%20Headache%20Racks',
		external: false,
		order: 2,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/new/Switchback-Banner.jpg)',
		},
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/new/TrailChaser-Banner.jpg',
		text: '24 Configurations. Front and Rear Options.',
		button_text: 'View TrailChaser™',
		link: '/category/397/Jeep%20TrailChaser%20Bumpers',
		external: false,
		order: 3,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/new/TrailChaser-Banner.jpg)',
		},
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/new/Tire-Carrier-Banner.jpg',
		text: 'Tires up to 37”. Fully Adjustable.',
		button_text: 'View HD Tire Carrier',
		link: '/category/400/Jeep%20Tire%20Carriers',
		external: false,
		order: 4,
		styles: {
			backgroundImage: 'url(https://storage.googleapis.com/aries-website/hero-images/new/Tire-Carrier-Banner.jpg)',
		},
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/new/TeamARIES-Banner.jpg',
		text: 'Find Out What It Means to Be a Pro.',
		button_text: 'Join Team ARIES',
		link: 'https://www.teamaries.com/',
		external: true,
		order: 5,
		styles: {
			backgroundImage: `url('https://storage.googleapis.com/aries-website/hero-images/new/TeamARIES-Banner.jpg')`,
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
								<a className="white-transparent-button" href={img.link} target={(img.external ? '_blank' : '_self')}>{img.button_text}</a>
							</div>
						</CarouselItem>
					);
				})}
			</Carousel>
		);
	}

}

export default Hero;
