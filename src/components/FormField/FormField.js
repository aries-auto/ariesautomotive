import React, { Component, PropTypes } from 'react';
import ContactStore from '../../stores/ContactStore';
import GeographyStore from '../../stores/GeographyStore';
import ContactActions from '../../actions/ContactActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import { locationHtml } from '../../data/locations';

@connectToStores
class FormField extends Component {

	static propTypes = {
		field: PropTypes.object,
		countries: PropTypes.array,
		contactTypes: PropTypes.array,
		inputs: PropTypes.object,
	};

	constructor() {
		super();
		this.modifyValue = this.modifyValue.bind(this);
		this.states = [];
		ContactStore.fetchTypes();
	}

	static getStores() {
		return [ContactStore, GeographyStore];
	}

	static getPropsFromStores() {
		return {
			...ContactStore.getState(),
			...GeographyStore.getState(),
		};
	}

	getField() {
		const output = [];
		const field = this.props.field;
		switch (field.type) {
		case 'text':
		case 'date':
		case 'email':
			output.push(
				<div key={field.key} className={'form-group col-xs-' + field.width}>
					<label htmlFor={field.name}>{field.label}</label>
					<input type={field.type} className="form-control" name={field.name} placeholder={field.placeholder} onChange={this.modifyValue}/>
				</div>);
			break;
		case 'country':
			const countryOptions = [];
			for (const j in this.props.countries) {
				if (!this.props.countries[j]) {
					continue;
				}
				countryOptions.push(
					<option key={j} value={this.props.countries[j].country}>
						{this.props.countries[j].country}
					</option>
				);
			}

			output.push(
				<div key={field.key} className={'form-group col-xs-' + field.width}>
					<label htmlFor={field.name}>{field.label}</label>
					<select className="form-control" name={field.name} onChange={this.modifyValue}>
						<option value="">{field.placeholder}</option>
						{countryOptions}
					</select>
				</div>
			);
			break;

		case 'state':
			if (!this.props.inputs || !this.props.inputs.country) {
				output.push(
					<div key={`${field.key}-state`} className={'form-group col-xs-' + field.width}>
						<label htmlFor={field.name}>{field.label}</label>
						<select className="form-control" name={field.name}>
							<option value="">{field.placeholder}</option>
						</select>
					</div>
				);
			}

			let stateOptions = [];
			this.props.countries.map((country) => {
				if (country.country === this.props.inputs.country) {
					stateOptions = country.states;
				}
			});

			const statesToSelect = [];
			for (const k in stateOptions) {
				if (!stateOptions[k]) {
					continue;
				}
				statesToSelect.push(
					<option key={k} value={stateOptions[k].state}>
						{stateOptions[k].state}
					</option>
					);
			}

			output.push(
				<div key={field.key} className={'form-group col-xs-' + field.width}>
					<label htmlFor={field.name}>{field.label}</label>
					<select className="form-control" name={field.name} onChange={this.modifyValue}>
						<option value="">{field.placeholder}</option>
						{statesToSelect}
					</select>
				</div>
			);
			break;
		case 'stateCountry':
		case 'countryState':
			const stateCountryOptions = [];
			for (const j in this.props.countries) {
				if (!this.props.countries[j]) {
					continue;
				}
				const states = [];
				for (const k in this.props.countries[j].states) {
					if (!this.props.countries[j].states[k]) {
						continue;
					}
					states.push(
						<option key={k} value={this.props.countries[j].states[k].state}>
							{this.props.countries[j].states[k].state}
						</option>
						);
				}
				stateCountryOptions.push(
					<optgroup key={j} label={this.props.countries[j].country}>
						{states}
					</optgroup>
				);
			}

			output.push(
				<div key={field.key} className={'form-group col-xs-' + field.width}>
					<label htmlFor={field.name}>{field.label}</label>
					<select className="form-control" name={field.name} onChange={this.modifyValue}>
						<option value="">{field.placeholder}</option>
						{stateCountryOptions}
					</select>
				</div>
			);
			break;
		case 'contactType':
			const contactOptions = [];
			for (const j in this.props.contactTypes) {
				if (!this.props.contactTypes[j]) {
					continue;
				}

				if (this.props.contactTypes[j].brandId === 3) {
					contactOptions.push(
						<option key={j} value={this.props.contactTypes[j].id}>
							{this.props.contactTypes[j].name}
						</option>
					);
				}
			}
			output.push(
				<div key={field.key} className={'form-group col-xs-' + field.width}>
					<label htmlFor={field.name}>{field.label}</label>
					<select className="form-control" name={field.name} onChange={this.modifyValue}>
						<option value="">{field.placeholder}</option>
						{contactOptions}
					</select>
				</div>
			);
			break;
		case 'textarea':
			output.push(
				<div key={field.key} className={'form-group col-xs-' + field.width}>
					<label htmlFor={field.name}>{field.label}</label>
					<textarea type={field.type} className="form-control" name={field.name} placeholder={field.placeholder} onChange={this.modifyValue}></textarea>
				</div>);
			break;
		default:
			break;
		}
		return output;
	}

	getLocations() {
		return (
			<div className={'location'}>
				{locationHtml()}
			</div>
		);
	}

	modifyValue(event) {
		const input = {};
		input.value = event.target.value;
		input.name = event.target.name;
		ContactActions.setInput(input);
	}

	render() {
		return <div>{this.getField()}</div>;
	}

}

export default FormField;
