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

@withStyles(s)
@connectToStores
class WhereToBuy extends Component {

	static propTypes = {
		className: PropTypes.string,
		local: PropTypes.bool,
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

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'container')}>
				<ControlPanel />
				{this.props.local === true ? <Buymap /> : ''}
				<Locations />
			</div>
		);
	}

}

export default WhereToBuy;
