import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './VehicleResults.scss';
import withStyles from '../../decorators/withStyles';
import VehicleStore from '../../stores/VehicleStore';
import VehicleActions from '../../actions/VehicleActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import VehicleStyle from './VehicleStyle';

@withStyles(s)
@connectToStores
class VehicleResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.shape({
			params: PropTypes.shape({
				year: PropTypes.string,
				make: PropTypes.string,
				model: PropTypes.string,
			}),
		}),
		vehicle: PropTypes.shape({
			year: PropTypes.string,
			make: PropTypes.string,
			model: PropTypes.string,
		}),
		categoryparts: PropTypes.object,
		category: PropTypes.string,
		showStyle: PropTypes.bool,
		catStyleParts: PropTypes.shape({
			name: PropTypes.string,
			category: PropTypes.shape({
				available_styles: PropTypes.shape({
					name: PropTypes.string,
					parts: PropTypes.array,
				}),
			}),
		}),
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.state = {
			context: {},
		};
		this.getCategoryStyles = this.getCategoryStyles.bind(this);
		this.setCategoryStyle = this.setCategoryStyle.bind(this);
	}

	componentWillMount() {
		VehicleActions.set({
			year: this.props.context.params.year,
			make: this.props.context.params.make,
			model: this.props.context.params.model,
		});
		// title
		const title = this.props.context.params.year && this.props.context.params.make && this.props.context.params.model ? `${this.props.context.params.year} ${this.props.context.params.make} ${this.props.context.params.model}` : 'Vehicle Results';
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		const seo = {
			title,
			description: 'ARIES Automotive parts for ' + title,
		};
		this.context.seo(seo);
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	getCategoryStyles() {
		this.setFirstCategoryByDefault();
		const output = [];
		for (const cat in this.props.categoryparts) {
			if (!cat) {
				return output;
			}
			const active = this.props.catStyleParts.name === cat;
			output.push(
				<li key={cat} className={cx(s.categoryStyle, (active ? s.active : ''))} role="presentation">
					<a onClick={this.setCategoryStyle.bind(this, cat, this.props.categoryparts[cat])}>{cat.toUpperCase()}</a>
				</li>
			);
		}
		return output;
	}

	setFirstCategoryByDefault() {
		let i = 0;
		for (const cat in this.props.categoryparts) {
			if (!cat) {
				return;
			}
			if (this.props.category === '' && i === 0) {
				this.makeCatStyleParts(cat);
				return;
			}
			i++;
		}
	}

	setCategoryStyle(cat) {
		this.makeCatStyleParts(cat);
		VehicleActions.setShowStyleState(false);
		VehicleActions.setParts(null);
	}

	makeCatStyleParts(cat) {
		const catStyleParts = {};
		for (const i in this.props.categoryparts) {
			if (!this.props.categoryparts[i]) {
				return;
			}

			if (i !== cat) {
				continue;
			}

			if (!catStyleParts.category) {
				catStyleParts.category = {};
			}
			catStyleParts.category[i] = {
				available_styles: {},
			};
			catStyleParts.name = i;
			for (const j in this.props.categoryparts[i].available_styles) {
				if (!this.props.categoryparts[i].available_styles[j]) {
					return;
				}
				catStyleParts.category[i].available_styles[this.props.categoryparts[i].available_styles[j]] = [];
				const style = this.props.categoryparts[i].available_styles[j];
				for (const k in this.props.categoryparts[i].parts) {
					if (!this.props.categoryparts[i].parts[k]) {
						return;
					}
					const vehicleApplications = this.props.categoryparts[i].parts[k].vehicle_applications;
					if (this.inVehicleApps(this.props.vehicle, style, vehicleApplications)) {
						catStyleParts.category[i].available_styles[this.props.categoryparts[i].available_styles[j]].push(this.props.categoryparts[i].parts[k]);
					}
				}
			}
		}
		VehicleActions.setCategoryStyleParts(catStyleParts);
		return;
	}

	inVehicleApps(vehicle, style, applications) {
		for (const i in applications) {
			if (!applications[i]) {
				return false;
			}
			if (applications[i].year.toLowerCase() === vehicle.year.toLowerCase() && applications[i].make.toLowerCase() === vehicle.make.toLowerCase() && applications[i].model.toLowerCase() === vehicle.model.toLowerCase() && applications[i].style.toLowerCase() === style.toLowerCase()) {
				return true;
			}
		}
		return false;
	}

	render() {
		return (
			<div className={s.container}>
				<div className={cx(s.root, this.props.className)} role="navigation">
					<div className="tab-wrap">
						<ul className="nav nav-pills nav-stacked lg-tabs" role="tablist">
							{this.getCategoryStyles()}
						</ul>
					</div>
				</div>
				{this.props.catStyleParts.name ? <VehicleStyle className={s.vehicleStyle} catStyleParts={this.catStyleParts} category={this.props.catStyleParts.name} /> : null}
				<div className={s.clearfix}></div>
			</div>
		);
	}

}

export default VehicleResults;
