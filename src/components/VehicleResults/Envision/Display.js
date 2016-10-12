import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Display.scss';
import Alert from '../../Alert';
import withStyles from '../../../decorators/withStyles';
import VehicleActions from '../../../actions/VehicleActions';

@withStyles(s)
class Configurator extends Component {

	static propTypes = {
		id: PropTypes.string,
		products: PropTypes.array,
		className: PropTypes.string,
		window: PropTypes.object,
		colorID: PropTypes.number,
	};

	constructor() {
		super();

		this.state = {};
	}

	componentDidMount() {
		this.props.window.onerror = () => {
			this.setState({
				error: `No image of vehicle with parts available.`,
			});
		};

		const ul = document.getElementById('vehicle-ref-colors');
		ul.addEventListener('click', (e) => {
			let target = e.target;
			while (target && target.parentNode !== ul) {
				target = target.parentNode;
				if (!target) {
					return;
				}
			}
			if (target.tagName === 'LI') {
				const colorID = parseInt(target.getAttribute('data-id'), 0);
				VehicleActions.setEnvisionColor(colorID || 0);
			}
		});
	}

	componentDidUpdate() {
		if (window.ICAPP) {
			window.ICAPP.getRefVehicle();
		}
	}

	render() {
		if (this.state.error) {
			const err = {
				message: this.state.error,
			};

			return <div className={s.error}><Alert error={err} /></div>;
		}

		const prods = this.props.products.map((p) => p.part_number);

		return (
			<div className={cx(s.root, this.props.className)} id="vehicle-display">
				<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
				<script src="https://storage.googleapis.com/aries-website/site-assets/envision.js"></script>
				<div
					className={cx('vehicle-wrapper', s.vehicleWrapper)}
					id="ic-vehicle-wrapper"
					data-color={this.props.colorID || 0}
					data-part={prods.join(',')}
					data-vehicleid={this.props.id}
					title="The Vehicle Accessory Desc"
				></div>
			</div>
		);
	}

}

export default Configurator;
