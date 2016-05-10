import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Contact.scss';
import withStyles from '../../decorators/withStyles';
import { fields } from './FormFields';
import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Form from '../Form/Form';
import { locations } from '../../data/locations';

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
		const main = this.renderMainLocation();
		const support = this.renderSupportLocations();
		return (
			<div className={s.addresses}>{main}{support}
				<div className="techsupport"><h4>TECH SUPPORT HOTLINE: <a href="tel:+18888002743">(888) 800-2743</a></h4></div>
			</div>
		);
	}

	submit(event) {
		event.preventDefault();
		ContactActions.postContactData(this.props.inputs.reason);
	}

	renderSupportLocations() {
		const output = [];
		locations.map((location, i) => {
			let address2 = null;
			if (location.address[0].address2 && location.address[0].address2 !== '') {
				address2 = (<div itemProp="suite">{location.address[0].address2}</div>);
			}
			output.push(
				<address itemType="//schema.org/Organization" key={i} className={s.supportLocation}>
					<div>
						<span className={s.addressname} itemProp="name">{location.name}</span>
						<div itemProp="address" itemType="//schema.org/PostalAddress">
							<div itemProp="streetAddress">{location.address[0].address1}</div>
							{address2}
							<div>
								<span itemProp="addressLocality">{location.address[0].city}, </span>
								<span itemProp="addressRegion">{location.address[0].state} </span>
								<span itemProp="postalCode">{location.address[0].zip}</span>
							</div>
						</div>
						Phone: <a href="tel:+18886359824" itemProp="telephone">{location.phone}</a><br />
						Fax: <a href="tel:+19723522617" itemProp="faxNumber">{location.fax}</a><br />
					</div>
				</address>
			);
		});
		return (
			<div>
				{output}
			</div>
		);
	}

	renderMainLocation() {
		return (
			<address itemType="//schema.org/Organization" className={s.mainLocation}>
				<span className={s.addressname} itemProp="name">ARIES AUTOMOTIVE HEADQUARTERS - DALLAS AREA</span>
				<div>
					<div className={s.physical} itemProp="address" itemType="//schema.org/PostalAddress">
						<strong>Physical Address</strong><br />
						<span itemProp="streetAddress">2611 Regent Boulevard</span>
						<br />
						<span itemProp="suite">Suite 300</span>
						<br />
						<span itemProp="addressLocality">DFW Airport</span>,
						<span itemProp="addressRegion">TX</span>
						<span itemProp="postalCode">75261</span>
					</div>
					<div className={s.mailing} itemProp="address" itemType="//schema.org/PostalAddress">
						<strong>Mailing Address</strong><br />
						<span itemProp="streetAddress">PO BOX 1598</span>
						<br />
						<span itemProp="addressLocality">Grapevine</span>,
						<span itemProp="addressRegion">TX</span>
						<span itemProp="postalCode">76051</span>
					</div>
				</div>
				<br />
				Toll Free: <a href="tel:+18886359824" itemProp="telephone">(888) 635-9824</a><br />
				Local: <a href="tel:+19724560222" itemProp="telephone">(972) 456-0222</a><br />
				Fax: <a href="tel:+19723522617" itemProp="faxNumber">(972) 352-2617</a><br />
			</address>
		);
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
