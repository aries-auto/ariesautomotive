import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
// import Loader from 'react-loader';
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
		activeKey: PropTypes.string,
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
		const base = this.props.vehicle.base || {};
		let title = 'Vehicle Results';
		if (base.year && base.make && base.model) {
			title = `${base.year} ${base.make} ${base.model} Fitment Results`;
		}
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		const seo = {
			title,
			description: 'ARIES Automotive parts for ' + title,
		};
		this.context.seo(seo);
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
		const output = [];
		if (!this.props.categories || this.props.categories.length === 0) {
			return <span></span>;
		}
		let key = 1;
		let count = 0;

		output.push(<style>{CollapseStyle.AnimationStyle}</style>);
		this.props.categories.map((c) => {
			count++;
			const subsOutput = [];
			if (c.children && c.children.length > 0) {
				output.push(<h3>{c.title}</h3>);
			}
			let i = 1;
			(c.children || []).map((cat) => {
				const keyStr = key.toString();
				subsOutput.push(
					<SubCategory cat={cat} keyStr={keyStr} toggleKey={this.toggleKey} btnActive={this.state.activeCat === cat.id ? true : false} />
				);
				const isEven = (i % 2 === 0) ? true : false;
				if (isEven) {
					subsOutput.push(
						<Panel key={keyStr}>
							{this.props.activeCategory && this.state.activeKey === keyStr ? this.renderVehicleStyle() : null}
						</Panel>
					);
					key++;
				}
				if (!isEven && i === c.children.length) {
					subsOutput.push(<div className={cx(s.emptyCategory, 'col-lg-6', 'col-md-6', 'col-sm-6', 'col-xs-12')}>&nbsp;</div>);
					subsOutput.push(
						<Panel key={keyStr}>
							{this.props.activeCategory && this.state.activeKey === keyStr ? this.renderVehicleStyle() : null}
						</Panel>
					);
					key++;
				}
				i++;
			});

			output.push(subsOutput);
			key++;
		});
		output.push(<div className={s.floatClear}>&nbsp;</div>); // needed for clearing floats
		return output;
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

	renderBreadcrumbs() {
		return (
			<ol className="breadcrumb">
				<li><a href="/">Home</a></li>
				<li className="active">Vehicle Look Up Results</li>
			</ol>
		);
	}

	renderStaticContent() {
		return (
			<div>
				<h1>VEHICLE LOOK UP RESULTS</h1>
				<p>Choose a category below to see the products that fit your vehicle.
					Some products may require the style of the vehicle to be specified.
				</p>
			</div>
		);
	}

	renderVehicleStyle() {
		return (
			<VehicleStyle
				className={s.vehicleStyle}
			/>
		);
	}


	render() {
		const accordionVal = true;
		return (
			<div className={s.container}>
				{this.renderBreadcrumbs()}
				{this.renderStaticContent()}
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
