import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './PartResults.scss';
import QuickView from '../Product/QuickView';
import withStyles from '../../decorators/withStyles';
import VehicleStore from '../../stores/VehicleStore';
import connectToStores from 'alt-utils/lib/connectToStores';


@withStyles(s)
@connectToStores
class PartResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		parts: PropTypes.array,
		vehicle: PropTypes.object,
		envision: PropTypes.object,
	};

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	render() {
		const parts = this.props.parts.map((part, i) => {
			return (
				<QuickView
					product={part}
					key={i}
					envision={this.props.envision}
					vehicle={this.props.vehicle}
				/>
			);
		});
		return (
			<div className={cx(s.root, this.props.className)} role="navigation">
				{parts}
			</div>
		);
	}

}

export default PartResults;
