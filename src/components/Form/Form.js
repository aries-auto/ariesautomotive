import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import FormField from '../FormField/FormField';
import FormFieldStore from '../../stores/FormFieldStore';
// import FormFieldActions from '../../actions/FormFieldActions';
import connectToStores from 'alt-utils/lib/connectToStores';

@connectToStores
class Form extends Component {

	static propTypes = {
		fields: PropTypes.array,
		inputs: PropTypes.object,
	};

	constructor() {
		super();
	}

	static getStores() {
		return [FormFieldStore];
	}

	static getPropsFromStores() {
		return FormFieldStore.getState();
	}

	getFields() {
		const output = [];
		for (const i in this.props.fields) {
			if (!this.props.fields[i]) {
				continue;
			}
			this.props.fields[i].key = i;
			output.push(<FormField key={i} field={this.props.fields[i]} />);
		}
		return output;
	}

	render() {
		return (
			<div className={cx('form_field')}>
				{this.getFields()}
			</div>

		);
	}

}

export default Form;
