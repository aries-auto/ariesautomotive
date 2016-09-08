import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { Panel } from 'rc-collapse';
import s from './VehicleStyle.scss';
import withStyles from '../../../decorators/withStyles';
import VehicleActions from '../../../actions/VehicleActions';
import PartResults from '../../PartResults/PartResults';

@withStyles(s)
class VehicleStyle extends Component {
	static propTypes = {
		className: PropTypes.string,
		category: PropTypes.object,
		showStyle: PropTypes.bool,
		parts: PropTypes.array,
		style: PropTypes.object,
	};

	getStyleChoices() {
		const styleOptions = [];
		let styles = {};
		styles = this.props.category.style_options;

		for (const i in styles) {
			if (!i) {
				return styleOptions;
			}
			styleOptions.push(
				<li key={i} onClick={this.setVehicleStyle.bind(this, styles[i])} value={styles[i].style}>
					{styles[i].style.toUpperCase()}
				</li>
			);
		}
		return styleOptions;
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
			!this.props.category.style_options ||
			this.props.category.style_options.length === 0
		) {
			return <span></span>;
		}
		if (
			this.props.category.style_options.length === 1 &&
			this.props.category.style_options[0].style.toLowerCase() === 'all'
		) {
			return <span></span>;
		}

		return (
			<div className={s.greybox}>
				<div className={s.styleSelect}>
					<button className={cx('btn btn-default', s.styleButton)} type="button" data-toggle="dropdown" onClick={this.unhideChoices}>{(this.props.style && !this.props.showStyle) ? this.props.style.style : 'Select a Style'} <span className="caret"></span></button>
					{(this.props && this.props.showStyle) ? this.showStyleChoices() : null}
				</div>
			</div>
		);
	}

	render() {
		if (!this.props.category || !this.props.category.category) {
			return <div></div>;
		}

		const content = (
			<div className={s.root}>
				{this.renderStyleChoices()}
				<div>
					{this.props.style ? this.getParts() : ''}
				</div>
			</div>
		);

		return (
			<Panel
				key={this.props.category.category.id.toString()}
				prefixCls={this.props.category.category.id.toString()}
				children={content}
				isActive
			/>
		);
	}

}

export default VehicleStyle;
