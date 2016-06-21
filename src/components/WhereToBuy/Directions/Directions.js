import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './../WhereToBuy.scss';
import withStyles from '../../../decorators/withStyles';
import BuyActions from '../../../actions/BuyActions';
import BuyStore from '../../../stores/BuyStore';
import { GoogleMap, GoogleMapLoader, DirectionsRenderer } from 'react-google-maps';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Directions extends Component {

	static propTypes = {
		directions: PropTypes.any,
		google: PropTypes.object,
		zoom: PropTypes.number,
		origin: PropTypes.string,
		destination: PropTypes.string,
		fetchDirections: PropTypes.bool,
		error: PropTypes.string,
	};

	static defaultProps = {
		zoom: 13,
	};

	constructor() {
		super();
	}

	componentWillMount() {
		if (!this.props.fetchDirections || !this.props.origin || !this.props.destination) {
			return;
		}
		const DirectionsService = new this.props.google.maps.DirectionsService();
		DirectionsService.route({
			origin: this.props.origin,
			destination: this.props.destination,
			travelMode: this.props.google.maps.TravelMode.DRIVING,
		}, (result, status) => {
			if (status === this.props.google.maps.DirectionsStatus.OK) {
				BuyActions.setDirections(result);
			} else {
				BuyActions.setError(result.status);
			}
		});
	}

	shouldComponentUpdate(next) {
		if (!next.directions) {
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
								height: '100%',
							},
						}}
						defaultZoom={13}
						defaultCenter={origin}
						zoom={this.props.zoom}
					>
						<DirectionsRenderer directions={this.props.directions} />
						{this.props.error ? <div>{this.props.error}</div> : null}
					</GoogleMap>
				}
			/>
		);
	}

	render() {
		return (
			<div className={cx(s.mapContainer)}>
				{this.props.directions ? ::this.renderDirections() : null}
			</div>
		);
	}
}

export default Directions;
