import React, { Component, PropTypes } from 'react';
import s from './About.scss';
import withStyles from '../../decorators/withStyles';

const title = 'About Us';

@withStyles(s)
class About extends Component {

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	componentWillMount() {
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		const seo = {
			title,
		};
		this.context.seo(seo);
	}

	getMission() {
		return (
			<div className={s.mission}>
				<div className="container">
					<h3>THE ARIES MISSION</h3>
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<p>
									We strive to provide the ultimate satisfaction
									for those looking to protect or enhance the
									image of their vehicle.  Through innovation,
									constant improvement, and not fearing change
									we look to continually raise the bar
									within our industry.
								</p>
							</div>
						</div>
						<hr />
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="col-xs-12 col-md-12 col-lg-12">
						<h1>ABOUT</h1>
						<h3 className={s.header}>
							CONTINUALLY RAISING THE BAR SINCE 1997
						</h3>
						<p>
							ARIES Automotive has been providing unparalleled
							aftermarket products with reliable service for
							18 years. We've grown year after year by
							producing the latest designs of automotive
							accessories in tubular steel, rubber and
							ABS plastic. We specialize in grille guards,
							bull bars and side bars, and our full line of
							Jeep accessories continues to expand with modular
							and tubular bumpers, tubular doors and more.
							We have also recently added two exciting new
							interior products: the ARIES Seat Defender and
							our 3D floor liners.
						</p>
						<p>
							In addition to our growing product line, we have
							increased our customer support by providing
							operations throughout North America. We now have
							facilities in Southern California, Texas, Georgia
							and Ontario, Canada. This enables us to meet
							the increasing demand for our products and
							allows for on-time delivery at competitive prices.
						</p>
					</div>
				</div>
				{this.getMission()}
				<div className="clearfix"></div>
			</div>
		);
	}

}

export default About;
