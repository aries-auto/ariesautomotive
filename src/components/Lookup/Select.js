import React, { Component, PropTypes } from 'react';
import s from './Select.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Select extends Component {

	static propTypes = {
		className: PropTypes.string,
		name: PropTypes.string,
		change: PropTypes.func,
		aria: PropTypes.string,
		placeholder: PropTypes.string,
		values: PropTypes.array,
		disabled: PropTypes.bool,
	};

	options() {
		const opts = [];
		if (this.props.placeholder && this.props.placeholder !== '') {
			opts.push(
				<option key={0} value="">{this.props.placeholder}</option>
			);
		}

		if (!this.props.values || this.props.values.length === 0) {
			return opts;
		}

		this.props.values.map((val, i) => {
			const up = val.toUpperCase();
			opts.push(
				<option key={i + 1} value={up}>{ up }</option>
			);
		});

		return opts;
	}

	render() {
		return (
			<div disabled={this.props.disabled} className={cx(
					this.props.className || '',
				)}
			>
				<select
					className="form-control"
					name={this.props.name}
					onChange={this.props.change}
					aria-labelledby={this.props.aria}
					disabled={this.props.disabled}
				>
						{this.options()}
				</select>
			</div>
		);
	}
}

export default Select;
