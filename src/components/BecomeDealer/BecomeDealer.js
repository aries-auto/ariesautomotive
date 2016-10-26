import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './BecomeDealer.scss';
import { brand } from '../../config';
import withStyles from '../../decorators/withStyles';
import ContactActions from '../../actions/ContactActions';
import ContactStore from '../../stores/ContactStore';
import GeographyStore from '../../stores/GeographyStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import { fields } from './fields';

@withStyles(s)
@connectToStores
class BecomeDealer extends Component {

	static propTypes = {
		className: PropTypes.string,
		enabled: PropTypes.bool,
		countries: PropTypes.array,
		inputs: PropTypes.object,
		success: PropTypes.object,
		error: PropTypes.object,
	};

	// static contextTypes = {
	// 	onSetTitle: PropTypes.func.isRequired,
	// 	onPageNotFound: PropTypes.func.isRequired,
	// 	onSetMeta: PropTypes.func.isRequired,
	// 	seo: PropTypes.func.isRequired,
	// };

	constructor() {
		super();
		this.modifyValue = this.modifyValue.bind(this);
		this.submit = this.submit.bind(this);
		this.checkDisabled = this.checkDisabled.bind(this);
	}

	// componentWillMount() {
	// 	this.context.onSetTitle(title);
	// }

	static getStores() {
		return [GeographyStore, ContactStore];
	}

	static getPropsFromStores() {
		return {
			...GeographyStore.getState(),
			...ContactStore.getState(),
		};
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
						<input type={fields[i].type} className="form-control" name={fields[i].name} placeholder={fields[i].placeholder} onChange={this.modifyValue}/>
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
						<select className="form-control" name={fields[i].name} onChange={this.modifyValue}>
							<option value="">{fields[i].placeholder}</option>
							{options}
						</select>
					</div>
				);
				break;
			case 'textarea':
				output.push(
					<div key={i} className={'form-group col-xs-' + fields[i].width}>
						<label htmlFor={fields[i].name}>{fields[i].label}</label>
						<textarea type={fields[i].type} className="form-control" name={fields[i].name} placeholder={fields[i].placeholder} onChange={this.modifyValue}></textarea>
					</div>);
				break;
			default:
				break;
			}
		}
		return output;
	}

	checkDisabled() {
		for (const i in fields) {
			if (!fields[i]) {
				continue;
			}
			if (fields[i].required === true) {
				const f = this.props.inputs[fields[i].name];
				if (!f || f === undefined) {
					ContactActions.setFormValidation(false);
					return;
				}
			}
		}
		ContactActions.setFormValidation(true);
	}

	modifyValue(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.props.inputs[name] = value;
		this.checkDisabled();
	}

	submit(event) {
		event.preventDefault();
		ContactActions.postContactData(brand.defaultContactType);
	}

	renderSuccess() {
		if (this.props.error) {
			return (
				<div className={cx('form-group col-xs-12 alert alert-danger')}>
					Error: {this.props.error.message}
				</div>);
		}
		return (
			<div className={cx('form-group col-xs-12 alert alert-success')}>
				<a href="/">Thank you. We have received your request.</a>
			</div>);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div className={cx('visible-sm visible-md visible-lg internal-hero', s.hero)}></div>
				<div className={cx(s.container, 'container')}>

					<div className="col-xs-12 col-md-12 col-lg-12">
						<div className={cx('head')}>
							<h1>BECOME A DEALER</h1>
						</div>
						<form name="contactForm" role="form" noValidate>
							{this.getForm()}
							<div className="form-group col-xs-12">
								<button type="submit" className="btn btn-primary" disabled={!this.props.enabled} onClick={this.submit}>SEND</button>
							</div>
						</form>
						{(this.props.success || this.props.error) ? this.renderSuccess() : null}
					</div>
				</div>
			</div>
		);
	}

}

export default BecomeDealer;
