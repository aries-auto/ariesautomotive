import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Home.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Home extends Component {

    static propTypes = {
        className: PropTypes.string,
        carouselImages: PropTypes.array,
        featuredProducts: PropTypes.array,
    };

    constructor() {
        super();

        this.carouselPrev = this.carouselPrev.bind(this);
        this.carouselNext = this.carouselNext.bind(this);
        this.state = {
            carouselImages: [{
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
            }],
            featuredProducts: [],
        };
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

    carouselPrev() {

    }

    carouselNext() {

    }

    render() {
        return (
            <div className={cx(s.root, this.props.className, 'home-container')} role="navigation">

                <div id="hero-image-carousel" className="carousel slide" data-ride="carousel">

                    <div className="carousel-inner">
                        {this.state.carouselImages.map((img, i) => {
                            let active = '';
                            if (i === 0) {
                                active = 'active';
                            }
                            return (
                                <div key={i} className={cx(active, 'item')}>
                                    <div className={cx(s.carouselImg)} style={img.styles}></div>
                                    <div className="carousel-caption">
                                        <span className="bigText">{img.text}</span>
                                        <div className="clearfix">&nbsp;</div>
                                        <a className="white-transparent-button" href="{img.link}">{img.button_text}</a>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <a className="left carousel-control" onClick={this.carouselPrev()} role="button" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a className="right carousel-control" onClick={this.carouselNext()} role="button" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div>

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

                            <div className="row whats-new" ng-click="showWhatsNewLightbox()">
                                <img src="https://storage.googleapis.com/aries-website/whatsnew/What's-New-Banner.png" alt="What's New with ARIES" className="header" />
                                <div className="callout">
                                    <img src="https://storage.googleapis.com/aries-website/whatsnew/ARIES-Floor-Liner-Artistic-Black%20(20).jpg" alt=" Introducing StyleGuard Floor Liners" className="styleguard" />
                                    <span>Introducing StyleGuard&trade; Floor Liners</span>
                                </div>
                            </div>

                            <div className="row whats-new">
                                <a href="/envision">
                                    <img src="https://storage.googleapis.com/aries-website/whatsnew/Envision-Website-Graphic.png" alt="Envision ARIES" />
                                </a>
                            </div>

                            <div className="row catalog">
                                <div className="col-xs-6 col-md-7 col-lg-5">
                                    <img src="https://storage.googleapis.com/aries-website/ARIES-Exterior-Cover.png" alt="catalog" className="img-responsive" />
                                </div>
                                <div className="col-xs-3 col-md-3 col-lg-7">
                                    <h3>2016 EXTERIOR<br />CATALOG</h3>
                                    <a className="red-transparent-button" href="https://storage.googleapis.com/aries-website/2016-Exterior-Catalog.pdf">DOWNLOAD</a>
                                </div>
                            </div>
                            <div className="row catalog">
                                <div className="col-xs-6 col-md-7 col-lg-5">
                                    <img src="https://storage.googleapis.com/aries-website/ARIES-Interior-Cover.png" alt="catalog" className="img-responsive" />
                                </div>
                                <div className="col-xs-3 col-md-3 col-lg-7">
                                    <h3>2016 INTERIOR<br />CATALOG</h3>
                                    <a className="red-transparent-button" href="https://storage.googleapis.com/aries-website/2016-Interior-Catalog.pdf">DOWNLOAD</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" ng-controller="PartController">
                            <h3>FEATURED PRODUCTS</h3>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 featuredProducts">
                                {this.props.featuredProducts.map((prod, i) => {
                                    return (
                                        <div key={i} className="featuredProd col-xs-12 col-md-2 col-5">
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

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>FROM OUR CUSTOMERS</h3>
                            <div className="col-md-12 testimonials">
                                <div ng-repeat="t in testimonials | limitTo:2" className="testimonial col-md-6">
                                    <h4>"[[t.title | uppercase]]"</h4>
                                    <p>[[t.content]]</p>
                                    <span className="customerName">- [[t.firstName | uppercase]] [[t.lastName | uppercase]], [[t.location | uppercase]]</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;
