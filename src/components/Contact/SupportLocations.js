import React, { Component, PropTypes } from 'react';
import s from './Contact.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class SupportLocations extends Component {

	static propTypes = {
		className: PropTypes.string,
		locations: PropTypes.array,
	};

	render() {
		const output = [];

		(this.props.locations || []).map((location, i) => {
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
						Phone: <a href={`tel:+${location.phone}`} itemProp="telephone">{location.phone}</a><br />
						Fax: <a href={`tel:+${location.fax}`} itemProp="faxNumber">{location.fax}</a><br />
					</div>
				</address>
			);
		});

		return <div>{output}</div>;
	}
}

export default SupportLocations;
