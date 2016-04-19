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
		location: PropTypes.string,
		suggestions: PropTypes.array,
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

	searchAutocomplete(e) {
		if (!e.target.value || e.target.value.length === 0) {
			return;
		}
		const autocomplete = new this.props.google.maps.places.AutocompleteService();
		autocomplete.getQueryPredictions({ input: e.target.value }, (predictions, status) => {
			if (status !== this.props.google.maps.places.PlacesServiceStatus.OK) {
				console.log('err');
			}
			BuyActions.setSuggestions(predictions);
		});
	}

	renderSuggestions() {
		const suggestions = [];
		this.props.suggestions.map((suggestion, index) => {
			suggestions.push(<option value={suggestion.description} key={index}>{suggestion.description}</option>);
		});
		return (
			<datalist id="suggestions">{suggestions}</datalist>
		);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'container')}>
				<div className="row header-row">
					<div className="col-md-12 map-nav-top">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 map-nav-tab-switch">
							<ul className={cx(s.nav, 'nav-tabs')} role="tablist">
								<li role="presentation" onClick={this.setLocal.bind(this, true)}>
									<a href="#local" className={cx(this.props.local ? s.active : '')}>
									Buy Local
									</a>
								</li>
								<li role="presentation" onClick={this.setLocal.bind(this, false)}>
									<a href="#online" className={cx(!this.props.local ? s.active : '')}>
									Buy Online
									</a>
								</li>
							</ul>
						</div>
						<div className={cx('col-lg-6 col-md-6 col-sm-6 col-xs-12 wtb-search search-form row', s.location)} ng-show="display === 'local'">
							<div className={cx('pull-left col-lg-4 col-md-4 col-xs-4 col-sm-3 geo-lookup', s.locationtext)}>
								<a href="#" ng-click="LookupGeoLoc()">
									<span className="glyphicon glyphicon-globe"></span>
									<span>Use my Location</span>
								</a>
							</div>
						<div className="pull-right col-lg-8 col-md-8 col-xs-8 col-sm-9">
							<input type="search" autoComplete="on" className={cx('form-control', 'autocomplete')} placeholder="Search for location" onChange={::this.searchAutocomplete} list="suggestions" />
							{this.props.suggestions.length > 0 ? this.renderSuggestions() : null}
						</div>
							<div className="clearfix"></div>
						</div>
					<div className="clearfix"></div>
					</div>
				</div>
			</div>
		);
	}

}

export default ControlPanel;
