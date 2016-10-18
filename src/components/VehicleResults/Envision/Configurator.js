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
		className: PropTypes.string,
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<Display loading={(this.props.envision.image === null)} image={this.props.envision.image} />
				<PartList products={this.props.envision.matchedProducts} />
			</div>
		);
	}

}

export default Configurator;
