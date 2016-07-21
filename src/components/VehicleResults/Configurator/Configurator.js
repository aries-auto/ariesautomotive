import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Configurator.scss';
import withStyles from '../../../decorators/withStyles';
import VehicleStore from '../../../stores/VehicleStore';
import VehicleActions from '../../../actions/VehicleActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import $ from 'jquery';

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
	};

	constructor() {
		super();
		this.state = {
			context: {},
		};
	}

	componentWillReceiveProps(next) {
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
			VehicleActions.setShowIconMediaVehicleState(false);
		}
		return;
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	handleAddProduct() {
		$('#addPart')[0].click();
	}

	handleRemoveProduct() {
		$('#removePart')[0].click();
	}

	render() {
		return (
			<div className={cx(s.root)}>
				<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
				<script src="https://www.iconfigurators.com/pop/src/iconfig-ar-2.cfm?key=539D7C9D0B8B72F4966C"></script>
				<div className={cx('vehicle-wrapper', s.vehicleWrapper)} id="ic-vehicle-wrapper" data-part="" data-vehicleid={this.props.context.iconMediaVehicle.intVehicleID} title="The Vehicle Accessory Desc"></div>
				<div className="hidden">
					Code to Add Product:
					<a
						className="pop_up_vehicle"
						data-part=""
						data-remove="0"
						title="Accessory Name"
						id="addPart"
					>ADD</a>
					Code to Remove Product:
					<a
						className="pop_up_vehicle"
						data-part=""
						data-remove="1"
						title="Accessory Name"
						id="removePart"
					>REMOVE</a>
				</div>
			</div>
		);
	}

}

export default Configurator;
