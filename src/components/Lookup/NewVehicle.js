import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './NewVehicle.scss';
import Select from './Select';
import LookupActions from '../../actions/LookupActions';
import LookupStore from '../../stores/LookupStore';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class NewVehicle extends Component {

	static propTypes = {
		className: PropTypes.string,
		onSubmit: PropTypes.func.isRequired,
		years: PropTypes.array,
		makes: PropTypes.array,
		models: PropTypes.array,
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

	constructor() {
		super();

		this.changeVehicle = this.changeVehicle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			vehicle: {},
			makes: [],
			models: [],
		};
	}

	static getStores() {
		return [LookupStore];
	}

	static getPropsFromStores() {
		return LookupStore.getState();
	}

	vehicleValid() {
		if (!this.state.vehicle.year || this.state.vehicle.year === '') {
			return false;
		}
		if (!this.state.vehicle.make || this.state.vehicle.make === '') {
			return false;
		}
		if (!this.state.vehicle.model || this.state.vehicle.model === '') {
			return false;
		}

		return true;
	}

	resetVehicle() {
		LookupActions.set({ year: '', make: '', model: '' });
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
				year: this.state.vehicle.year,
				make: event.target.value,
				model: '',
			};
			break;
		case 'model':
			v = {
				year: this.state.vehicle.year,
				make: this.state.vehicle.make,
				model: event.target.value,
			};
			break;
		default:
			break;
		}

		LookupActions.set(v);
		this.setState({
			vehicle: v,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.vehicleValid()) {
			return;
		}

		this.props.onSubmit(this.state.vehicle);
	}

	render() {
		console.log(this.props.models.length);
		return (
			<form className={s.root} onSubmit={this.handleSubmit}>
				<label className={s.heading}>Vehicle Lookup</label>
				<Select
					className={s.formGroup}
					name="year"
					change={this.changeVehicle}
					aria="year_lookup_label"
					placeholder="- Select Year -"
					values={this.props.years}
				/>
				<Select
					className={s.formGroup}
					name="make"
					change={this.changeVehicle}
					aria="make_lookup_label"
					placeholder="- Select Make -"
					values={this.props.makes}
					disabled={(this.props.makes.length === 0)}
					disabledClassName={s.disabled}
				/>
				<Select
					className={s.formGroup}
					name="model"
					change={this.changeVehicle}
					aria="model_lookup_label"
					placeholder="- Select Model -"
					values={this.props.models}
					disabled={(this.props.models.length === 0)}
					disabledClassName={s.disabled}
				/>
				<button
					className={cx('red-transparent-button', s.viewParts)}
					type="submit"
					disabled={(this.state.vehicle.model === '')}
				>
					View Parts
				</button>
			</form>
		);
	}

}

export default NewVehicle;
