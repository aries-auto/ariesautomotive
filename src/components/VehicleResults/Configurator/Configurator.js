import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
// import Loader from 'react-loader';
import s from './Configurator.scss';
import withStyles from '../../../decorators/withStyles';
import VehicleStore from '../../../stores/VehicleStore';
// import VehicleActions from '../../../actions/VehicleActions';
import connectToStores from 'alt-utils/lib/connectToStores';

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

	render() {
		console.log(this.props);
		return (
			<div className={cx(s.root)}>
				<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js"></script>
				<script src="http://www.iconfigurators.com/pop/src/iconfig-ar.cfm?key=539D7C9D0B8B72F4966C"></script>
				<div className={cx('vehicle-wrapper', s.vehicleWrapper)} id="ic-vehicle-wrapper" data-part="" data-year={this.props.vehicle.year} data-make={this.props.vehicle.make} data-model={this.props.vehicle.model} title="The Vehicle Accessory Desc"></div>
			</div>
		);
	}

}

export default Configurator;
