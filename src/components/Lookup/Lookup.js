import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Lookup.scss';
import LookupActions from '../../actions/LookupActions';
import LookupStore from '../../stores/LookupStore';
import connectToStores from 'alt-utils/lib/connectToStores';


class Lookup extends Component {

	static propTypes = {
		className: PropTypes.string,
		years: PropTypes.array,
		makes: PropTypes.array,
		models: PropTypes.array,
		view: PropTypes.bool,
		vehicle: PropTypes.shape({
			year: PropTypes.string,
			make: PropTypes.string,
			model: PropTypes.string,
		}),
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
		this.viewParts = this.viewParts.bind(this);
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

	getYearElement() {
		return (
		<div className={cx(s.formGroup, 'form-group')}>
			<select className="form-control" name="year" onChange={this.changeVehicle} aria-labelledby="year_lookup_label">
				<option value="">- Select Year -</option>
				{this.props.years.map((year, i) => {
					return <option key={i} value={year}>{ year }</option>;
				})}
				</select>
			</div>
		);
	}

	getMakeElement(ok) {
		const disabled = ok ? false : true;
		return (
			<div className={cx(s.formGroup, 'form-group')}>
				<select className="form-control" name="make" disabled={disabled} onChange={this.changeVehicle} aria-labelledby="make_lookup_label">
					<option value="">- Select Make -</option>
					{this.props.makes.map((make, i) => {
						return <option key={i} value={make}>{ make }</option>;
					})}
				</select>
			</div>
		);
	}

	getModelElement(ok) {
		const disabled = ok ? false : true;
		return (
			<div className={cx(s.formGroup, 'form-group')}>
				<select className="form-control" name="model" disabled={disabled} onChange={this.changeVehicle} aria-labelledby="model_lookup_label">
					<option value="">- Select Model -</option>
					{this.props.models.map((model, i) => {
						return <option key={i} value={model}>{ model }</option>;
					})}
				</select>
			</div>
		);
	}

	getViewButton(ok) {
		const disabled = ok ? false : true;
		return (
			<button className="red-transparent-button pull-right" disabled={disabled} onClick={this.viewParts}>View Parts</button>
		);
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

	viewParts(e) {
		e.preventDefault();
		const loc = `/vehicle/${this.props.vehicle.year}/${this.props.vehicle.make}/${this.props.vehicle.model}`;
		window.location.href = loc;
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.vehicleValid()) {
			return;
		}

		window.location.href = `/vehicle/${this.state.vehicle.year}/${this.state.vehicle.make}/${this.state.vehicle.model}`;
		return;
	}

	changeVehicle(event) {
		if (event.target === undefined || event.target.name === undefined) {
			return;
		}

		switch (event.target.name.toLowerCase()) {
		case 'year':
			this.state.vehicle = {
				year: event.target.value,
				make: '',
				model: '',
			};
			break;
		case 'make':
			this.state.vehicle = {
				year: this.state.vehicle.year,
				make: event.target.value,
				model: '',
			};
			break;
		case 'model':
			this.state.vehicle = {
				year: this.state.vehicle.year,
				make: this.state.vehicle.make,
				model: event.target.value,
			};
			break;
		default:
			break;
		}
		LookupActions.set(this.state.vehicle);
	}

	render() {
		let makes = false;
		let models = false;
		if (this.props.makes && this.props.makes.length > 0) {
			makes = true;
		}

		if (this.props.models && this.props.models.length > 0) {
			models = true;
		}

		return (
			<div className={cx(s.root, this.props.className, 'container-fluid')} role="navigation">
				<form onSubmit={this.handleSubmit} className={cx(s.inlineForm, 'form-inline')}>
					<label className={s.heading}>Vehicle Lookup</label>
					{this.getYearElement()}
					{this.getMakeElement(makes)}
					{this.getModelElement(models)}
					{this.getViewButton(this.props.view)}
				</form>
			</div>
		);
	}

}

export default connectToStores(Lookup);
