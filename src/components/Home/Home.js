import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Home.scss';
import Catalogs from './Catalogs';
import FeaturedProducts from './FeaturedProducts';
import Testimonials from './Testimonials';
import Hero from './Hero';
import Marketing from './Marketing';
import withStyles from '../../decorators/withStyles';
import ProductStore from '../../stores/ProductStore';
import SiteStore from '../../stores/SiteStore';
import { brand } from '../../config';
import connectToStores from 'alt-utils/lib/connectToStores';

const seo = {
	title: brand.name,
	description: 'Homepage: They change the rules, so we make up our own. They put up road blocks; we find a way around. They tell us there is no path ahead; we blaze a trail. At ARIES, we get revved up about going off the beaten path. From our Pro Series grille guards and modular Jeep bumpers to our StyleGuard™ floor liners and Seat Defenders, ARIES offers freedom of customization and a perfect fit for your vehicle. So whatever terrain you choose to conquer, do it with style and do it with ARIES.',
};

@withStyles(s)
@connectToStores
class Home extends Component {

	static propTypes = {
		className: PropTypes.string,
		featuredProducts: PropTypes.array,
		testimonials: PropTypes.array,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	componentWillMount() {
		this.context.onSetTitle(brand.name);
		this.context.onSetMeta('description', brand.description);
		this.context.seo(seo);
	}

	static getStores() {
		return [ProductStore, SiteStore];
	}

	static getPropsFromStores() {
		return {
			...ProductStore.getState(),
			...SiteStore.getState(),
		};
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'home-container')} role="navigation">

				<Hero />
				<Marketing />
				<Catalogs />
				<FeaturedProducts products={this.props.featuredProducts} />
				<Testimonials testimonials={this.props.testimonials} />

			</div>
		);
	}

}

export default Home;
