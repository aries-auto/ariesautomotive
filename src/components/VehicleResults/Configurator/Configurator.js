import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Configurator.scss';
import withStyles from '../../../decorators/withStyles';
import VehicleStore from '../../../stores/VehicleStore';
import fetch from '../../../core/fetch';
import connectToStores from 'alt-utils/lib/connectToStores';
import $ from 'jquery';
import { iapiBase, apiKey } from '../../../config';
import Display from './Display';

@withStyles(s)
@connectToStores
class Configurator extends Component {

	static propTypes = {
		vehicle: PropTypes.shape({
			year: PropTypes.string,
			make: PropTypes.string,
			model: PropTypes.string,
			style: PropTypes.string,
			parts: PropTypes.array,
			image: PropTypes.string,
		}),
		partToAdd: PropTypes.object,
		partToRemove: PropTypes.object,
		context: PropTypes.object,
		win: PropTypes.object,
		className: PropTypes.string,
	};

	constructor() {
		super();
		this.state = {
			context: {},
		};
		this.vehiclePartsIndex = 0;
	}

	componentDidMount() {
		this.props.win.onerror = () => {
			$('.vehicle-wrapper').hide();
			$('.error').html('<h4>No image of vehicle with parts available.</h4>');
			$('.error').removeClass('hidden');
		};
	}

	componentWillReceiveProps(next) {
		let reportError = false;
		$('.error').addClass('hidden');
		if (next.partToRemove && next.partToRemove !== this.props.partToRemove) {
			const newPart = next.partToRemove;
			$('#removePart').attr('data-part', newPart.part_number);
			this.handleRemoveProduct();
		}
		if (next.partToAdd && next.partToAdd !== this.props.partToAdd) {
			const newPart = next.partToAdd;
			$('#addPart').attr('data-part', newPart.part_number);
			this.handleAddProduct();
		}
		if ($('.vehicle-wrapper').has('#image-wrapper').length === 0) {
			$('.vehicle-wrapper').hide();
			reportError = true;
		}
		if (reportError) {
			// VehicleActions.reportVehicleError(this.props.context.vehicleParts[this.vehiclePartsIndex].vehicle);
			const data = JSON.stringify({
				error: 'No image',
				vehicle: this.props.context.vehicleParts[this.vehiclePartsIndex].vehicle,
			});
			fetch(`${iapiBase}/errormonitor/inserterror?key=${apiKey}`, {
				method: 'post',
				body: data,
			});
		}
		this.vehiclePartsIndex = this.determineVehicleThatBestMatchesPartArray();
		return;
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	getPartArrayAssociatedWithIconVehicle(iconVehicle) {
		const partArray = [];
		for (const partNumber in iconVehicle.parts) {
			if (partNumber) {
				partArray.push(partNumber);
			}
		}
		return partArray;
	}

	checkIconVehicleForAllVehicleParts(vehicle, iconVehicle) {
		const partArray = this.getPartArrayAssociatedWithIconVehicle(iconVehicle);
		for (const i in vehicle.parts) {
			if (partArray.indexOf(vehicle.parts[i].part_number) === -1) {
				return false;
			}
		}
		return true;
	}

	// lots of loops - iterates over the parts assigned to the vehicle (for display on envision)
	// compares to the arrays of partNumbers on each of the iconMediaVehcleParts to find the first
	// iconMediaVehicleID that is associated with all the parts
	determineVehicleThatBestMatchesPartArray() {
		if (!this.props.vehicle.parts || this.props.vehicle.parts.length === 0) {
			return this.vehiclePartsIndex;
		}
		for (const i in this.props.context.vehicleParts) {
			if (!this.props.context.vehicleParts[i]) {
				return this.vehiclePartsIndex;
			}
			if (this.checkIconVehicleForAllVehicleParts(this.props.vehicle, this.props.context.vehicleParts[i])) {
				return i;
			}
		}
	}

	handleAddProduct() {
		$('#addPart')[0].click();
	}

	handleRemoveProduct() {
		$('#removePart')[0].click();
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div className="error hidden"></div>
				<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
				<Display parts={this.props.vehicle.parts} id={this.props.context.vehicleParts[this.vehiclePartsIndex].vehicle.intVehicleID} />
			</div>
		);
	}

}

export default Configurator;
