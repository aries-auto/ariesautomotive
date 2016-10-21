import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Display.scss';
import ColorSwatches from './ColorSwatches';
import Spinner from '../../Spinner';
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
		if (!this.props.image || !this.props.image.source || this.props.image.source.Host === '') {
			return (
				<div className={cx(s.root, this.props.className, s.noImage)} id="vehicle-display">
					<img src="//storage.googleapis.com/aries-website/site-assets/no-envision.svg" alt="No Image Available"/>
				</div>
			);
		}

		return (
			<div className={cx(s.root, this.props.className)} id="vehicle-display">
				<div className={this.props.loading ? s.loading : null}>
					{ this.props.loading ? <Spinner className={s.spinner} /> : null}
				</div>
				<div>
					<div>
						<img src={`//${this.props.image.source.Host}${this.props.image.source.Path}`} alt={this.props.vehicle} />
					</div>

					<ColorSwatches click={this.props.click} colors={this.props.image ? this.props.image.colors || [] : []} />
				</div>

			</div>
		);
	}

}

export default Configurator;
