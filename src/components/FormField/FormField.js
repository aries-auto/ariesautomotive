import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import FormFieldStore from '../../stores/FormFieldStore';
import FormFieldActions from '../../actions/FormFieldActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import { locationHtml } from '../../data/locations';

@connectToStores
class FormField extends Component {

	static propTypes = {
		field: PropTypes.object,
		countries: PropTypes.array,
		contactTypes: PropTypes.array,
		inputs: PropTypes.array,
	};

	constructor() {
		super();
		this.modifyValue = this.modifyValue.bind(this);
	}

	static getStores() {
		return [FormFieldStore];
	}

	static getPropsFromStores() {
		return FormFieldStore.getState();
	}

	getField() {
		const output = [];
		const field = this.props.field;
		switch (field.type) {
		case 'text':
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
				const states = [];
				for (const k in this.props.countries[j].states) {
					if (!this.props.countries[j].states[k]) {
						continue;
					}
					states.push(
						<option key={k} value={this.props.countries[j].states[k].state_id}>
							{this.props.countries[j].states[k].state}
						</option>
						);
				}
				countryOptions.push(
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
						{countryOptions}
					</select>
				</div>
			);
			break;
		case 'state':
			const stateOptions = [];
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
						<option key={k} value={this.props.countries[j].states[k].state_id}>
							{this.props.countries[j].states[k].state}
						</option>
						);
				}
				stateOptions.push(
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
						{stateOptions}
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
				contactOptions.push(
					<option key={j} value={this.props.contactTypes[j].id}>
						{this.props.contactTypes[j].name}
					</option>
				);
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
		FormFieldActions.setInput(input);
	}

	render() {
		return (
			<div className={cx('form_field')}>
				{this.getField()}
			</div>

		);
	}

}

export default FormField;
