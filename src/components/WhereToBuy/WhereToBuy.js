import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './WhereToBuy.scss';
import withStyles from '../../decorators/withStyles';
import Locations from './Locations/Locations';
import BuyActions from '../../actions/BuyActions';
import BuyStore from '../../stores/BuyStore';
import Buymap from './Map/Map';
import ControlPanel from './ControlPanel/ControlPanel';
import connectToStores from 'alt-utils/lib/connectToStores';
import Modal from 'react-modal';
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

@withStyles(s)
@connectToStores
class WhereToBuy extends Component {

	static propTypes = {
		className: PropTypes.string,
		local: PropTypes.bool,
		showModal: PropTypes.bool,
	};

	constructor() {
		super();
	}

	static getStores() {
		return [BuyStore];
	}

	static getPropsFromStores() {
		return BuyStore.getState();
	}

	setLocal(l) {
		BuyActions.setLocal(l);
	}

	handleChange(e) {
		BuyActions.setOrigin(e.target.value);
	}

	handleClick() {
		BuyActions.showDirections(true);
	}

	hideModal() {
		BuyActions.setModal(false);
	}

	renderLocationModal() {
		return (
			<Modal
				style={customStyles}
				isOpen={this.props.showModal}
				onRequestClose={this.hideModal}
			>
				<h2>Get Directions</h2>
				<div className={cx('form-group')}>
					<label htmlFor="startingLocation">Enter Your Location</label>
					<input type="text" name="startingLocation" onBlur={this.handleChange}/>
				</div>
				<button className={cx('btn btn-primary')} type="submit" onClick={this.handleClick}>Map Route</button>
			</Modal>
		);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'container')}>
				<ControlPanel {...this.props} />
				{this.props.local === true ? <Buymap {...this.props} /> : ''}
				<Locations {...this.props} />
				{this.props.showModal === true ? this.renderLocationModal() : ''}
			</div>
		);
	}

}

export default WhereToBuy;
