import React, { Component, PropTypes } from 'react';
import ga from 'react-ga';
import Link from '../Link';
import { Carousel, CarouselItem } from 'react-bootstrap';
import Modal from 'react-modal';
import cx from 'classnames';
import s from './Home.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Home extends Component {

	static propTypes = {
		className: PropTypes.string,
		carouselImages: PropTypes.array,
		featuredProducts: PropTypes.array,
		context: PropTypes.shape({
			carouselImages: PropTypes.array,
			featuredProducts: PropTypes.array,
		}),
	};

	constructor() {
		super();
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			context: {
				carouselImages: [],
				featuredProducts: [],
			},
			catalogs: [
				{
					title: '2016 Exterior Catalog',
					image: 'https://storage.googleapis.com/aries-website/ARIES-Exterior-Cover.png',
					link: 'https://storage.googleapis.com/aries-website/2016-Exterior-Catalog.pdf',
				}, {
					title: '2016 Interior Catalog',
					image: 'https://storage.googleapis.com/aries-website/ARIES-Interior-Cover.png',
					link: 'https://storage.googleapis.com/aries-website/2016-Interior-Catalog.pdf',
				}, {
					title: '2016 Jeep Catalog',
					image: 'https://storage.googleapis.com/aries-website/ARIES-Jeep-Cover.png',
					link: 'https://storage.googleapis.com/aries-website/_2016%20ARIES%20Jeep%20Catalog-SFS.pdf',
				},
			],
		};
	}

	componentWillMount() {
		if (!this.props || !this.props.context) {
			return;
		}
		this.setState({
			context: this.props.context,
			modalStyles: {
				overlay: {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.75)',
					zIndex: '40',
				},
				content: {
					top: '30%',
					left: '30%',
					right: 'auto',
					bottom: 'auto',
					padding: '0',
					transform: 'translate(-25%, -25%)',
					width: '80%',
					height: '80%',
					borderRadius: '0',
					border: '0',
				},
			},
			modalIsOpen: false,
		});
	}

	getFeaturedImage(prod) {
		if (!prod.images) {
			return '';
		}
		let url;
		prod.images.map((img) => {
			if (img.sort === 'a' && img.size === 'Grande') {
				url = `${img.path.Scheme}://${img.path.Host}${img.path.Path}`;
			}
		});
		return url;
	}

	getCatalogs() {
		if (!this.state.catalogs || this.state.catalogs.length === 0) {
			return (
				<div></div>
			);
		}

		const output = [];
		this.state.catalogs.map((cat, i) => {
			output.push(
				<div key={i} className={cx('col-xs-12', 'col-sm-4', 'col-md-4', 'col-lg-4', s.catalog)}>
					<img src={ cat.image } alt={ cat.title } />
					<div>
						<h3>{ cat.title }</h3>
						<Link to={ cat.link }
							className={cx(
								'red-transparent-button'
							)}
							title={'Download' + cat.title }
						>
							Download
						</Link>
					</div>
				</div>
			);
		});

		return (
			<div className={cx(s.container, 'container', s.catalogs)}>{ output }</div>
		);
	}

	openModal() {
		ga.event({ category: 'Ariect:HP', action: 'Open Modal', label: 'StyleGaurd' });
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
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'home-container')} role="navigation">

				{/* Carousel */}
				<Carousel>
					{this.state.context.carouselImages.map((img, i) => {
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

				{/* Marketing Mess */}
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-lg-6">
							<h1>DO IT WITH STYLE. DO IT WITH ARIES</h1>
							<p>
								They change the rules, so we make up our own. They put up road blocks; we find a way around. They tell us there is no path ahead; we blaze a trail. At ARIES, we get revved up about going off the beaten path. From our Pro Series grille guards and modular
								Jeep bumpers to our StyleGuard&trade; floor liners and Seat Defenders, ARIES offers freedom of customization and a perfect fit for your vehicle. So whatever terrain you choose to conquer, do it with style and do it with ARIES.
							</p>
							<div className={cx(s.ytWrapper)}>
								<iframe allowFullScreen="" frameBorder="0" height="315" src="//www.youtube.com/embed/M7k7rhOtMY4?rel=0" width="420"></iframe>
							</div>
							<div className={cx(s.ytWrapper)}>
								<iframe allowFullScreen="" frameBorder="0" height="315" src="//www.youtube.com/embed/LDQEbHqWjfo?rel=0" width="420"></iframe>
							</div>
						</div>
						<div className="col-md-6 col-lg-6">

							<div onClick={this.openModal} className={cx(s.whatsNew, s.styleguard, 'row')}>
								<img src="https://storage.googleapis.com/aries-website/whatsnew/What's-New-Banner.png" alt="What's New with ARIES" className={cx(s.header)} />
								<div className={cx(s.callout)}>
									<img src="https://storage.googleapis.com/aries-website/whatsnew/ARIES-Floor-Liner-Artistic-Black%20(20).jpg" alt=" Introducing StyleGuard Floor Liners" className="styleguard" />
									<span>Introducing StyleGuard&trade; Floor Liners</span>
								</div>
							</div>

							<div className={cx(s.whatsNew, s.envision, 'row')}>
								<a href="/envision">
									<img src="https://storage.googleapis.com/aries-website/whatsnew/Envision-Website-Graphic.png" alt="Envision ARIES" />
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Catalogs */}
				{this.getCatalogs()}

				{/* Featured Products */}
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>FEATURED PRODUCTS</h3>
							<div className={cx(s.featuredProducts, 'col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12')}>
								{this.state.context.featuredProducts.map((prod, i) => {
									return (
										<div key={i} className={cx(s.featuredProd, s.col5, 'col-xs-12', 'col-md-2')}>
											<h4><a href={'/part/' + prod.part_number}>{prod.short_description}</a></h4>
											<a href={'/part/' + prod.part_number}>
												<img src={this.getFeaturedImage(prod)} className="img-responsive" alt={'Image for ' + prod.short_description} />
											</a>
											<hr className="visible-xs-block" />
										</div>
									);
								})}

							</div>
						</div>
					</div>
				</div>

				{/* Testimonials */}
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>FROM OUR CUSTOMERS</h3>
							<div className={cx('col-md-12', s.testimonials)}>
								{this.state.context.testimonials.map((t, i) => {
									return (
										<div key={i} className={cx(s.testimonial, 'col-md-6')}>
											<h4>"{t.title}"</h4>
											<p>{t.content}</p>
											<span className={cx(s.name)}>- {t.firstName} {t.lastName}, {t.location}</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				{/* YouTube Modal */}
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={this.state.modalStyles}
				>
					<iframe className={s.modalIframe} src="https://www.youtube.com/v/8GzILyP_2BM" frameBorder="0" allowFullscreen></iframe>
				</Modal>
			</div>
		);
	}

}

export default Home;
