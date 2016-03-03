import React, { Component, PropTypes } from 'react';
// import cx from 'classnames';
import s from './VehicleStyle.scss';
// import Location from '../../core/Location';
import withStyles from '../../../decorators/withStyles';
import VehicleStore from '../../../stores/VehicleStore';
// import VehicleActions from '../../actions/VehicleActions';
import PartResults from '../../PartResults/PartResults';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class VehicleStyle extends Component {
	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.shape({
			params: PropTypes.shape({
				year: PropTypes.string,
				make: PropTypes.string,
				model: PropTypes.string,
			}),
		}),
		vehicle: PropTypes.shape({
			year: PropTypes.string,
			make: PropTypes.string,
			model: PropTypes.string,
			categoryparts: PropTypes.object,
			style: PropTypes.string,
		}),
		categoryparts: PropTypes.object,
		category: PropTypes.string,
	};
	constructor() {
		super();
		this.getStyleOptions = this.getStyleOptions.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	getStyleOptions() {
		const styleOptions = [];
		let styles = {};
		for (const i in this.props.categoryparts) {
			if (i === this.props.category) {
				styles = this.props.categoryparts[i].available_styles;
			}
		}

		for (const i in styles) {
			if (!i) {
				return styleOptions;
			}
			styleOptions.push(
				<option key={i} value={styles[i]}>{styles[i].toUpperCase()}
				</option>
			);
		}
		return styleOptions;
	}

	handleChange(event) {
		this.setState({
			vehicle: {
				style: event.target.value,
			},
		});
	}

	render() {
		return (
			<div className={s.root}>
				<div>
					<span className={s.selTopBar}>Please select a style that properly matches your vehicle.</span>
				</div>
				<select className={s.dropdownMenu} onChange={this.handleChange}>
					<option value="">--Choose a Style--</option>
					{this.getStyleOptions()}
				</select>
				<div>
					{this.state && this.state.vehicle && this.state.vehicle.style ? <PartResults parts={this.props.categoryparts[this.props.category].parts} className={s.partResults}/> : ''}
				</div>
			</div>
		);
	}

}

export default VehicleStyle;
