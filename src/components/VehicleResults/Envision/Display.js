import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Display.scss';
import ColorSwatches from './ColorSwatches';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class Configurator extends Component {

	static propTypes = {
		className: PropTypes.string,
		image: PropTypes.object.isRequired,
		click: PropTypes.func.isRequired,
		vehicle: PropTypes.string,
		loading: PropTypes.bool,
	};

	render() {
		let img = '';
		if (this.props.image && this.props.image.source && this.props.image.source.Host !== '') {
			img = `//${this.props.image.source.Host}${this.props.image.source.Path}`;
		}

		return (
			<div className={cx(s.root, this.props.className)}>
				<div>
					<img src={img} alt={this.props.vehicle} />
				</div>
				<ColorSwatches click={this.props.click} colors={this.props.image.colors || []} />
			</div>
		);
	}

}

export default Configurator;
