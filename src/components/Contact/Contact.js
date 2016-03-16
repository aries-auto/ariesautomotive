import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Contact.scss';
import withStyles from '../../decorators/withStyles';
import { fields } from './FormFields';
import ContactStore from '../../stores/ContactStore';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Contact extends Component {

	static propTypes = {
		className: PropTypes.string,
		countries: PropTypes.array,
	};

	constructor() {
		super();
	}

	static getStores() {
		return [ContactStore];
	}

	static getPropsFromStores() {
		return ContactStore.getState();
	}

	getForm() {
		const output = [];
		for (const i in fields) {
			if (!fields[i]) {
				continue;
			}
			switch (fields[i].type) {
			case 'text':
				output.push(
					<div key={i} className={'form-group col-xs-' + fields[i].width}>
						<label htmlFor={fields[i].name}>{fields[i].label}</label>
						<input type={fields[i].type} className="form-control" name={fields[i].name} placeholder={fields[i].placeholder} />
					</div>);
				break;
			case 'country':
				const options = [];
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
					options.push(
						<optgroup key={j} label={this.props.countries[j].country}>
							{states}
						</optgroup>
					);
				}

				output.push(
					<div key={i} className={'form-group col-xs-' + fields[i].width}>
						<label htmlFor={fields[i].name}>{fields[i].label}</label>
						<select className="form-control" name={fields[i].name}>
							<option value="">{fields[i].placeholder}</option>
							{options}
						</select>
					</div>
				);
				break;
			default:
				break;
			}
		}
		return output;
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div className={cx('visible-sm visible-md visible-lg internal-hero', s.hero)}></div>
				<div className="container">
					<div className="row">
						<h1>CONTACT</h1>
					</div>
					<div className="row">
						<form name="contactForm" role="form" noValidate>
							{this.getForm()}
						</form>
					</div>
				</div>
			</div>

		);
	}

}

export default Contact;
