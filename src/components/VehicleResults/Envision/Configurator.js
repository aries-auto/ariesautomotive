import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Configurator.scss';
import withStyles from '../../../decorators/withStyles';
import Display from './Display';
import PartList from './PartList';

@withStyles(s)
class Configurator extends Component {

	static propTypes = {
		products: PropTypes.array,
		envision: PropTypes.object,
		window: PropTypes.object,
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);

		let id = '';
		if (props.envision && props.envision.vehicleParts) {
			props.envision.vehicleParts.sort((a, b) => a.parts.length > b.parts.length);
			id = props.envision.vehicleParts[0].vehicle.intVehicleID;
		}

		this.state = {
			vehicleID: id,
		};
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<Display window={this.props.window} products={this.props.envision.matchedProducts} id={this.props.envision.vehicleID} />
				<PartList products={this.props.envision.matchedProducts} />
			</div>
		);
	}

}

export default Configurator;
