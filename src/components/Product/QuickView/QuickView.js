import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './QuickView.scss';
import Link from '../../Link';
import SubDescription from '../../SubDescription';
import VehicleActions from '../../../actions/VehicleActions';
import AddToVehicle from '../../PartResults/AddToVehicle';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class QuickView extends Component {

	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object,
		vehicle: PropTypes.object,
		envision: PropTypes.object,
	};

	constructor() {
		super();

		this.handleAddToVehicle = this.handleAddToVehicle.bind(this);
	}

	getPrice() {
		if (!this.props.product.pricing || this.props.product.pricing.length > 0) {
			return;
		}

		this.props.product.pricing.map((pr, i) => {
			if (pr.type === 'List' && pr.price > 0) {
				return <span key={i} className="msrp">MSRP <span className={s.priceValue}>${parseFloat(pr.price.toFixed(2))}</span></span>;
			}
		});
	}

	partImages() {
		if (!this.props.product.images || this.props.product.images.length === 0) {
			return 'https://storage.googleapis.com/aries-website/site-assets/noimage.jpg';
		}

		const imgs = (this.props.product.images || []).filter((i) => i.width === 300).sort((a, b) => a.sort.localeCompare(b.sort));
		if (imgs && imgs.length > 0) {
			return `${imgs[0].path.Scheme}://${imgs[0].path.Host}${imgs[0].path.Path}`;
		}

		return 'https://storage.googleapis.com/aries-website/site-assets/noimage.jpg';
	}

	showAttributes() {
		if (!this.props.product.attributes || this.props.product.attributes.length === 0) {
			return [];
		}

		const attrs = [];
		this.props.product.attributes.forEach((attr, i) => {
			attrs.push(<li key={i}><strong>{attr.name}:</strong> {attr.value}</li>);
		});

		return attrs;
	}

	showSubDescription() {
		let res = <span></span>;
		if (this.props.product.content && this.props.product.content.length > 0) {
			const temp = this.props.product.content.filter((c) => c.contentType.type.toLowerCase() === 'sub description');
			if (temp.length > 0) {
				res = (
					<div className={s.subdesc}>
						<SubDescription product={this.props.product} />
					</div>
				);
			}
		}
		return res;
	}

	handleAddToVehicle() {
		let layer = null;
		this.props.envision.layers.map((l) => {
			if (l.strPartNumber.localeCompare(this.props.product.part_number) === 0) {
				layer = l;
			}
		});
		VehicleActions.addEnvisionPart(this.props.product, layer);
		const vehicleElement = document.getElementById('vehicle-display');
		vehicleElement.scrollIntoView();
	}

	render() {
		let layer = null;
		if (this.props.envision && this.props.envision.layers) {
			this.props.envision.layers.map((l) => {
				if (l.strPartNumber.localeCompare(this.props.product.part_number) === 0) {
					layer = l;
				}
			});
		}

		return (
			<div className={cx(s.root, (layer ? s.envision : null))} onClick={layer ? this.handleAddToVehicle : null}>
				<div className={s.header}>
					<div className={s.desc}>
						<span>{this.props.product.short_description}</span>
						<span className={s.partNum}>{this.props.product.part_number}</span>
					</div>
					{ this.showSubDescription() }
					{(layer) ? <span className={s.envisionBadge} /> : null}
				</div>

				<div className={s.image}>
					<img className="img-responsive" src={this.partImages()} alt={'Image for ' + this.props.product.short_description} />
				</div>

				<div className={s.partBox}>
					<div className={s.price}>
						{this.getPrice()}
					</div>
					<div className={s.attr}>
						<ul>
							{this.showAttributes()}
						</ul>
					</div>
				</div>
				<div className={s.nav}>
					{ layer ? <AddToVehicle className={s.addToVehicle} layer={layer} envision={this.props.envision} vehicle={this.props.vehicle} part={this.props.product} /> : null }
					<Link
						to={`/buy`}
						className={cx('btn', 'red-transparent-button', s.whereToBuy)}
						title={`Where To Buy ${this.props.product.short_description} ${this.props.product.part_number}`}
						role="button"
					>
						Where To Buy
					</Link>
					<Link
						to={`/part/${this.props.product.part_number}`}
						className={cx('btn', 'red-transparent-button', s.viewDetails)}
						title={this.props.product.short_description}
						role="button"
					>
						View Details
					</Link>
				</div>
			</div>
		);
	}

}

export default QuickView;
