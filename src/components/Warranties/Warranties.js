import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Alert from '../Alert';
import s from './Warranties.scss';
import withStyles from '../../decorators/withStyles';
import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';
import Form from '../Form/Form';
import connectToStores from 'alt-utils/lib/connectToStores';
import warrantyData, { fields, fields2 } from '../../data/warranties';

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
		return [ContactStore];
	}

	static getPropsFromStores() {
		return ContactStore.getState();
	}

	submit(event) {
		event.preventDefault();
		ContactActions.postData(this.props.inputs);
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
						<form name="contactForm" role="form" noValidate onSubmit={this.submit}>
							<div className="col-xs-12 col-md-6 col-lg-6">
								<h1>STEP 1 OF 4: PROVIDE PURCHASER INFORMATION</h1>
								<p><em>Please complete all fields.</em></p>
								<Form fields={fields} />
							</div>
							<div className="col-xs-12 col-md-6 col-lg-6">
								<h1>STEP 2 OF 4: PRODUCT REGISTRATION INFORMATION</h1>
								<p>
									<em>Find your registration sticker: </em>
									{warrantyData.registrationStickerHtml}
								</p>
								<Form fields={fields2} />
							</div>
							<div className="col-xs-12 col-md-6 col-lg-6">
								<h1>STEP 3 OF 4: CLICK SUBMIT BELOW.</h1>
								<h5>Click this button:</h5>
								<button type="submit" className={cx('btn btn-primary', s.submit)} disabled={!this.enabled}>SUBMIT</button>
								<Alert success={this.props.success} error={this.props.error} />
							</div>
							<div className={cx('col-xs-12 col-md-12 col-lg-12', s.step4)}>
								<h1>STEP 4 OF 4: FAX, MAIL, OR EMAIL PROOF OF PURCHASE TO THE FOLLOWING LOCATION TO COMPLETE REGISTRATION.</h1>
								<div className={s.contact}>
									{warrantyData.addressHtml}
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
