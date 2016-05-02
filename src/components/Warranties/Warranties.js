import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Warranties.scss';
import withStyles from '../../decorators/withStyles';
import { fields } from './FormFields';
import WarrantiesStore from '../../stores/WarrantiesStore';
// import WarrantiesActions from '../../actions/WarrantiesActions';
import FormFieldActions from '../../actions/FormFieldActions';
import FormField from '../FormField/FormField';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Warranties extends Component {

	static propTypes = {
		className: PropTypes.string,
		inputs: PropTypes.array,
		enabled: PropTypes.bool,
	};

	constructor() {
		super();
		this.submit = this.submit.bind(this);
		this.checkDisabled = this.checkDisabled.bind(this);
	}

	componentWillUpdate() {
		this.checkDisabled();
	}

	static getStores() {
		return [WarrantiesStore];
	}

	static getPropsFromStores() {
		return WarrantiesStore.getState();
	}

	getForm() {
		const output = [];
		for (const i in fields) {
			if (!fields[i]) {
				continue;
			}
			fields[i].key = i;
			output.push(<FormField key={i} field={fields[i]} inputs={this.props.inputs} />);
		}
		return output;
	}

	checkDisabled() {
		for (const i in fields) {
			if (!fields[i]) {
				continue;
			}
			console.log(fields[i]);
			if (fields[i].required === true) {
				const f = this.props.inputs[fields[i].name];
				if (!f || f === undefined) {
					FormFieldActions.setFormValidation(false);
					return;
				}
			}
		}
		FormFieldActions.setFormValidation(true);
	}

	submit(event) {
		event.preventDefault();
		// WarrantiesActions.postContactData(this.props.inputs.reason);
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
							{this.getForm()}
							<div className="form-group col-xs-12">
								<button type="submit" className="btn btn-primary" disabled={!this.props.enabled} onClick={this.submit}>SUBMIT</button>
							</div>
						</form>
					</div>
				</div>
			</div>

		);
	}

}

export default Warranties;
