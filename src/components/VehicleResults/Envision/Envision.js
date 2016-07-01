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

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	findPartImage(part) {
		let image = {
			path: {
				Scheme: '',
				Host: '',
				Path: '',
			},
		};
		for (const i in part.images) {
			if ((image.path.Host === '' || image.path.Scheme === '' || image.path.Path === '') && (part.images[i].path.Scheme && part.images[i].path.Host && part.images[i].path.Path)) {
				image = part.images[i];
				continue;
			}
			if (part.images[i].height < image.height && part.images[i].sort <= part.sort && (part.images[i].path.Scheme && part.images[i].path.Host && part.images[i].path.Path)) {
				image = part.images[i];
			}
		}
		return `${image.path.Scheme}://${image.path.Host}${image.path.Path}`;
	}

	handleRemovePart(part) {
		VehicleActions.removePartFromVehicle(part);
	}

	renderPartList() {
		const parts = [];
		this.props.vehicle.parts.map((part, i) => {
			parts.push(this.renderPart(part, i));
		});
		return (
			<div className={s.partList}>
				<h3>PARTS LIST</h3>
				{parts}
			</div>
		);
	}

	renderPart(part, key) {
		const image = this.findPartImage(part);
		return (
			<div className={s.partContainer} key={key}>
				<img className={s.partImage} src={image} alt={part.short_description} />
				<div className={s.partContent}>
					<p className={s.partShortDescription}>{part.short_description}</p>
					<p className={s.partPartNumber}>{part.part_number}</p>
				</div>
				<div className={s.partClose}><span className={cx('glyphicon glyphicon-remove', s.x)} onClick={this.handleRemovePart.bind(this, part)}></span></div>
			</div>
		);
	}

	render() {
		return (
			<div className={cx(s.root)}>
				<Loader loaded={(this.props.vehicle.image !== '')} top="40%" loadedClassName={s.loader}>
					{this.props.vehicle.parts && this.props.vehicle.parts.length ? this.renderPartList() : null}
				</Loader>
			</div>
		);
	}

}

export default Envision;
