import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Contact.scss';
import withStyles from '../../decorators/withStyles';
import { fields } from './FormFields';
import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Form from '../Form/Form';
import { locationHtml } from '../../data/locations';

@withStyles(s)
@connectToStores
class Contact extends Component {

	static propTypes = {
		className: PropTypes.string,
		countries: PropTypes.array,
		contactTypes: PropTypes.array,
		inputs: PropTypes.object,
		success: PropTypes.object,
		error: PropTypes.object,
	};

	constructor() {
		super();
		this.modifyValue = this.modifyValue.bind(this);
		this.submit = this.submit.bind(this);
		this.getLocations = this.getLocations.bind(this);
		this.renderSuccess = this.renderSuccess.bind(this);
		this.enabled = false;
	}

	componentWillReceiveProps() {
		for (let i = 0; i < fields.length; i++) {
			if ((!this.props.inputs[fields[i].name] || this.props.inputs[fields[i].name] === '') && fields[i].required) {
				return;
			}
		}
		this.enabled = true;
		return;
	}

	static getStores() {
		return [ContactStore];
	}

	static getPropsFromStores() {
		return ContactStore.getState();
	}

	getForm() {
		return (<Form fields={fields} />);
	}

	getLocations() {
		return (
			<div className={'location'}>
				{locationHtml()}
			</div>
		);
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
		ContactActions.postContactData(this.props.inputs.reason);
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

					<div className="col-xs-12 col-md-6 col-lg-6">
						<div className={cx('head')}>
							<h1>CONTACT</h1>
						</div>
						<form name="contactForm" role="form" noValidate>
							{this.getForm()}
							<div className="form-group col-xs-12">
								<button type="submit" className="btn btn-primary" disabled={!this.enabled} onClick={this.submit}>SEND</button>
							</div>
						</form>
						{(this.props.success || this.props.error) ? this.renderSuccess() : null}
					</div>
					<div className="col-xs-12 col-md-6 col-lg-6">
						<div className={cx('head')}>
							<h3>OUR LOCATIONS</h3>
						</div>
						{this.getLocations()}
					</div>
				</div>
			</div>

		);
	}

}

export default Contact;
