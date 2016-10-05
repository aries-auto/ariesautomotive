import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import parsePath from 'history/lib/parsePath';
import Location from '../../core/Location';
import s from './Lookup.scss';
import NewLvVehicle from './NewLvVehicle';
import LuverneActions from '../../actions/LuverneActions';
import LuverneStore from '../../stores/LuverneStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Lookup extends Component {

	static propTypes = {
		className: PropTypes.string,
		valid: PropTypes.bool,
		vehicle: PropTypes.shape({
			base_vehicle: PropTypes.shape({
				year: PropTypes.string,
				make: PropTypes.string,
				model: PropTypes.string,
			}),
			available_years: PropTypes.array,
			available_makes: PropTypes.array,
			available_models: PropTypes.array,
			lookup_category: PropTypes.array,
			products: PropTypes.array,
		}),
	};

	static defaultProps = {
		vehicle: {
			year: '',
			make: '',
			model: '',
		},
	};

	constructor(props) {
		super(props);

		this.viewParts = this.viewParts.bind(this);
		this.resetVehicle = this.resetVehicle.bind(this);

		if (props.vehicle.base_vehicle.model && props.vehicle.base_vehicle.model !== '') {
			this.state = {
				valid: true,
			};
		}
	}

	static getStores() {
		return [LuverneStore];
	}

	static getPropsFromStores() {
		return LuverneStore.getState();
	}

	viewParts() {
		const vehicle = this.props.vehicle.base_vehicle || {};
		Location.push({
			...(parsePath(
				`/vehicle/${vehicle.year}/${vehicle.make}/${vehicle.model}`
			)),
			state: this.props,
		});
	}

	resetVehicle() {
		this.vehicleSet = false;
		LuverneActions.setVehicle('', '', '');
	}

	showVehicle() {
		const link = `/vehicle/${this.props.vehicle.base_vehicle.year}/${this.props.vehicle.base_vehicle.make}/${this.props.vehicle.base_vehicle.model}`;
		const v = `${this.props.vehicle.base_vehicle.year} ${this.props.vehicle.base_vehicle.make} ${this.props.vehicle.base_vehicle.model}`;
		return (
			<div className={s.vehicleName}>
				<a href={link}>
					{v.toUpperCase()}
				</a>
				<button
					className={cx('red-transparent-button', s.viewParts)}
					onClick={this.resetVehicle}
				>
					Change
				</button>
			</div>
		);
	}

	render() {
		let valid = <NewLvVehicle vehicle={this.props.vehicle} onSubmit={this.viewParts} />;
		if (
			this.props.vehicle &&
			this.props.vehicle.base_vehicle.year !== '' &&
			this.props.vehicle.base_vehicle.make !== '' &&
			this.props.vehicle.base_vehicle.model !== '' &&
			this.props.vehicle.products
		) {
			valid = this.showVehicle();
		}
		return (
			<div className={cx(s.root, this.props.className)} role="navigation">
				{ valid }
			</div>
		);
	}

}

export default Lookup;
