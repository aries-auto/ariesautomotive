import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Lookup.scss';
import NewVehicle from './NewVehicle';
import LookupActions from '../../actions/LookupActions';
import LookupStore from '../../stores/LookupStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Lookup extends Component {

	static propTypes = {
		className: PropTypes.string,
		years: PropTypes.array,
		makes: PropTypes.array,
		models: PropTypes.array,
		valid: PropTypes.bool,
		vehicle: PropTypes.shape({
			year: PropTypes.string,
			make: PropTypes.string,
			model: PropTypes.string,
		}),
		params: PropTypes.object,
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

		if (props.vehicle.model && props.vehicle.model !== '') {
			this.state = {
				valid: true,
			};
		}
	}

	static getStores() {
		return [LookupStore];
	}

	static getPropsFromStores() {
		return LookupStore.getState();
	}

	viewParts(vehicle) {
		window.location.href = `/vehicle/${vehicle.year}/${vehicle.make}/${vehicle.model}`;
		return;
	}

	resetVehicle() {
		this.vehicleSet = false;
		LookupActions.set({ year: '', make: '', model: '' });
	}

	showVehicle() {
		const link = `/vehicle/${this.props.vehicle.year}/${this.props.vehicle.make}/${this.props.vehicle.model}`;
		const v = `${this.props.vehicle.year} ${this.props.vehicle.make} ${this.props.vehicle.model}`;
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

	newVehicle() {
		if (this.props.vehicle.year !== this.props.params.year) {
			return false;
		}
		if (this.props.vehicle.make !== this.props.params.make) {
			return false;
		}
		if (this.props.vehicle.model !== this.props.params.model) {
			return false;
		}
		return true;
	}

	render() {
		let valid = <NewVehicle onSubmit={this.viewParts} />;
		if (
			this.props.vehicle &&
			this.props.vehicle.year !== '' &&
			this.props.vehicle.make !== '' &&
			this.props.vehicle.model !== '' &&
			this.newVehicle()
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
