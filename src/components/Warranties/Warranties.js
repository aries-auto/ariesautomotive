import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Warranties.scss';
import withStyles from '../../decorators/withStyles';
import { fields, fields2 } from './FormFields';
import WarrantiesStore from '../../stores/WarrantiesStore';
import WarrantiesActions from '../../actions/WarrantiesActions';
import Form from '../Form/Form';
import connectToStores from 'alt-utils/lib/connectToStores';

const title = 'Warranties';

@withStyles(s)
@connectToStores
class Warranties extends Component {

	static propTypes = {
		className: PropTypes.string,
		enabled: PropTypes.bool,
		inputs: PropTypes.object,
		success: PropTypes.bool,
		error: PropTypes.string,
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
		this.renderSuccess = this.renderSuccess.bind(this);
		this.enabled = false;
	}

	componentWillMount() {
		this.context.onSetTitle(title);
	}

	componentWillReceiveProps() {
		for (let i = 0; i < fields.length; i++) {
			if (!this.props.inputs[fields[i].name] || this.props.inputs[fields[i].name] === '') {
				return;
			}
		}
		for (let i = 0; i < fields2.length; i++) {
			if (!this.props.inputs[fields2[i].name] || this.props.inputs[fields2[i].name] === '') {
				return;
			}
		}
		this.enabled = true;
	}

	static getStores() {
		return [WarrantiesStore];
	}

	static getPropsFromStores() {
		return WarrantiesStore.getState();
	}

	getForm() {
		return (<Form fields={fields} />);
	}

	getForm2() {
		return (<Form fields={fields2} />);
	}

	submit(event) {
		event.preventDefault();
		WarrantiesActions.postData(this.props.inputs);
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
					<div className={cx('head')}>
						<h1>ONLINE WARRANTIES</h1>
						<p>In order to accept a warranty all ARIES products must have a warranty card completed with proof of purchase.</p>
					</div>
					<div>
						<form name="contactForm" role="form" noValidate>
							<div className="col-xs-12 col-md-6 col-lg-6">
								<h1>STEP 1 OF 4: PROVIDE PURCHASER INFORMATION</h1>
								<p><em>Please complete all fields.</em></p>
								{this.getForm()}
							</div>
							<div className="col-xs-12 col-md-6 col-lg-6">
								<h1>STEP 2 OF 4: PRODUCT REGISTRATION INFORMATION</h1>
								<p>
									<em>Find your registration sticker: </em>
									<a href="https://www.curtmfg.com/assets/aries/warranty/bullbarregistrationsticker.jpg" target="blank">Bull Bar | </a>
									<a href="https://www.curtmfg.com/assets/aries/warranty/grillguardregistrationsticker.jpg" target="blank">Grill Guard | </a>
									<a href="https://www.curtmfg.com/assets/aries/warranty/sidebarregistrationsticker.jpg" target="blank">Side Bar</a>
								</p>
								{this.getForm2()}
							</div>
							<div className="col-xs-12 col-md-6 col-lg-6">
								<h1>STEP 3 OF 4: CLICK SUBMIT BELOW.</h1>
								<h5>Click this button:</h5>
								<button type="submit" className={cx('btn btn-primary', s.submit)} disabled={!this.enabled} onClick={this.submit}>SUBMIT</button>
								{(this.props.success || this.props.error) ? this.renderSuccess() : null}
							</div>
							<div className={cx('col-xs-12 col-md-12 col-lg-12', s.step4)}>
								<h1>STEP 4 OF 4: FAX, MAIL, OR EMAIL PROOF OF PURCHASE TO THE FOLLOWING LOCATION TO COMPLETE REGISTRATION.</h1>
								<div className={s.contact}>
									<p>ATTN: WARRANTY DEPT.</p>
									<p></p>
									<p>ARIES AUTOMOTIVE</p>
									<p>2611 Regent Boulevard</p>
									<p>Suite 300</p>
									<p>DFW Airport, TX 75261 USA</p>
									<p></p>
									<p>Phone: (888) 635-9824</p>
									<p></p>
									<p>Fax: (972) 352-2617</p>
									<p>Email: <a href="mailto:customerservice@ariesautomotive.com">customerservice@ariesautomotive.com</a></p>
								</div>
								<p><em>Warranty registration is valid within 90 days from the date of purchase as stated on the proof of purchase receipt.</em></p>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}

}

export default Warranties;
