import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './VehicleStyle.scss';
import withStyles from '../../../decorators/withStyles';
import VehicleStore from '../../../stores/VehicleStore';
import VehicleActions from '../../../actions/VehicleActions';
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
		showStyle: PropTypes.bool,
		parts: PropTypes.array,
	};
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.showStyleChoices = this.showStyleChoices.bind(this);
		this.getStyleChoices = this.getStyleChoices.bind(this);
		this.showStyleChoices = this.showStyleChoices.bind(this);
		this.unhideChoices = this.unhideChoices.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.getCategoryPartsForVehicleStyle = this.getCategoryPartsForVehicleStyle.bind(this);
	}

	componentWillMount() {
		if (this.checkForStyleAll(this.props.categoryparts[this.props.category])) {
			VehicleActions.setParts(this.props.categoryparts[this.props.category].parts);
			this.props.vehicle.style = 'all';
		}
	}

	componentWillUpdate(props) {
		if (this.props.parts !== null && this.props.parts === props.parts) {
			return;
		}
		if (this.checkForStyleAll(this.props.categoryparts[props.category])) {
			VehicleActions.setParts(this.props.categoryparts[props.category].parts);
			this.props.vehicle.style = 'all';
		} else {
			this.props.vehicle.style = null;
		}
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	getStyleChoices() {
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
				<li key={i} onClick={this.handleClick.bind(this, styles[i])} value={styles[i]}>{styles[i].toUpperCase()}
				</li>
			);
		}
		return styleOptions;
	}

	getCategoryPartsForVehicleStyle(parts, style) {
		const returnedParts = [];
		for (const i in parts) {
			if (!parts[i]) {
				continue;
			}
			const p = this.findVehicleApplicationMatch(parts[i], style);
			if (p) {
				returnedParts.push(p);
			}
		}
		return returnedParts;
	}

	checkForStyleAll(cat) {
		if (cat.available_styles.length === 1 && cat.available_styles[0].toLowerCase() === 'all') {
			return true;
		}
		return false;
	}

	findVehicleApplicationMatch(part, style) {
		for (const j in part.vehicle_applications) {
			if (!part.vehicle_applications[j]) {
				continue;
			}
			if (part.vehicle_applications[j].make.toString() === this.props.vehicle.make && part.vehicle_applications[j].model.toString() === this.props.vehicle.model && part.vehicle_applications[j].year.toString() === this.props.vehicle.year && part.vehicle_applications[j].style === style) {
				return part;
			}
		}
	}

	showStyleChoices() {
		return (
			<div className={s.styleChoices}>
				<ul>
					{this.getStyleChoices()}
				</ul>
			</div>
		);
	}

	unhideChoices() {
		VehicleActions.setShowStyleState(true);
	}

	handleChange(event) {
		VehicleActions.set(event.target.value);
	}

	handleClick(style) {
		const v = {
			year: this.props.vehicle.year,
			make: this.props.vehicle.make,
			model: this.props.vehicle.model,
			style,
		};
		VehicleActions.set(v);
		const parts = this.getCategoryPartsForVehicleStyle(this.props.categoryparts[this.props.category].parts, style);
		VehicleActions.setParts(parts);
		VehicleActions.setShowStyleState(false);
	}

	render() {
		return (
			<div className={s.root}>
				<div className={s.greybox}>
					<span className={s.selTopBar}>Please select a style that properly matches your vehicle.</span>
					<span className={s.container}>
						<button className={cx('btn btn-default', s.styleButton)} type="button" data-toggle="dropdown" onClick={this.unhideChoices}>{this.props.vehicle.style ? this.props.vehicle.style : 'Select a Style'} <span className="caret"></span></button>
						<br />{this.props && this.props.showStyle ? this.showStyleChoices() : ''}
					</span>
				</div>
				<div>
					{this.props && this.props.parts && this.props.parts.length ? <PartResults parts={this.props.parts} className={s.partResults}/> : ''}
				</div>
			</div>
		);
	}

}

export default VehicleStyle;
