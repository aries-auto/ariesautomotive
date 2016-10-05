import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import s from './VehicleResults.scss';
import CategorizedResult from './CategorizedResult';
import withStyles from '../../decorators/withStyles';
import LuverneStore from '../../stores/LuverneStore';
import CategoryStore from '../../stores/LvCategoryStore';
import connectToStores from 'alt-utils/lib/connectToStores';
// import VehicleStyle from './VehicleStyle';
import Envision from './Envision';
import Configurator from './Configurator';

@withStyles(s)
@connectToStores
class LuverneResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		activeIndex: PropTypes.number,
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
			base_vehicle: PropTypes.shape({
				year: PropTypes.string,
				make: PropTypes.string,
				model: PropTypes.string,
			}),
			available_years: PropTypes.array,
			available_makes: PropTypes.array,
			available_models: PropTypes.array,
			lookup_category: PropTypes.array,
			products: PropTypes.array,
		}),
		categories: PropTypes.array,
		activeCategory: PropTypes.object,
		fitments: PropTypes.array,
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
		console.log('testing');
		this.state = {
			context: {},
			activeKey: '0',
			activeCat: 0,
		};
		this.getMatched = this.getMatched.bind(this);
		this.createParentItem = this.createParentItem.bind(this);
	}

	componentWillMount() {
		const base = this.props.context ? this.props.context.params : {};
		let title = 'Vehicle Results';
		if (base.year && base.make && base.model) {
			title = `${base.year} ${base.make} ${base.model} Fitment Results`;
		}
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		this.context.seo({
			title,
			description: 'ARIES Automotive parts for ' + title,
		});
	}

	static getStores() {
		return [LuverneStore, CategoryStore];
	}

	static getPropsFromStores() {
		return {
			...LuverneStore.getState(),
			...CategoryStore.getState(),
		};
	}

	getMatched() {
		if (
			!this.props.vehicle ||
			!this.props.vehicle.lookup_category ||
			this.props.vehicle.lookup_category.length === 0 ||
			!this.props.categories ||
			this.props.categories.length === 0
		) {
			return <span></span>;
		}

		const groups = [];
		const categoriesGroup = {
			children: [],
		};

		if (this.props.categories && this.props.categories.length > 0) {
			this.props.categories.sort((a, b) => a.sort > b.sort);
		}
		this.props.categories.map((cat) => {
			const tmp = this.createParentItem(cat);
			categoriesGroup.children = categoriesGroup.children.concat(tmp.children);
		});
		categoriesGroup.children.map((c) => {
			if (!c.children || !c.children.length === 0) {
				return;
			}

			let subs = [];
			(c.children || []).map((cat) => {
				const tmp = this.props.vehicle.lookup_category.filter((t) => t.category.id === cat.cat.id);
				if (tmp.length > 0) {
					subs = subs.concat(tmp);
				}
			});
			if (subs.length > 0) {
				groups.push(
					<CategorizedResult
						activeIndex={this.props.activeIndex}
						parent={c}
						subs={subs}
						fitments={this.props.fitments}
						key={groups.length}
						iconParts={this.props.context.iconParts}
					/>
				);
			}
		});

		return groups;
	}

	createParentItem(cat) {
		if (cat.children && cat.children.length > 0) {
			cat.children.sort((a, b) => a.sort > b.sort);
		}
		const newCat = {
			cat,
			title: cat.title,
			children: cat.children.map(this.createParentItem),
		};

		return newCat;
	}

	render() {
		const matched = this.getMatched();
		return (
			<div className={s.root}>
				<ol className="breadcrumb">
					<li><Link to="/" title="Home">Home</Link></li>
					<li className="active">Vehicle Look Up Results</li>
				</ol>
				<div>
					<h1>VEHICLE LOOK UP RESULTS</h1>
					<p>Choose a category below to see the products that fit your vehicle.
						Some products may require the style of the vehicle to be specified.
					</p>
				</div>
				<div className={s.visual}>
					{this.props.context.vehicleParts ? <Configurator win={this.props.win} className={s.configurator} context={this.props.context} /> : null}
					{this.props.context.vehicleParts ? <Envision className={s.envision} /> : null}
				</div>
				<div className={s.matched}>
					{matched}
				</div>
			</div>
		);
	}

}

export default LuverneResults;
