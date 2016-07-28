import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './PartResults.scss';
import withStyles from '../../decorators/withStyles';
import VehicleActions from '../../actions/VehicleActions';
import VehicleStore from '../../stores/VehicleStore';
import connectToStores from 'alt-utils/lib/connectToStores';


@withStyles(s)
@connectToStores
class PartResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.shape({}),
		parts: PropTypes.array,
		vehicle: PropTypes.object,
		iconParts: PropTypes.object,
	};

	constructor() {
		super();

		this.state = {
			context: {},
		};
	}

	// componentWillMount() {
	// 	if (!this.props || !this.props.parts) {
	// 		return;
	// 	}

	// 	// this.setState({
	// 	// 	parts: this.props.parts,
	// 	// });
	// }

	// componentWillReceiveProps(newProps) {
	// 	if (newProps.parts === this.props.parts) {
	// 		return;
	// 	}
	// 	this.setState({
	// 		parts: newProps.parts,
	// 	});
	// }

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	getPrice(p) {
		if (!p.pricing || p.pricing.length > 0) {
			return;
		}

		p.pricing.map((pr, i) => {
			if (pr.type === 'List' && pr.price > 0) {
				return <span key={i} className="msrp">MSRP <span className={s.priceValue}>${parseFloat(pr.price.toFixed(2))}</span></span>;
			}
		});
	}

	partImages(p) {
		if (p.images && p.images.length > 0) {
			for (let i = 0; i < p.images.length; i++) {
				const img = p.images[i];
				if (img.size === 'Grande') {
					return img.path.Scheme + '://' + img.path.Host + img.path.Path;
				}
			}
		}

		return '/img/partImgPlaceholder.jpg';
	}

	chunkParts(chunkSize, parts) {
		return [].concat.apply([], parts.map((elem, i) => {
			return i % chunkSize ? [] : [parts.slice(i, i + chunkSize)];
		}));
	}

	showAttributes(p) {
		if (!p.attributes || p.attributes.length === 0) {
			return [];
		}

		const attrs = [];
		p.attributes.forEach((attr, i) => {
			attrs.push(<li key={i}><strong>{attr.name}:</strong> {attr.value}</li>);
		});

		return attrs;
	}

	handleAddToVehicle(part) {
		VehicleActions.addPartToVehicle(part);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)} role="navigation">
				{this.chunkParts(3, this.props.parts).map((chunk, j) => {
					return (
						<div className={s.chunk} key={j}>
							{chunk.map((part, i) => {
								return (
									<div key={i} className={cx(s.product, 'row', 'well')}>
										<div className={s.header}>
											<span className={s.desc}>
												<a href={'/part/' + part.part_number}>{part.short_description}
													<span className={s.partNum}>{part.part_number}</span>
												</a>
											</span>
										</div>

										<div className={s.image}>
											<img className="img-responsive" src={this.partImages(part)} alt={'Image for ' + part.short_description} />
										</div>

										<div className={cx('side-box col-xs-12 col-sm-12 col-md-7 col-lg-8 col-offset-md-1 col-offset-lg-1', s.partBox)}>

											<div className={s.price}>
												{this.getPrice(part)}
											</div>
											<div className={s.attr}>
												<ul>
													{this.showAttributes(part)}
												</ul>
											</div>
										</div>
										<div className={s.nothing}>&nbsp;</div>
										<div className={cx(s.nav, 'col-xs-12', 'col-sm-12', 'col-md-7', 'col-lg-8', 'col-offset-md-1', 'col-offset-lg-1')}>
											{!part.iconLayer || !this.props.iconParts ? null : <a className={cx('btn', 'red-transparent-button', s.addToVehicle)} role="button" onClick={this.handleAddToVehicle.bind(this, part)} value={part}>Add To Vehicle</a>}
											<a href="/buy" className={cx('btn', 'red-transparent-button', s.whereToBuy)} role="button">Where To Buy</a>
											<a href={'/part/' + part.part_number} className={cx('btn', 'red-transparent-button', s.viewDetails)} role="button">View Details</a>
										</div>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}

}

export default PartResults;
