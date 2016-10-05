import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './NewVehicle.scss';
import Select from './Select';
import LuverneActions from '../../actions/LuverneActions';
import LuverneStore from '../../stores/LuverneStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class NewLvVehicle extends Component {

	static propTypes = {
		className: PropTypes.string,
		onSubmit: PropTypes.func.isRequired,
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
			base_vehicle: {
				year: '',
				make: '',
				model: '',
			},
			available_years: [],
			available_makes: [],
			available_models: [],
			lookup_category: [],
			products: [],
		},
	};

	constructor() {
		super();

		this.changeVehicle = this.changeVehicle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.isActive = this.isActive.bind(this);
	}

	static getStores() {
		return [LuverneStore];
	}

	static getPropsFromStores() {
		return LuverneStore.getState();
	}

	resetVehicle() {
		LuverneActions.setVehicle('', '', '');
	}

	changeVehicle(event) {
		if (event.target === undefined || event.target.name === undefined) {
			return;
		}

		let v = {};
		switch (event.target.name.toLowerCase()) {
		case 'year':
			v = {
				year: event.target.value,
				make: '',
				model: '',
			};
			break;
		case 'make':
			v = {
				year: this.props.vehicle.base_vehicle.year,
				make: event.target.value,
				model: '',
			};
			break;
		case 'model':
			v = {
				year: this.props.vehicle.base_vehicle.year,
				make: this.props.vehicle.base_vehicle.make,
				model: event.target.value,
			};
			break;
		default:
			break;
		}

		LuverneStore.fetchVehicle(v.year, v.make, v.model);
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.onSubmit();
	}

	isActive(prop) {
		const v = this.props.vehicle;
		switch (prop) {
		case 'year':
			if (!v.year || v.year === '') {
				return s.active;
			}
			return '';
		case 'make':
			if (!v.year || v.year === '') {
				return '';
			}

			if (!v.make || v.make === '') {
				return s.active;
			}
			return '';
		case 'model':
			if (!v.year || v.year === '') {
				return '';
			}

			if (!v.make || v.make === '') {
				return '';
			}

			return s.active;
		default:
			return '';
		}
	}

	render() {
		console.log(this.props.vehicle);
		return (
			<form className={s.root} onSubmit={this.handleSubmit}>
				<label className={s.heading}>Vehicle Lookup</label>
				<Select
					className={cx(s.formGroup, this.isActive('year'))}
					name="year"
					change={this.changeVehicle}
					aria="year_lookup_label"
					placeholder="- Select Year -"
					values={this.props.vehicle.available_years}
				/>
				<Select
					className={cx(s.formGroup, this.isActive('make'))}
					name="make"
					change={this.changeVehicle}
					aria="make_lookup_label"
					placeholder="- Select Make -"
					values={this.props.vehicle.available_makes}
					disabled={(!this.props.vehicle.available_makes || this.props.vehicle.available_makes.length === 0)}
					disabledClassName={s.disabled}
				/>
				<Select
					className={cx(s.formGroup, this.isActive('model'))}
					name="model"
					change={this.changeVehicle}
					aria="model_lookup_label"
					placeholder="- Select Model -"
					values={this.props.vehicle.available_models}
					disabled={(!this.props.vehicle.available_models || this.props.vehicle.available_models.length === 0)}
					disabledClassName={s.disabled}
				/>
				<button
					className={cx('red-transparent-button', s.viewParts)}
					type="submit"
					disabled={(this.props.vehicle.base_vehicle.model === '')}
				>
					View Parts
				</button>
			</form>
		);
	}

}

export default NewLvVehicle;
