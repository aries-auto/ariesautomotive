import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Loader from 'react-loader';
import s from './VehicleResults.scss';
import withStyles from '../../decorators/withStyles';
import VehicleStore from '../../stores/VehicleStore';
import VehicleActions from '../../actions/VehicleActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import VehicleStyle from './VehicleStyle';
import Envision from './Envision';
import Configurator from './Configurator';

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
			iconMediaVehicle: PropTypes.object,
			iconParts: PropTypes.oneOfType([
				React.PropTypes.object,
				React.PropTypes.array,
			]),
			vehicleParts: PropTypes.array,
		}),
		vehicle: PropTypes.shape({
			year: PropTypes.string,
			make: PropTypes.string,
			model: PropTypes.string,
			parts: PropTypes.array,
		}),
		categories: PropTypes.array,
		activeCategory: PropTypes.object,
		error: PropTypes.object,
		iconMediaVehicle: PropTypes.object,
		win: PropTypes.object,
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
	}

	componentWillMount() {
		VehicleActions.set({
			year: this.props.context.params.year,
			make: this.props.context.params.make,
			model: this.props.context.params.model,
		}, this.props.context.iconParts);
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
		const output = [];
		this.props.categories.sort((a, b) => a.sort > b.sort);
		for (const i in this.props.categories) {
			if (!this.props.categories[i]) {
				continue;
			}
			let active = false;
			if (this.props.activeCategory && this.props.activeCategory.category.title === this.props.categories[i].category.title) {
				active = true;
			}
			output.push(
				<li key={i} className={cx(s.categoryStyle, (active ? s.active : ''))} role="presentation">
					<a onClick={this.setActiveCategory.bind(this, this.props.categories[i])}>{this.props.categories[i].category.title}</a>
				</li>
			);
		}
		return output;
	}

	setActiveCategory(cat) {
		VehicleActions.setActiveCategory(cat);
	}

	renderVehicleStyle() {
		return (
			<VehicleStyle
				className={s.vehicleStyle}
			/>
		);
	}

	render() {
		return (
			<div className={s.container}>
				{this.props.error ? <p className={s.error}>{this.props.error.message}</p> : null}
				<div className={s.visual}>
					{this.props.context.vehicleParts ? <Configurator win={this.props.win} className={s.configurator} context={this.props.context} /> : null}
					{this.props.vehicle.parts && this.props.vehicle.parts.length > 0 ? <Envision className={s.envision} /> : null}
				</div>
				<Loader loaded={(this.props.categories !== null)} top="30%" loadedClassName={s.loader}>

					<div className={cx(s.root, this.props.className)} role="navigation">
						<div className="tab-wrap">
							<ul className="nav nav-pills nav-stacked lg-tabs" role="tablist">
								{this.getCategoryStyles()}
							</ul>
						</div>
					</div>
					<div className={s.clearfix}></div>
					{this.props.activeCategory ? this.renderVehicleStyle() : null}
				</Loader>
			</div>
		);
	}

}

export default VehicleResults;
