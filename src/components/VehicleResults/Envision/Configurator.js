import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Configurator.scss';
import withStyles from '../../../decorators/withStyles';
import VehicleStore from '../../../stores/VehicleStore';
import Display from './Display';
import PartList from './PartList';

@withStyles(s)
class Configurator extends Component {

	static propTypes = {
		products: PropTypes.array,
		envision: PropTypes.object,
		className: PropTypes.string,
	};

	constructor() {
		super();

		this.handleColorClick = this.handleColorClick.bind(this);
	}

	handleColorClick(id) {
		VehicleStore.fetchEnvision(
			this.props.envision.vehicle.year,
			this.props.envision.vehicle.make,
			this.props.envision.vehicle.model,
			id,
			this.props.envision.matchedProducts,
		);
	}

	render() {
		if (!this.props.envision.image) {
			return <div></div>;
		}

		return (
			<div className={cx(s.root, this.props.className)}>
				<Display click={this.handleColorClick} loading={this.props.envision.loading || false} image={this.props.envision.image} />
				<PartList products={this.props.envision.matchedProducts} />
			</div>
		);
	}

}

export default Configurator;
