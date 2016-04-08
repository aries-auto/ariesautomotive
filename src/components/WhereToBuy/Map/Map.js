import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './../WhereToBuy.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class Map extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	constructor() {
		super();
	}

	render() {
		return (
			<div className={cx()}>
				<div className="tab-content">
					<div className="tab-pane" ng-className="{ 'active' : display === 'local' }" id="local" role="tabpanel">
						<div className="row">
							<div className="col-md-12 col-lg-12 map-app-container">
								<div id="map" className="angular-google-map-container map-box">
									<div ng-if="!map.show" className="loading-container">
									<span us-spinner="{radius:30, width:8, length: 16}"></span>
									<span className="message">Loading the map..</span>
								</div>
								<div ng-if="!locLoaded" className="loadingloc">
									<span us-spinner="{radius:30, width:8, length: 16}"></span>
									<span className="message">Loading your location..</span>
								</div>

								<ui-gmap-google-map ng-if="map.show" className="col-md-12" center="map.center"
									control="gMap"
									zoom="map.zoom"
									dragging="map.dragging"
									options="map.options"
									events="map.events"
									bounds="map.bounds"
									refresh="map.refresh"
									dorebuildall="true"
									pan="true"
								>
									<ui-gmap-markers idKey="'id'" models="locations" doCluster="true" clusterOptions="{minimumClusterSize: 10}" icon="'icon'" coords="'coords'">
										<ui-gmap-windows show="show">
											<div className="info-window" ng-non-bindable>
												<span className="title">[[ name ]]</span>
												<span className="dealer-type">[[ dealerType.label ]]</span>
												<span className="street">[[ address ]]</span>
												<span className="city">[[ city ]], [[state.abbreviation]] [[ postalCode ]]</span>
												<hr />
												<div className="actions">
													<a href="tel:[[ phone ]]" className="pull-left">
														<span className="glyphicon glyphicon-earphone"></span>
														[[ phone ]]
													</a>
													<div className="clearfix"></div>
												</div>
											</div>
										</ui-gmap-windows>
									</ui-gmap-markers>
									<ui-gmap-polygons ng-if="map.polys && map.zoom < 6" idKey="'name'" models="map.polys" path="'coordinates'"
										stroke="{ color: '#57111a', weight: 3, opacity: '0.8' }" fill="{ opacity: '0.0'}" visible="true" geodesic="true" fit="false"
										editable="false" static="true" ng-cloak="" events="map.polyEvents"
									>

									</ui-gmap-polygons>
								</ui-gmap-google-map>
							</div>
						</div>
						<div ng-if="map.show" className="col-md-12 tierToggles">
							<div className="toggles col-md-10">
								<h4 className="tierTitle hidden-xs hidden-sm">Show / Hide Types:</h4>
								<div className="toggleContainer" id="platToggle">
									<input type="checkbox" name="platEnabled" value="platEnabled" ng-model="platEnabled" ng-change="toggleTier('Platinum')" /> <img height="20px" src="https://storage.googleapis.com/aries-website/wtb/mapflag.png" /> Platinum
								</div>
								<div className="toggleContainer" id="goldToggle">
									<input type="checkbox" name="goldEnabled" value="goldEnabled" ng-model="goldEnabled" ng-change="toggleTier('Gold')" /> <img src="http://www.curtmfg.com/Content/img/mapdot4.png" /> Gold
								</div>
								<div className="toggleContainer" id="silverToggle">
									<input type="checkbox" name="silverEnabled" value="silverEnabled" ng-model="silverEnabled" ng-change="toggleTier('Silver')" /> <img src="http://www.curtmfg.com/Content/img/mapdot3.png" /> Silver
								</div>
							</div>
						</div>
					</div>
					<div className="row col-md-12">
						<locations locations="platLocations"></locations>
						<locations locations="goldLocations"></locations>
						<locations locations="silvLocations"></locations>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default Map;
