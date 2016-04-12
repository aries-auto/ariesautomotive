import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Locations.scss';
import withStyles from '../../../decorators/withStyles';
import BuyActions from '../../../actions/BuyActions';
import BuyStore from '../../../stores/BuyStore';
import connectToStores from 'alt-utils/lib/connectToStores';


@withStyles(s)
@connectToStores
class Locations extends Component {

	static propTypes = {
		className: PropTypes.string,
		markers: PropTypes.array,
	};

	constructor() {
		super();
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.markers === this.props.markers) {
			return false;
		}
		return true;
	}

	static getStores() {
		return [BuyStore];
	}

	static getPropsFromStores() {
		return BuyStore.getState();
	}

	getDirections(location) {
		// TODO directions
		console.log(location);
	}

	viewOnMap(location) {
		for (const i in this.props.markers) {
			if (!i) {return;}
			if (location.id === this.props.markers[i].id) {
				this.props.markers[i].showInfo = true;
			} else {
				this.props.markers[i].showInfo = false;
			}
		}
		BuyActions.setMarkers(this.props.markers);
	}

	sortTiers(tiers) {
		const sortedTiers = {};
		sortedTiers.Platinum = tiers.Platinum;
		sortedTiers.Gold = tiers.Gold;
		sortedTiers.Silver = tiers.Silver;
		return sortedTiers;
	}

	renderLocations() {
		if (!this.props.markers || !this.props.markers.length) {
			return '';
		}
		let tiers = {};
		this.props.markers.map((location) => {
			if (!tiers[location.dealerTier.tier]) {
				tiers[location.dealerTier.tier] = [];
			}
			tiers[location.dealerTier.tier].push(location);
		});

		// sort tiers
		tiers = this.sortTiers(tiers);

		// create html
		const output = [];
		for (const tierName in tiers) {
			if (!tiers[tierName]) {
				continue;
			}

			const locationHtml = [];
			for (let i = 0; i < tiers[tierName].length; i++) {
				const location = tiers[tierName][i];
				locationHtml.push(<div className={cx('col-md-4 col-sm-6 col-xs-12', s.location)} key={tierName + i}>
						<a className={s.name} onClick={this.viewOnMap.bind(this, location)}>{location.name}</a>
						<span className={cx(s.type)}>{location.dealerType.label}</span>
						<span className={cx(s.address)}>{location.address}</span>
						<span className={cx(s.city)}>{location.city},</span>
						<span className={cx(s.state)}>{location.state.abbreviation}</span>
						<span className={cx(s.zip)}>{location.postalCode}</span>
						<span className={cx(s.country)}>{location.state.country.abbreviation}</span>
						<div className={cx(s.actions)}>
							<a href="tel:{location.phone}">
								<span className="glyphicon glyphicon-earphone"></span>
								{location.phone}
							</a>
							<a onClick={this.getDirections.bind(this, location)}>
								<span className="glyphicon glyphicon-th-list"></span>
								Directions
							</a>
							<a onClick={this.viewOnMap.bind(this, location)}>
								<span className="glyphicon glyphicon-map-marker"></span>
								View On Map
							</a>
						</div>
					</div>
				);
			}
			output.push(<div className={cx('container', s.textlocations)} key={tierName}><h2>{tierName}</h2>{locationHtml}</div>);
		}
		return output;
	}

	render() {
		return (
			<div className={cx(s.root, s.boom)}>
				{this.renderLocations()}
			</div>
		);
	}
}

export default Locations;
