import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Warranties.scss';
import withStyles from '../../decorators/withStyles';
import { fields, fields2 } from './FormFields';
import WarrantiesStore from '../../stores/WarrantiesStore';
import WarrantiesActions from '../../actions/WarrantiesActions';
import Form from '../Form/Form';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Warranties extends Component {

	static propTypes = {
		className: PropTypes.string,
		enabled: PropTypes.bool,
		inputs: PropTypes.array,
	};

	constructor() {
		super();
		this.submit = this.submit.bind(this);
		this.enabled = false;
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

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div className={cx('visible-sm visible-md visible-lg internal-hero', s.hero)}></div>
				<div className={cx(s.container, 'container')}>

					<div className="col-xs-12 col-md-6 col-lg-6">
						<div className={cx('head')}>
							<h1>ONLINE WARRANTIES</h1>
							<p>In order to accept a warranty all ARIES products must have a warranty card completed with proof of purchase.</p>
						</div>
						<form name="contactForm" role="form" noValidate>
							<h1>STEP 1 OF 4: PROVIDE PURCHASER INFORMATION</h1>
							{this.getForm()}
							<h1>STEP 2 OF 4: PRODUCT REGISTRATION INFORMATION</h1>
							{this.getForm2()}
							<div className="form-group col-xs-12">
							<h1>STEP 3 OF 4: CLICK SUBMIT BELOW.</h1>
								<button type="submit" className="btn btn-primary" disabled={!this.enabled} onClick={this.submit}>SUBMIT</button>
							</div>
							<h1>STEP 4 OF 4: FAX, MAIL, OR EMAIL PROOF OF PURCHASE TO THE FOLLOWING LOCATION TO COMPLETE REGISTRATION.</h1>
							<div>
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
								<p>Email: customerservice@ariesautomotive.com</p>
							</div>
						</form>
					</div>
				</div>
			</div>

		);
	}

}

export default Warranties;
