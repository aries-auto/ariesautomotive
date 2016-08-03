import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Contact.scss';
import { BrandName, defaultContactReason } from '../../config';
import withStyles from '../../decorators/withStyles';
import { fields } from '../../data/contact';
import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Form from '../Form/Form';
import { locations, mainLocation } from '../../data/locations';
import { phone } from '../../data/contact';

const title = `Contact ${BrandName}`;

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

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.submit = this.submit.bind(this);
		this.getLocations = this.getLocations.bind(this);
		this.renderSuccess = this.renderSuccess.bind(this);
		this.enabled = false;
	}

	componentWillMount() {
		this.context.onSetTitle(title);
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
			<div className={s.addresses}>
				<div className={s.techsupport}><h4>TECH SUPPORT HOTLINE: {phone}</h4></div>
				{main}{support}
			</div>
		);
	}

	submit(event) {
		event.preventDefault();
		ContactActions.postContactData(this.props.inputs.reason ? this.props.inputs.reason : defaultContactReason);
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
				<span className={s.addressname} itemProp="name">{mainLocation.physical.name}</span>
				<div className={s.physical} itemProp="address" itemType="//schema.org/PostalAddress">
					<strong>Physical Address</strong><br />
					<span itemProp="streetAddress">{mainLocation.physical.address.address1}</span>
					<br />
					<span itemProp="suite">{mainLocation.physical.address.address2}</span>
					<br />
					<span itemProp="addressLocality">{mainLocation.physical.address.city}</span>,
					<span itemProp="addressRegion"> {mainLocation.physical.address.state}</span>
					<span itemProp="postalCode"> {mainLocation.physical.address.zip}</span>
				</div>
				<div className={s.mailing} itemProp="address" itemType="//schema.org/PostalAddress">
					<strong>Mailing Address</strong><br />
					<span itemProp="streetAddress">{mainLocation.mailing.address.address1}</span>
					<br />
					<span itemProp="addressLocality">{mainLocation.mailing.address.city}</span>,
					<span itemProp="addressRegion"> {mainLocation.mailing.address.state}</span>
					<span itemProp="postalCode"> {mainLocation.mailing.address.zip}</span>
				</div>
				<div className={s.mainTelephone}>
					Toll Free: <a href={mainLocation.phone.ugly} itemProp="telephone">{mainLocation.phone.pretty}</a><br />
					Local: <a href={mainLocation.local.ugly} itemProp="telephone">{mainLocation.local.pretty}</a><br />
					Fax: <a href={mainLocation.fax.ugly} itemProp="faxNumber">{mainLocation.fax.pretty}</a><br />
				</div>
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
							<h1>OUR LOCATIONS</h1>
						</div>
						{this.getLocations()}
					</div>
				</div>
			</div>

		);
	}

}

export default Contact;
