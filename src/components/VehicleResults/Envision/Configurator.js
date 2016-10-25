import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Configurator.scss';
import withStyles from '../../../decorators/withStyles';
import VehicleActions from '../../../actions/VehicleActions';
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
		VehicleActions.setEnvisionColor(id);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<Display click={this.handleColorClick} loading={this.props.envision.loading || false} image={this.props.envision.image} />
				<div className={'disclaimer'}>
					<span>* Please note that this is a representative image and may not exactly match your trim package.</span>
				</div>
				<PartList products={this.props.envision.matchedProducts} />
			</div>
		);
	}

}

export default Configurator;
