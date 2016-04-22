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
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.55)',
	},
};

@withStyles(s)
@connectToStores
class WhereToBuy extends Component {

	static propTypes = {
		className: PropTypes.string,
		local: PropTypes.bool,
		showModal: PropTypes.bool,
		markers: PropTypes.array,
		checked: PropTypes.object,
		fetchDirections: PropTypes.bool,
	};

	static defaultProps = {
		checked: {
			platinum: true,
			gold: true,
			silver: true,
		},
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

	handleTypeChange(e) {
		BuyActions.markerVisibility(e.target.value, e.target.checked);
	}

	handleResetDirection() {
		BuyActions.showDirections(false);
	}

	renderLocationModal() {
		return (
			<Modal
				style={customStyles}
				isOpen={this.props.showModal}
				onRequestClose={this.hideModal}
				className={s.getDirections}
			>
				<h2>Get Directions</h2>
				<div className={cx('form-group')}>
					<label htmlFor="startingLocation">Enter Your Location</label>
					<input type="text" name="startingLocation" onBlur={this.handleChange}/>
				</div>
				<button className={cx('btn btn-primary')} type="submit" onClick={this.handleClick}>MAP ROUTE</button>
			</Modal>
		);
	}

	renderMapFooter() {
		return (
			<div className={cx(s.mapFooter)}>
				<h4>Show/Hide Types: </h4>
				<div className={cx(s.toggleContainer)}>
					<input type="checkbox" name="platinum" value="platinum" checked={this.props.checked.platinum} onChange={::this.handleTypeChange} />
					<img src="https://storage.googleapis.com/aries-website/wtb/mapflag.png" />
					<span>Platinum</span>
				</div>
				<div className={cx(s.toggleContainer)}>
					<input type="checkbox" name="gold" value="gold" checked={this.props.checked.gold} onChange={::this.handleTypeChange} />
					<img src="http://www.curtmfg.com/Content/img/mapdot4.png" />
					<span>Gold</span>
				</div>
				<div className={cx(s.toggleContainer)}>
					<input type="checkbox" name="silver" value="silver"checked={this.props.checked.silver} onChange={::this.handleTypeChange} />
					<img src="http://www.curtmfg.com/Content/img/mapdot3.png" />
					<span>Silver</span>
				</div>
				{this.props.fetchDirections ? <button className={cx(s.resetDirections)} onClick={::this.handleResetDirection}> Reset Directions </button> : null}
			</div>
		);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'container')}>
				<ControlPanel {...this.props} />
				{this.props.local === true ? <div><Buymap {...this.props} />{::this.renderMapFooter()}</div> : ''}
				<Locations {...this.props} />
				{this.props.showModal === true ? this.renderLocationModal() : ''}
			</div>
		);
	}

}

export default WhereToBuy;
