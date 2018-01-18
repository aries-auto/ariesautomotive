import React, { Component, PropTypes } from 'react';
import s from './Contact.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Contact extends Component {

	static propTypes = {
		className: PropTypes.string,
		location: PropTypes.object,
	};

	render() {
		return (
			<address itemType="//schema.org/Organization" className={this.props.className}>
				<span className={s.addressname} itemProp="name">{this.props.location.physical.name}</span>
				<div className={s.physical} itemProp="address" itemType="//schema.org/PostalAddress">
					<strong>Physical Address</strong><br />
					<span itemProp="streetAddress">{this.props.location.physical.address.address1}</span>
					<span itemProp="suite">{this.props.location.physical.address.address2}</span>
					<br />
					<span itemProp="addressLocality">{this.props.location.physical.address.city}</span>,
					<span itemProp="addressRegion"> {this.props.location.physical.address.state}</span>
					<span itemProp="postalCode"> {this.props.location.physical.address.zip}</span>
				</div>
				<div className={s.mainTelephone}>
					Toll Free: <a href={this.props.location.phone.ugly} itemProp="telephone">{this.props.location.phone.pretty}</a><br />
					Local: <a href={this.props.location.local.ugly} itemProp="telephone">{this.props.location.local.pretty}</a><br />
					Fax: <a href={this.props.location.fax.ugly} itemProp="faxNumber">{this.props.location.fax.pretty}</a><br />
				</div>
			</address>
		);
	}

}

export default Contact;
