import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Home.scss';
// import ga from 'react-ga';
// import Catalogs from './Catalogs';
import FeaturedProducts from './FeaturedProducts';
import cookie from 'react-cookie';
import Testimonials from './Testimonials';
import Hero from './Hero';
import Marketing from './Marketing';
import withStyles from '../../decorators/withStyles';
import ProductStore from '../../stores/ProductStore';
import SiteStore from '../../stores/SiteStore';
import Modal from 'react-modal';
import { brand } from '../../config';
import connectToStores from 'alt-utils/lib/connectToStores';

const seo = {
	title: brand.name,
	description: brand.seoDesc,
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

	constructor(props) {
		super(props);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			modalStyles: {
				overlay: {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.75)',
					zIndex: '9999',
				},
				content: {
					top: '30%',
					left: '32%',
					right: 'auto',
					bottom: 'auto',
					padding: '0',
					transform: 'translate(-25%, -25%)',
					width: '70%',
					height: 'auto',
					borderRadius: '0',
					border: '0',
				},
			},
			modalIsOpen: false,
		};
	}

	componentWillMount() {
		this.context.onSetTitle(brand.name);
		this.context.onSetMeta('description', brand.description);
		this.context.seo(seo);
	}

	componentDidMount() {
		const cookieModal = cookie.load('modal');
		// delay and function call to open modal on page load.
		// let that = this;
		// setTimeout(function () {
		// 	that.openModal();
		// }, 1000);
		if (!cookieModal) {
			this.openModal();
		}
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

	openModal() {
		// ga.event({ category: 'Ariect:HP', action: 'Open Modal', label: 'ActionTrack' });
		this.setState({
			context: this.state.context,
			modalIsOpen: true,
		});
	}

	closeModal() {
		this.setState({
			context: this.state.context,
			modalIsOpen: false,
		});
		// once the modal is closed, set a cookie for 7 days
		// so the popup modal doesnt automatically open on the homepage again for 7 days
		cookie.save('modal', 'hide', { path: '/', maxAge: 604800 });
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'home-container')} role="navigation">
				{/* YouTube Modal */}
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={this.state.modalStyles}
				>
					<div className={s.videoWrapper}>
						<iframe className={s.modalIframe} src="https://www.youtube.com/embed/prkOqQtWvVw?rel=0&autoplay=1&mute=1" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
					</div>
				</Modal>
				<Hero />
				<Marketing />
				{/* <div className="container">
					<Catalogs />
				</div> */}
				<FeaturedProducts products={this.props.featuredProducts} />
				<Testimonials testimonials={this.props.testimonials} />

			</div>
		);
	}

}

export default Home;
