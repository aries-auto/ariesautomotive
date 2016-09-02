import React, { Component, PropTypes } from 'react';
import FormField from '../FormField/FormField';

class Form extends Component {

	static propTypes = {
		fields: PropTypes.array,
	};

	render() {
		const output = [];
		for (const i in this.props.fields) {
			if (!this.props.fields[i]) {
				continue;
			}
			this.props.fields[i].key = i;
			output.push(
				<FormField key={i} field={this.props.fields[i]} />
			);
		}
		return <div>{output}</div>;
	}
}

export default Form;
