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
		activeCategory: PropTypes.object,
		showStyle: PropTypes.bool,
		parts: PropTypes.array,
		style: PropTypes.object,
	};

	constructor() {
		super();
		this.showStyleChoices = this.showStyleChoices.bind(this);
		this.getStyleChoices = this.getStyleChoices.bind(this);
		this.showStyleChoices = this.showStyleChoices.bind(this);
		this.unhideChoices = this.unhideChoices.bind(this);
		this.setVehicleStyle = this.setVehicleStyle.bind(this);
		this.getParts = this.getParts.bind(this);
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	getStyleChoices() {
		if (!this.props.activeCategory || !this.props.activeCategory.style_options) {
			return [];
		}

		this.props.activeCategory.style_options.sort((a, b) => {
			return a.style > b.style;
		});
		const styleOptions = [];
		this.props.activeCategory.style_options.map((option, i) => {
			styleOptions.push(
				<li key={i} onClick={this.setVehicleStyle.bind(this, option)} value={option.style}>
					{option.style.toUpperCase()}
				</li>
			);
		});
	}

	setVehicleStyle(style) {
		VehicleActions.setStyle(style);
	}

	getParts() {
		const parts = this.props.style.parts;
		if (!parts || parts.length < 1) {
			return <h3 className={s.noParts}>No parts for this style</h3>;
		}
		return (<PartResults parts={parts} className={s.partResults}/>);
	}

	unhideChoices() {
		VehicleActions.setShowStyleState(true);
	}

	showStyleChoices() {
		return (
			<div className={s.styleChoices}>
				<ul>
					{this.getStyleChoices()}
				</ul>
				<span />
			</div>
		);
	}

	renderStyleChoices() {
		if (
			!this.props.activeCategory.style_options ||
			this.props.activeCategory.style_options.length === 0
		) {
			return <span></span>;
		}
		if (
			this.props.activeCategory.style_options.length === 1 &&
			this.props.activeCategory.style_options[0].style.toLowerCase() === 'all'
		) {
			return <span></span>;
		}
		return (
			<div className={s.greybox}>
				<div>
					<span className={s.selTopBar}>Please select a style that properly matches your vehicle.</span>
				</div>
				<div className={s.styleSelect}>
					<button className={cx('btn btn-default', s.styleButton)} type="button" data-toggle="dropdown" onClick={this.unhideChoices}>{(this.props.style && !this.props.showStyle) ? this.props.style.style : 'Select a Style'} <span className="caret"></span></button>
					{(this.props && this.props.showStyle) ? this.showStyleChoices() : null}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className={s.root}>
				<h1 className={s.categoryName}>{this.props.activeCategory.category ? this.props.activeCategory.category.title : null}</h1>
				<hr/>
				{this.renderStyleChoices()}
				<div>
					{this.props.style ? this.getParts() : ''}
				</div>
			</div>
		);
	}

}

export default VehicleStyle;
