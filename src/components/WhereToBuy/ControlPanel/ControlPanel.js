import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './ControlPanel.scss';
import withStyles from '../../../decorators/withStyles';
import BuyActions from '../../../actions/BuyActions';
import BuyStore from '../../../stores/BuyStore';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class ControlPanel extends Component {

	static propTypes = {
		className: PropTypes.string,
		local: PropTypes.bool,
		google: PropTypes.object,
		currentLocation: PropTypes.string,
		suggestions: PropTypes.array,
		navigator: PropTypes.object,
		error: PropTypes.string,
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

	setOrigin(e) {
		BuyActions.geocode(e.target.value);
	}

	handleCurrentLocation() {
		this.props.navigator.geolocation.getCurrentPosition((pos) => {
			// BuyActions.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
			BuyActions.getAddressFromLatLng(pos.coords.latitude + ',' + pos.coords.longitude);
		}, (err) => {
			BuyActions.setError(err.message);
		});
	}

	searchAutocomplete(e) {
		if (!e.target.value || e.target.value.length === 0) {
			return;
		}
		const autocomplete = new this.props.google.maps.places.AutocompleteService();
		autocomplete.getQueryPredictions({ input: e.target.value }, (predictions, status) => {
			if (status !== this.props.google.maps.places.PlacesServiceStatus.OK) {
				BuyActions.setError(status);
			}
			BuyActions.setSuggestions(predictions);
		});
	}

	renderSuggestions() {
		const suggestions = [];
		this.props.suggestions.map((suggestion, index) => {
			suggestions.push(<tr key={index}><td value={suggestion.description} onClick={::this.setOrigin}>{suggestion.description}</td></tr>);
		});
		return (
			<table id="suggestions" className={s.suggestionsTable}><tbody>{suggestions}</tbody></table>
		);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, s.container)}>
				<ul className={cx(s.nav, 'nav-tabs')} role="tablist">
					<li role="presentation" onClick={this.setLocal.bind(this, true)}>
						<a href="#" className={cx(this.props.local ? s.active : '')}>
						Buy Local
						</a>
					</li>
					<li role="presentation" onClick={this.setLocal.bind(this, false)}>
						<a href="#" className={cx(!this.props.local ? s.active : '')}>
						Buy Online
						</a>
					</li>
				</ul>
				<div className={cx(s.location)}>
					<div className={cx(s.locationtext)}>
						<a href="#" onClick={::this.handleCurrentLocation}>
							<span className="glyphicon glyphicon-globe"></span>
							<span>Use my Location</span>
						</a>
					</div>
					<div className={s.search}>
						<input type="search" autoComplete="on" className={cx('form-control', 'autocomplete')} placeholder="Search for location" onChange={::this.searchAutocomplete} list="suggestions"/>
						{this.props.suggestions && this.props.suggestions.length > 0 ? this.renderSuggestions() : null}
					</div>
					<div className="clearfix"></div>
					{this.props.error ? <div>{this.props.error}</div> : null}
				</div>
				<div className="clearfix"></div>
			</div>
		);
	}

}

export default ControlPanel;
