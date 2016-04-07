import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './WhereToBuy.scss';
import withStyles from '../../decorators/withStyles';
import Locations from './Locations/Locations';
import Buymap from './Map/Map';

@withStyles(s)
class WhereToBuy extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	constructor() {
		super();
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'container')}>
				<div className="row header-row">
					<div className="col-md-12 map-nav-top">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 map-nav-tab-switch">
							<ul className="nav nav-tabs" role="tablist">
								<li role="presentation" ng-className="{ 'active' : display === 'local' }">
									<a href="#local" aria-controls="Buy local" role="tab" ng-click="changeDisplay('local', $event)" data-toggle="tab">
									Buy Local
									</a>
								</li>
								<li role="presentation" ng-className="{ 'active' : display === 'online' }">
									<a href="#online" aria-controls="Buy online" role="tab" ng-click="changeDisplay('online', $event)" data-toggle="tab">
									Buy Online
									</a>
								</li>
							</ul>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 wtb-search search-form row" ng-show="display === 'local'">
							<div className="pull-left col-lg-4 col-md-4 col-xs-4 col-sm-3 geo-lookup">
								<a href="#" ng-click="LookupGeoLoc()">
									<ng-md-icon icon="my_location"></ng-md-icon>
									<span>Use my Location</span>
								</a>
							</div>
						<div className="pull-right col-lg-8 col-md-8 col-xs-8 col-sm-9">
							<input type="search" className="form-control autocomplete" placeholder="Search for location" ng-show="map.show" />
						</div>
							<div className="clearfix"></div>
						</div>
					<div className="clearfix"></div>
					</div>
				</div>

				<Buymap />
				<Locations />
			</div>
		);
	}

}

export default WhereToBuy;
