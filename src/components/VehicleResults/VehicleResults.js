import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Collapse, { Panel } from 'rc-collapse';
import s from './VehicleResults.scss';
import withStyles from '../../decorators/withStyles';
import VehicleStore from '../../stores/VehicleStore';
import VehicleActions from '../../actions/VehicleActions';
import CategoryStore from '../../stores/CategoryStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import VehicleStyle from './VehicleStyle';
import SubCategory from './Subcategory';
import CollapseStyle from './style';

@withStyles(s)
@connectToStores
class VehicleResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		activeKey: PropTypes.number,
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
		catStyleParts: PropTypes.array, //
		categories: PropTypes.array,
		activeCategory: PropTypes.object,
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
		this.onChange = this.onChange.bind(this);
		this.toggleKey = this.toggleKey.bind(this);
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

	onChange(activeKey) {
		this.setState({
			activeKey,
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

	getCategoryStyles() {
		if (!this.props.categories || this.props.categories.length === 0) {
			return <span></span>;
		}

		const output = [];
		let key = 1;
		this.props.categories.map((c) => {
			if (!c.children || !c.children.length === 0) {
				return;
			}
			let i = 1;
			const subsOutput = [];
			(c.children || []).map((cat) => {
				const match = this.props.vehicle.lookup_category.filter((t) => t.category.id === cat.id);
				if (match.length === 0) {
					return;
				}

				subsOutput.push(
					<SubCategory cat={cat} keyStr={key} toggleKey={this.toggleKey} btnActive={this.state.activeCat === cat.id ? true : false} />
				);
				if ((i % 2 === 0) && i === c.children.length) {
					subsOutput.push(<div className={cx(s.emptyCategory, 'col-lg-6', 'col-md-6', 'col-sm-6', 'col-xs-12')}>&nbsp;</div>);
				}
				subsOutput.push(
					<Panel key={key}>
						{this.props.activeCategory && this.state.activeKey === key ? <VehicleStyle className={s.vehicleStyle} /> : null}
					</Panel>
				);
				key++;
				i++;
			});

			if (subsOutput.length === 0) {
				return;
			}

			output.push(
				<div>
					<h3>{c.title}</h3>
					{subsOutput}
					<div className={s.floatClear}>&nbsp;</div>
				</div>
			);
			key++;
		});
		return (
			<div>
				<style>{CollapseStyle.AnimationStyle}</style>
				{output}
				<div className={s.floatClear}>&nbsp;</div>
			</div>
		);
	}

	setActiveCategory(cat) {
		VehicleActions.setActiveCategory(cat);
	}

	toggleKey(activeKey, cat) {
		VehicleActions.setActiveCategory(cat);
		this.setState({
			activeKey,
			activeCat: cat.category.id,
		});
	}

	render() {
		const accordionVal = true;
		return (
			<div className={s.container}>
				<ol className="breadcrumb">
					<li><a href="/">Home</a></li>
					<li className="active">Vehicle Look Up Results</li>
				</ol>
				<div>
					<h1>VEHICLE LOOK UP RESULTS</h1>
					<p>Choose a category below to see the products that fit your vehicle.
						Some products may require the style of the vehicle to be specified.
					</p>
				</div>
				<div className={s.accordionContainer}>
					<Collapse accordion={accordionVal}
						onChange={this.onChange}
						activeKey={this.state.activeKey}
					>
						{this.getCategoryStyles()}
					</Collapse>
				</div>
			</div>
		);
	}

}

export default VehicleResults;
