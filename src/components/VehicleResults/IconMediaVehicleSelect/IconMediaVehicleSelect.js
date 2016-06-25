import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from '../VehicleStyle/VehicleStyle.scss';
import withStyles from '../../../decorators/withStyles';
import VehicleStore from '../../../stores/VehicleStore';
import VehicleActions from '../../../actions/VehicleActions';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class IconMediaVehicleSelect extends Component {
	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.shape({
			params: PropTypes.shape({
				year: PropTypes.string,
				make: PropTypes.string,
				model: PropTypes.string,
			}),
		}),
		category: PropTypes.object,
		showStyle: PropTypes.bool,
		parts: PropTypes.array,
		style: PropTypes.object,
		showIconMediaVehicle: PropTypes.bool,
		iconMediaVehicle: PropTypes.object,
	};

	constructor() {
		super();
		// this.showStyleChoices = this.showStyleChoices.bind(this);
		// this.getStyleChoices = this.getStyleChoices.bind(this);
		// this.showStyleChoices = this.showStyleChoices.bind(this);
		this.unhideChoices = this.unhideChoices.bind(this);
		this.showIconMediaVehicleChoices = this.showIconMediaVehicleChoices.bind(this);
		// this.setVehicleStyle = this.setVehicleStyle.bind(this);
		// this.getParts = this.getParts.bind(this);

		this.iconMediaVehicle = null;
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	setIconMediaVehicle(vehicle) {
		VehicleActions.setIconMediaVehicle(vehicle);
	}

	getIconMediaVehicleChoices() {
		const vehicleOptions = [];
		let vehicles = {};
		vehicles = this.props.style.IconMediaVehicles;

		for (const i in vehicles) {
			if (!i) {
				return vehicleOptions;
			}
			vehicleOptions.push(
				<li key={i} onClick={this.setIconMediaVehicle.bind(this, vehicles[i])} value={vehicles[i].strBodyType}>
					{vehicles[i].strBodyType.toUpperCase()}
				</li>
			);
		}
		return vehicleOptions;
	}

	unhideChoices() {
		VehicleActions.setShowIconMediaVehicleState(true);
	}

	showIconMediaVehicleChoices() {
		return (
			<div className={s.styleChoices}>
				<ul>
					{this.getIconMediaVehicleChoices()}
				</ul>
				<span />
			</div>
		);
	}

	render() {
		return (
			<div className={s.greybox}>
				<div>
					<span className={s.selTopBar}>Please select an image that matches your vehicle.</span>
				</div>
				<div className={s.iconMediaVehicleSelect}>
					<button className={cx('btn btn-default', s.styleButton)} type="button" data-toggle="dropdown" onClick={this.unhideChoices}>{(this.props.iconMediaVehicle) ? this.props.iconMediaVehicle.strBodyType : 'Select a Vehicle'} <span className="caret"></span></button>
					{(this.props.showIconMediaVehicle) ? this.showIconMediaVehicleChoices() : null}
				</div>
			</div>
		);
	}

}

export default IconMediaVehicleSelect;
