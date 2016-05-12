import React, { Component, PropTypes } from 'react';
import ga from 'react-ga';
import s from './TechSupport.scss';
import { fields } from './fields';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import TechSupportStore from '../../stores/TechSupportStore';
import TechSupportActions from '../../actions/TechSupportActions';
import Form from '../Form/Form';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class TechSupport extends Component {

	static propTypes = {
		fields: PropTypes.array,
		error: PropTypes.bool,
		inputs: PropTypes.object,
		success: PropTypes.object,
	}

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.submit = this.submit.bind(this);
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
		return [TechSupportStore];
	}

	static getPropsFromStores() {
		return TechSupportStore.getState();
	}

	submit(event) {
		event.preventDefault();
		ga.event({ category: 'Ariect:TechSupport', action: 'Submitted', label: 'Submitted' });
		TechSupportActions.postContactData();
	}

	renderForm() {
		return (<Form fields={fields} />);
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
			<div className={cx('container', s.container)}>
				<h1>TECH SUPPORT</h1>
				<p><em>For tech support, you may:</em></p>
				<div className="row">
					<div className={cx(s.content, 'col-xs-6', 'col-sm-6', 'col-md-6', 'col-lg-6')} >
						<p>Contact our tech support hotline, 844-278-HELP(4357).</p>
						<p>Submit an email to: <a href="mailto:techsupport@ariesautomotive.com">techsupport@ariesautomotive.com</a>.</p>
						<p>Submit the form below:</p>
					</div>
				</div>
				<form onSubmit={this.handleSubmit}>
					{this.renderForm()}

					<div className="form-group col-xs-12">
						<label htmlFor="submit"></label>
						<button disabled={!this.enabled} name="submit" type="submit" className="btn btn-large btn-primary" onClick={this.submit}>Submit</button>
					</div>
					{(this.props.success || this.props.error) ? this.renderSuccess() : null}
				</form>
			</div>
		);
	}

}

export default TechSupport;
