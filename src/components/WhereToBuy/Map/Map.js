import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './../WhereToBuy.scss';
import withStyles from '../../../decorators/withStyles';
import BuyActions from '../../../actions/BuyActions';
import BuyStore from '../../../stores/BuyStore';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, Polygon } from 'react-google-maps';
import connectToStores from 'alt-utils/lib/connectToStores';
import Directions from './../Directions/Directions';

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
		showRegions: PropTypes.bool,
		regions: PropTypes.array,
		zoom: PropTypes.number,
		markerHack: PropTypes.bool,
	};

	static defaultProps = {
		zoom: 13,
	};

	constructor() {
		super();
	}

	componentWillMount() {
		BuyActions.regions();
	}

	componentDidMount() {
		// initial map markers
		BuyActions.bounds(this.props.center, this.props.bounds);
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

	handleMapChange() {
		const center = this.refs.map.getCenter();
		const bounds = this.refs.map.getBounds();
		const newZoom = this.refs.map.getZoom();
		const newPosition = {
			lat: center.lat(),
			lng: center.lng(),
		};
		const newBounds = {
			ne: bounds.R.j + ',' + bounds.j.R,
			sw: bounds.R.R + ',' + bounds.j.j,
		};
		BuyActions.bounds(newPosition, newBounds, newZoom);
	}

	handleRegionClick(e) {
		const center = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		};
		BuyActions.setCenterAndZoom(center, 9);

		const bounds = {
			ne: this.refs.map.getBounds().R.j + ',' + this.refs.map.getBounds().j.R,
			sw: this.refs.map.getBounds().R.R + ',' + this.refs.map.getBounds().j.j,
		};
		BuyActions.bounds(center, bounds, 8);
	}

	handleMapClick(e) {
		BuyActions.setCenter(e.latLng);
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
		return (<Directions {...this.props} />);
	}

	renderRegions() {
		const regions = [];
		this.props.regions.map((region, index) => {
			const coords = [];
			region.coordinates.map((coord) => {
				coords.push({ lat: coord.latitude, lng: coord.longitude });
			});
			regions.push(<Polygon paths={coords} key={index} onClick={ ::this.handleRegionClick } />);
		});
		return regions;
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
						onDragend={::this.handleMapChange}
						onZoomChanged={::this.handleMapChange}
						center={this.props.center}
						onClick={::this.handleMapClick}
						zoom={this.props.zoom}
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
					{this.props.showRegions ? ::this.renderRegions() : null}
					</GoogleMap>
				}
			/>
		);
	}

	render() {
		return (
			<div className={cx(s.mapContainer)}>
				{ this.props.fetchDirections ? this.renderDirections() : this.renderMap() }
			</div>
		);
	}
}

export default Map;
