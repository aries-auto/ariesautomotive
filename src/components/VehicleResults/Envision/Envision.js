import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Loader from 'react-loader';
import s from './Envision.scss';
import withStyles from '../../../decorators/withStyles';
import VehicleStore from '../../../stores/VehicleStore';
import VehicleActions from '../../../actions/VehicleActions';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Envision extends Component {

	static propTypes = {
		vehicle: PropTypes.shape({
			year: PropTypes.string,
			make: PropTypes.string,
			model: PropTypes.string,
			style: PropTypes.string,
			parts: PropTypes.array,
			image: PropTypes.string,
		}),
	};

	constructor() {
		super();
		this.state = {
			context: {},
		};
	}

	componentDidMount() {
		VehicleActions.getVehicleImage();
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	findPartImage(part) {
		// TODO make this good
		return `${part.images[0].path.Scheme}://${part.images[0].path.Host}${part.images[0].path.Path}`;
	}

	renderImage() {
		return (
			<div className={s.imageContainer}>
				<img className={s.image} src={this.props.vehicle.image} />
			</div>
		);
	}

	renderPartList() {
		const parts = [];
		this.props.vehicle.parts.map((part) => {
			parts.push(this.renderPart(part));
		});
		return (
			<div className={s.partList}>
				<h3>PARTS LIST</h3>
				{parts}
			</div>
		);
	}

	renderPart(part) {
		// console.log(part);
		const image = this.findPartImage(part);
		return (
			<div className={s.partContainer}>
				{part.id}
				<img className={s.partImage} src={image} alt={part.short_description} />
				<div className={s.partContent}>
					<p className={s.partShortDescription}>{part.short_description}</p>
					<p className={s.partPartNumber}>{part.part_number}</p>
				</div>
				<div className={s.partClose}>X</div>
			</div>
		);
	}

	render() {
		// console.log(this.props);
		return (
			<div className={cx(s.root)}>
				<Loader loaded={(this.props.vehicle.image !== '')} top="40%" loadedClassName={s.loader}>
					{this.props.vehicle.image ? this.renderImage() : null}
					{this.props.vehicle.parts && this.props.vehicle.parts.length ? this.renderPartList() : null}
				</Loader>
			</div>
		);
	}

}

export default Envision;
