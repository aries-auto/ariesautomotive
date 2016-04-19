import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './../WhereToBuy.scss';
import withStyles from '../../../decorators/withStyles';
import BuyActions from '../../../actions/BuyActions';
import BuyStore from '../../../stores/BuyStore';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Map extends Component {

	static propTypes = {
		className: PropTypes.string,
		center: PropTypes.object,
		markers: PropTypes.array,
		bounds: PropTypes.object,
		directions: PropTypes.any,
		fetchDirections: PropTypes.bool,
		origin: PropTypes.string,
		destination: PropTypes.string,
		google: PropTypes.object,
	};

	constructor() {
		super();
	}

	componentDidMount() {
		// initial map markers
		BuyActions.bounds(this.props.center, this.props.bounds);
	}

	componentWillReceiveProps(next) {
		if (!next.fetchDirections || !next.origin || !next.destination) {
			return;
		}
		const DirectionsService = new this.props.google.maps.DirectionsService();
		DirectionsService.route({
			origin: next.origin,
			destination: next.destination,
			travelMode: this.props.google.maps.TravelMode.DRIVING,
		}, (result, status) => {
			if (status === this.props.google.maps.DirectionsStatus.OK) {
				BuyActions.setDirections(result);
			} else {
				console.error(`error fetching directions ${ result }`);
			}
		});
	}

	static getStores() {
		return [BuyStore];
	}

	static getPropsFromStores() {
		return BuyStore.getState();
	}

	handleMarkerClick(index) {
		const marker = this.props.markers[index];
		if (!marker.showInfo || marker.showInfo === false) {
			marker.showInfo = true;
		} else {
			marker.showInfo = false;
		}
		const markers = this.props.markers;
		markers[index] = marker;
		BuyActions.setMarkers(markers);
	}

	handleChange() {
		const center = {
			lat: this.refs.map.getCenter().lat(),
			lng: this.refs.map.getCenter().lng(),
		};
		const bounds = {
			ne: this.refs.map.getBounds().R.j + ',' + this.refs.map.getBounds().j.R,
			sw: this.refs.map.getBounds().R.R + ',' + this.refs.map.getBounds().j.j,
		};

		BuyActions.bounds(center, bounds);
	}

	renderShowInfo(index, marker) {
		const content = `<h4>${marker.name}</h4><div>${marker.address}</div><div>${marker.city}, ${marker.state.abbreviation} ${marker.postalCode}</div>
			<hr /><div><a href='tel${marker.phone}'><span class='glyphicon glyphicon-earphone'>${marker.phone}</span></a></div>`;
		return (
			<InfoWindow
				key={index}
				onCloseclick={this.handleMarkerClick.bind(this, index)}
				content={content}
			/>
		);
	}

	renderDirections() {
		const origin = new this.props.google.maps.LatLng(41.8507300, -87.6512600);
		return (
			<GoogleMapLoader
				containerElement={
					<div
						{...this.props}
						style={{
							height: '100%',
						}}
					/>
				}
				googleMapElement={
				<GoogleMap
					containerProps={{
						...this.props,
						style: {
							height: `100%`,
						},
					}}
					defaultZoom={13}
					defaultCenter={origin}
				>
					<DirectionsRenderer directions={this.props.directions} />
				</GoogleMap>
				}
			/>
		);
	}

	renderMap() {
		return (
			<GoogleMapLoader
				containerElement={
					<div
						{...this.props}
						style={{
							height: '100%',
						}}
					/>
				}
				googleMapElement={
					<GoogleMap
						containerProps={{
							...this.props,
						}}
						// ref={(map) => (this._googleMapComponent = map) && console.log(map)}
						ref="map"
						defaultZoom={13}
						defaultCenter={{ lat: 44.8167, lng: -91.5000 }}
						onDragend={::this.handleChange}
						onZoomChanged={::this.handleChange}
					>
					{this.props.markers.map((marker, index) => {
						return (
							<Marker
								key={index}
								{...marker}
								onClick={this.handleMarkerClick.bind(this, index)}
								icon={`${marker.dealerType.mapIcon.mapIcon.Scheme}://${marker.dealerType.mapIcon.mapIcon.Host}${marker.dealerType.mapIcon.mapIcon.Path}`}
								position={{ lat: marker.coords.latitude, lng: marker.coords.longitude }}
							>
							{marker.showInfo ? this.renderShowInfo(index, marker) : null}
							</ Marker>
							);
					})}
					</GoogleMap>
				}
			/>
		);
	}

	render() {
		return (
			<div className={cx(s.mapContainer)}>
				{ this.props.directions ? this.renderDirections() : this.renderMap() }
			</div>
		);
	}
}

export default Map;
