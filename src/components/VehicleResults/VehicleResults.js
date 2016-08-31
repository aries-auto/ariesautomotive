import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Loader from 'react-loader';
import Collapse, { Panel } from 'rc-collapse';
import s from './VehicleResults.scss';
import withStyles from '../../decorators/withStyles';
import VehicleStore from '../../stores/VehicleStore';
import VehicleActions from '../../actions/VehicleActions';
import CategoryStore from '../../stores/CategoryStore';
import CategoryActions from '../../actions/CategoryActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import VehicleStyle from './VehicleStyle';
import SubCategory from './Subcategory';
// import Category from './Category';

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
			year: PropTypes.string,
			make: PropTypes.string,
			model: PropTypes.string,
		}),
		catStyleParts: PropTypes.array, //
		categories: PropTypes.array,
		activeCategory: PropTypes.object,
		catGroups: PropTypes.array,
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
		VehicleActions.set({
			year: this.props.context.params.year,
			make: this.props.context.params.make,
			model: this.props.context.params.model,
		});
		const title = this.props.context.params.year && this.props.context.params.make && this.props.context.params.model ? `${this.props.context.params.year} ${this.props.context.params.make} ${this.props.context.params.model}` : 'Vehicle Results';
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', title);
		const seo = {
			title,
			description: 'ARIES Automotive parts for ' + title,
		};
		this.context.seo(seo);
		CategoryActions.getCats();
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

		if (!this.props.catGroups || this.props.catGroups[0].id === 0 || !this.props.categories || this.props.categories[0].id === 0) {
			return <span></span>;
		}
		let key = 1;
		let count = 0;
		this.props.catGroups.map((c) => {
			count++;
			output.push(<h3>{c.title}</h3>);
			const subs = [];
			const subsOutput = [];
			this.props.categories.map((cat) => {
				if (cat.category.parent_id === c.id) {
					subs.push(cat);
				}
			});
			let i = 1;
			subs.map((cat) => {
				const keyStr = key.toString();
				subsOutput.push(
					<SubCategory cat={cat} keyStr={keyStr} toggleKey={this.toggleKey} btnActive={this.state.activeCat === cat.category.id ? true : false} />
				);
				const isEven = (i % 2 === 0) ? true : false;
				if (isEven) {
					subsOutput.push(
						<Panel className={s.collapseItem} key={keyStr}>
							{this.props.activeCategory && this.state.activeKey === keyStr ? this.renderVehicleStyle() : null}
						</Panel>
					);
					key++;
				}
				if (!isEven && i === subs.length) {
					subsOutput.push(<div className={cx(s.emptyCategory, 'col-lg-6', 'col-md-6', 'col-sm-6', 'col-xs-12')}>&nbsp;</div>);
					subsOutput.push(
						<Panel className={s.collapseItem} prefixCls={s.collapseItem} key={keyStr}>
							{this.props.activeCategory && this.state.activeKey === keyStr ? this.renderVehicleStyle() : null}
						</Panel>
					);
					key++;
				}
				i++;
			});

			output.push(
				subsOutput
			);
			key++;
		});

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
				<Loader loaded={(this.props.categories !== null)} top="30%">
					<div className={s.accordionContainer}>
						<Collapse accordion={accordionVal}
							onChange={this.onChange}
							activeKey={this.state.activeKey}
							prefixCls={s.collapse}
						>
							{this.getCategoryStyles()}
						</Collapse>
					</div>
				</Loader>
			</div>
		);
	}

}

export default VehicleResults;
