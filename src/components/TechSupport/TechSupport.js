import React, { Component, PropTypes } from 'react';
import ga from 'react-ga';
import s from './TechSupport.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';

const title = 'Technical Support';

@withStyles(s)
class TechSupport extends Component {

	static propTypes = {
		fields: PropTypes.array,
		error: PropTypes.bool,
	}

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateInput = this.validateInput.bind(this);
	}

	componentWillMount() {
		this.context.onSetTitle(title);
		this.setState({
			error: true,
			fields: [{
				name: 'firstName',
				type: 'text',
				label: 'First Name',
				placeholder: 'Enter your first name',
				required: true,
				errorMessage: 'First name is required',
				classes: 'form-group col-xs-6',
			}, {
				name: 'lastName',
				type: 'text',
				label: 'Last Name',
				placeholder: 'Enter your last name',
				required: true,
				errorMessage: 'Last name is required',
				classes: 'form-group col-xs-6',
			}, {
				name: 'phone',
				type: 'text',
				label: 'Phone Number',
				placeholder: 'Enter your phone number',
				required: true,
				errorMessage: 'Phone number is required',
				classes: 'form-group col-xs-6',
			}, {
				name: 'email',
				type: 'text',
				label: 'E-mail Address',
				placeholder: 'Enter your e-mail address',
				required: true,
				errorMessage: 'E-mail is required',
				classes: 'form-group col-xs-6',
				addon: {
					class: 'input-group-addon',
					text: '@',
				},
			}, {
				name: 'make',
				type: 'text',
				label: 'Vehicle Make',
				placeholder: 'Enter your vehicle make',
				required: false,
				classes: 'form-group col-xs-6',
			}, {
				name: 'model',
				type: 'text',
				label: 'Vehicle Model',
				placeholder: 'Enter your vehicle model',
				required: false,
				classes: 'form-group col-xs-6',
			}, {
				name: 'year',
				type: 'text',
				label: 'Vehicle Year',
				placeholder: 'Enter your vehicle year',
				required: false,
				classes: 'form-group col-xs-6',
			}, {
				name: 'dateOfPurchase',
				type: 'date',
				label: 'Date of Purchase',
				placeholder: 'Date of purchase',
				required: true,
				classes: 'form-group col-xs-6',
			}, {
				name: 'purchaseFrom',
				type: 'text',
				label: 'Purchased From',
				placeholder: 'Purchased from',
				required: false,
				classes: 'form-group col-xs-6',
			}, {
				name: 'dealerName',
				type: 'text',
				label: 'Dealer Name',
				placeholder: 'Enter the dealer name',
				required: false,
				classes: 'form-group col-xs-6',
			}, {
				name: 'productCode',
				type: 'text',
				label: 'Product Code',
				placeholder: 'Enter the product code',
				required: false,
				classes: 'form-group col-xs-6',
			}, {
				name: 'dateCode',
				type: 'text',
				label: 'Date Code',
				placeholder: 'Enter the date code',
				required: false,
				classes: 'form-group col-xs-6',
			}, {
				name: 'issue',
				type: 'textarea',
				label: 'Issue',
				placeholder: 'Please explain your issue',
				required: true,
				classes: 'form-group col-xs-12',
			}],
		});
	}

	validateInput(e) {
		let field;
		const fields = this.state.fields;
		fields.map((f) => {
			if (f.name === e.target.name) {
				field = f;
			}
		});

		field.error = false;
		if (field.required && e.target.value === '') {
			field.error = true;
		}

		let error = false;
		fields.map((f) => {
			f.value = this.refs[f.name].value;
			if (f.error) {
				error = true;
			}
		});

		this.setState({
			fields,
			error,
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		// TODO: wire up the submission of the data.

		// when the tech support form is submitted, handle the analytics
		ga.event({ category: 'Ariect:TechSupport', action: 'Submitted', label: 'Submitted' });
	}

	renderInputs() {
		const output = [];
		this.state.fields.map((f, i) => {
			if (f.type.toLowerCase() === 'textarea') {
				if (f.error) {
					output.push(
						<div key={i} className={f.classes}>
							<label htmlFor={f.name}>{f.label} {f.required ? '*' : '' }</label>
							<span className={cx(s.danger, 'text-danger')}>{f.errorMessage}</span>
							<textarea
								name={f.name}
								ref={f.name}
								id={f.name}
								className={cx(s.danger, 'form-control')}
								required={f.required}
								placeholder={f.placeholder}
								onBlur={this.validateInput}
							></textarea>
						</div>
					);
				} else {
					output.push(
						<div key={i} className={f.classes}>
							<label htmlFor={f.name}>{f.label} {f.required ? '*' : '' }</label>
							<textarea
								name={f.name}
								ref={f.name}
								id={f.name}
								className="form-control"
								required={f.required}
								placeholder={f.placeholder}
								onBlur={this.validateInput}
							></textarea>
						</div>
					);
				}
			} else if (f.addon) {
				if (f.error) {
					output.push(
						<div key={i} className={f.classes}>
							<label htmlFor={f.name}>{f.label} {f.required ? '*' : '' }</label>
							<span className={cx(s.danger, 'text-danger')}>{f.errorMessage}</span>
							<div className="input-group">
								<span className={f.addon.class}>{f.addon.text}</span>
								<input
									type={f.type}
									id={f.name}
									className={cx(s.danger, 'form-control')}
									name={f.name}
									ref={f.name}
									placeholder={f.placeholder}
									required={f.required}
									onBlur={this.validateInput}
								/>
							</div>
						</div>
					);
				} else {
					output.push(
						<div key={i} className={f.classes}>
							<label htmlFor={f.name}>{f.label} {f.required ? '*' : '' }</label>
							<div className="input-group">
								<span className={f.addon.class}>{f.addon.text}</span>
								<input
									type={f.type}
									id={f.name}
									className="form-control"
									name={f.name}
									ref={f.name}
									placeholder={f.placeholder}
									required={f.required}
									onBlur={this.validateInput}
								/>
							</div>
						</div>
					);
				}
			} else {
				if (f.error) {
					output.push(
						<div key={i} className={f.classes}>
							<label htmlFor={f.name}>{f.label} {f.required ? '*' : '' }</label>
							<span className={cx(s.danger, 'text-danger')}>{f.errorMessage}</span>
							<input
								type={f.type}
								id={f.name}
								className={cx(s.danger, 'form-control')}
								name={f.name}
								ref={f.name}
								placeholder={f.placeholder}
								required={f.required}
								schema={f}
								onBlur={this.validateInput}
							/>
						</div>
					);
				} else {
					output.push(
						<div key={i} className={f.classes}>
							<label htmlFor={f.name}>{f.label} {f.required ? '*' : '' }</label>
							<input
								type={f.type}
								id={f.name}
								className="form-control"
								name={f.name}
								ref={f.name}
								placeholder={f.placeholder}
								required={f.required}
								schema={f}
								onBlur={this.validateInput}
							/>
						</div>
					);
				}
			}
		});

		return output;
	}

	renderAction() {
		if (this.state.error) {
			return (
				<button disabled name="submit" type="submit" className="btn btn-large btn-primary">Submit</button>
			);
		}

		return (
			<button name="submit" type="submit" className="btn btn-large btn-primary">Submit</button>
		);
	}

	render() {
		return (
			<div className="container">
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
					{this.renderInputs()}

					<div className="form-group col-xs-12">
						<label htmlFor="submit"></label>
						{this.renderAction()}
					</div>
				</form>
			</div>
		);
	}

}

export default TechSupport;
