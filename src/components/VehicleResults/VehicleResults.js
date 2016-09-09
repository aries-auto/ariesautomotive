import React, { Component, PropTypes } from 'react';
import Link from '../Link';
import s from './VehicleResults.scss';
import CategorizedResult from './CategorizedResult';
import withStyles from '../../decorators/withStyles';
import VehicleStore from '../../stores/VehicleStore';
import CategoryStore from '../../stores/CategoryStore';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class VehicleResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		activeIndex: PropTypes.number,
		context: PropTypes.shape({
			params: PropTypes.shape({
				year: PropTypes.string,
				make: PropTypes.string,
				model: PropTypes.string,
			}),
		}),
		vehicle: PropTypes.shape({
			base: PropTypes.shape({
				year: PropTypes.string,
				make: PropTypes.string,
				model: PropTypes.string,
			}),
			availableYears: PropTypes.array,
			availableMakes: PropTypes.array,
			availableModels: PropTypes.array,
			lookup_category: PropTypes.array,
			products: PropTypes.array,
		}),
		categories: PropTypes.array,
		activeCategory: PropTypes.object,
		fitments: PropTypes.array,
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
			activeKey: '0',
			activeCat: 0,
		};
		this.getMatched = this.getMatched.bind(this);
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
		return [VehicleStore, CategoryStore];
	}

	static getPropsFromStores() {
		return {
			...VehicleStore.getState(),
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
		this.props.categories.map((c) => {
			if (!c.children || !c.children.length === 0) {
				return;
			}

			let subs = [];
			(c.children || []).map((cat) => {
				const tmp = this.props.vehicle.lookup_category.filter((t) => t.category.id === cat.id);
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
					/>
				);
			}
		});

		return groups;
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
				{matched}
			</div>
		);
	}

}

export default VehicleResults;
