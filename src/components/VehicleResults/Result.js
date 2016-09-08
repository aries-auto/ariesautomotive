import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import VehicleActions from '../../actions/VehicleActions';
import s from './Result.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Result extends Component {

	static propTypes = {
		result: PropTypes.object.isRequired,
		activeIndex: PropTypes.number,
		className: PropTypes.string,
	};

	constructor() {
		super();

		this.updateStyle = this.updateStyle.bind(this);
	}

	updateStyle(e) {
		e.preventDefault();

		VehicleActions.setStyle(this.props.result.category, this.refs.style.value);
	}

	renderStyles() {
		if (
			!this.props.result.style_options ||
			this.props.result.style_options.length === 0 ||
			this.props.result.style_options[0].style.toLowerCase() === 'all'
		) {
			return null;
		}

		return (
			<div className={'form-group'}>
				<select ref="style" onChange={this.updateStyle} className="form-control">
					<option value="">- Select Style -</option>
					{this.props.result.style_options.map((so) => <option>{so.style.toUpperCase()}</option>)}
				</select>
			</div>
		);
	}

	render() {
		if (
			!this.props.activeIndex ||
			!this.props.result.category
		) {
			return <div></div>;
		}

		return (
			<div
				className={cx(
					s.root,
					this.props.className,
					(this.props.activeIndex === this.props.result.category.id) ? s.active : '',
				)}
			>
				<div className={s.header}>
					<span>{this.props.result.category.title}</span>
					{this.renderStyles()}
				</div>
			</div>
		);
	}

}

export default Result;
