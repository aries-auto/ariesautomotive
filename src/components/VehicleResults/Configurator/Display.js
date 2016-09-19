import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Configurator.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class Configurator extends Component {

	static propTypes = {
		id: PropTypes.string,
		parts: PropTypes.array,
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			ids: [],
		};
	}

	componentDidMount() {
		window.ICAPP.getRefVehicle();
	}

	componentWillReceiveProps(props) {
		const ids = [];
		(props.parts || []).map((p) => {
			ids.push(p.part_number);
		});

		if (ids.length !== this.state.ids.length) {
			this.setState({
				ids,
			});
		}
	}

	componentDidUpdate() {
		window.ICAPP.getRefVehicle();
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div
					className={cx('vehicle-wrapper', s.vehicleWrapper)}
					id="ic-vehicle-wrapper"
					data-part={(this.state.ids || []).join(',')}
					data-vehicleid={this.props.id}
					title="The Vehicle Accessory Desc"
				></div>
				<div className="hidden">
					Code to Add Product:
					<a
						className="pop_up_vehicle"
						data-part=""
						data-remove="0"
						title="Accessory Name"
						id="addPart"
					>ADD</a>
					Code to Remove Product:
					<a
						className="pop_up_vehicle"
						data-part=""
						data-remove="1"
						title="Accessory Name"
						id="removePart"
					>REMOVE</a>
				</div>
				<script src="https://www.iconfigurators.com/pop/src/iconfig-ar-2.cfm?key=539D7C9D0B8B72F4966C"></script>
			</div>
		);
	}

}

export default Configurator;
