import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import ga from 'react-ga';
import s from './PartResults.scss';
import withStyles from '../../decorators/withStyles';
import VehicleActions from '../../actions/VehicleActions';

@withStyles(s)
class AddToVehicle extends Component {

	static propTypes = {
		className: PropTypes.string,
		vehicle: PropTypes.object,
		iconParts: PropTypes.object,
		part: PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.handler = this.handler.bind(this);
	}

	handler() {
		let lbl = this.props.part.part_number || '';
		if (this.props.vehicle) {
			lbl = `${this.props.vehicle.base.year} ${this.props.vehicle.base.make} ${this.props.vehicle.base.model} ${this.props.part.part_number}`;
		}

		ga.event({
			category: 'Envision',
			action: 'Add Part',
			label: lbl,
		});
		VehicleActions.addPartToVehicle(this.props.part);
	}

	isActive() {
		if (!this.props.vehicle || !this.props.vehicle.parts) {
			return false;
		}

		let exists = false;
		this.props.vehicle.parts.map((p) => {
			if (p.id === this.props.part.id) {
				exists = true;
			}
		});

		return exists;
	}

	render() {
		if (!this.props.iconParts || !this.props.part.iconLayer) {
			return <span></span>;
		}

		const active = this.isActive();
		return (
			<a
				className={cx(
					'btn',
					'red-transparent-button',
					this.props.className,
					active ? s.active : '',
				)}
				role="button"
				onClick={this.handler}
			>
				{ active ? 'Added To Vehicle' : 'Add To Vehicle'}
			</a>
		);
	}

}

export default AddToVehicle;
