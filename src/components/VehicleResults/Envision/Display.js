import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Display.scss';
import Alert from '../../Alert';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class Configurator extends Component {

	static propTypes = {
		id: PropTypes.string,
		products: PropTypes.array,
		className: PropTypes.string,
		window: PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.state = {
			ids: [],
		};
	}

	componentDidMount() {
		this.props.window.onerror = () => {
			this.setState({
				error: `No image of vehicle with parts available.`,
			});
		};
	}

	componentWillReceiveProps(props) {
		const ids = (props.products || []).map((p) => p.part_number);

		const orig = JSON.stringify(ids);
		const st = JSON.stringify(this.state.ids);
		if (orig.localeCompare(st) !== 0) {
			this.setState({
				ids,
			});
		}
	}

	shouldComponentUpdate(props, state) {
		// check .id on props && this.props;
		if (props.id !== this.props.id) {
			return true;
		}

		// check []ids on state && this.state;
		const id1 = JSON.stringify(state.ids);
		const id2 = JSON.stringify(this.state.ids);
		if (id1.localeCompare(id2) !== 0) {
			return true;
		}

		return false;
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

		return (
			<div className={cx(s.root, this.props.className)}>
				<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
				<script src="https://www.iconfigurators.com/pop/src/iconfig-ar-2.cfm?key=539D7C9D0B8B72F4966C"></script>
				<div
					className={cx('vehicle-wrapper', s.vehicleWrapper)}
					id="ic-vehicle-wrapper"
					data-part={(this.state.ids || []).join(',')}
					data-vehicleid={this.props.id}
					title="The Vehicle Accessory Desc"
				></div>
			</div>
		);
	}

}

export default Configurator;
