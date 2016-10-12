import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Contact.scss';
import { brand } from '../../config';
import withStyles from '../../decorators/withStyles';
import { fields } from '../../data/contact';
import GeographyStore from '../../stores/GeographyStore';
import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import Form from '../Form/Form';
import { locations, main } from '../../data/locations';
import { phone } from '../../data/contact';
import MainLocation from './MainLocation';
import SupportLocations from './SupportLocations';

const title = `Contact ${brand.name}`;

@withStyles(s)
@connectToStores
class Contact extends Component {

	static propTypes = {
		className: PropTypes.string,
		countries: PropTypes.array,
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
		return [GeographyStore, ContactStore];
	}

	static getPropsFromStores() {
		return {
			...GeographyStore.getState(),
			...ContactStore.getState(),
		};
	}

	submit(event) {
		event.preventDefault();
		ContactActions.postContactData(this.props.inputs.reason ? this.props.inputs.reason : brand.defaultContactType);
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
						<form name="contactForm" role="form" noValidate onSubmit={this.submit}>
							<Form fields={fields} />
							<div className="form-group col-xs-12">
								<button type="submit" className="btn btn-primary" disabled={!this.enabled}>SEND</button>
							</div>
						</form>
						{(this.props.success || this.props.error) ? this.renderSuccess() : null}
					</div>
					<div className="col-xs-12 col-md-6 col-lg-6">
						<div className={cx('head')}>
							<h1>OUR LOCATIONS</h1>
						</div>
						<div className={s.addresses}>
							<div className={s.techsupport}><h4>TECH SUPPORT HOTLINE: {phone}</h4></div>
							<MainLocation location={main} className={s.mainLocation} />
							<SupportLocations locations={locations} />
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default Contact;
