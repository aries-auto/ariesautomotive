import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './AddToVehicle.scss';
import withStyles from '../../decorators/withStyles';
import VehicleActions from '../../actions/VehicleActions';

@withStyles(s)
class AddToVehicle extends Component {

	static propTypes = {
		className: PropTypes.string,
		vehicle: PropTypes.object,
		part: PropTypes.object.isRequired,
		layer: PropTypes.object.isRequired,
		envision: PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.handler = this.handler.bind(this);
	}

	handler() {
		VehicleActions.addEnvisionPart(this.props.part, this.props.layer);
	}

	isActive() {
		if (!this.props.envision || !this.props.envision.matchedProducts) {
			return false;
		}

		let exists = false;
		this.props.envision.matchedProducts.map((p) => {
			if (p.id === this.props.part.id) {
				exists = true;
			}
		});

		return exists;
	}

	render() {
		if (!this.props.envision || !this.props.envision.matchedProducts) {
			return <span></span>;
		}

		const active = this.isActive();
		return (
			<a
				className={cx(
					'btn',
					'red-transparent-button',
					this.props.className,
					s.root,
					active ? s.active : '',
				)}
				role="button"
				onClick={this.handler}
			>
				{ active ? 'Added To Vehicle' : 'Add To Vehicle'}
			</a>
		);
	}

}

export default AddToVehicle;
