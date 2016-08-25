import React, { Component, PropTypes } from 'react';
// import cx from 'classnames';
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
			activeKey: '1',
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
				subsOutput.push(<div onClick={this.toggleKey.bind(this, keyStr, cat)}>{cat.category.title} {keyStr}</div>);
				const isEven = (i % 2 === 0) ? true : false;
				if (isEven) {
					subsOutput.push(
						<Panel key={keyStr}>
							{this.props.activeCategory && this.state.activeKey === keyStr ? this.renderVehicleStyle() : null}
						</Panel>
					);
					key++;
				}
				if (!isEven && i === subs.length) {
					subsOutput.push(
						<Panel key={keyStr}>
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

		const accStyle = `
			.rc-collapse {
			  background-color: #f4f4f4;
			  border-radius: 3px;
			  border: 1px solid #d9d9d9;
			}
			.rc-collapse-anim-active {
			  transition: height 0.2s ease-out;
			}
			.rc-collapse > .rc-collapse-item {
			  border-top: 1px solid #d9d9d9;
			}
			.rc-collapse > .rc-collapse-item:first-child {
			  border-top: none;
			}
			.rc-collapse > .rc-collapse-item > .rc-collapse-header {
			  height: 38px;
			  line-height: 38px;
			  text-indent: 16px;
			  color: #666;
			  cursor: pointer;
			}
			.rc-collapse > .rc-collapse-item > .rc-collapse-header .arrow {
			  display: inline-block;
			  content: '\\20';
			  width: 0;
			  height: 0;
			  font-size: 0;
			  line-height: 0;
			  border-top: 3px solid transparent;
			  border-bottom: 3px solid transparent;
			  border-left: 4px solid #666666;
			  vertical-align: middle;
			  margin-right: 8px;
			}
			.rc-collapse-content {
			  overflow: hidden;
			  color: #666666;
			  padding: 0 16px;
			  background-color: #fff;
			}
			.rc-collapse-content > .rc-collapse-content-box {
			  margin-top: 16px;
			  margin-bottom: 16px;
			}
			.rc-collapse-content-inactive {
			  display: none;
			}
			.rc-collapse-item:last-child > .rc-collapse-content {
			  border-radius: 0 0 3px 3px;
			}
			.rc-collapse > .rc-collapse-item-active > .rc-collapse-header .arrow {
			  border-left: 3px solid transparent;
			  border-right: 3px solid transparent;
			  border-top: 4px solid #666666;
			  margin-right: 6px;
			}
		`;

		return (
			<div className={s.container}>
				<style>{accStyle}</style>
				<Loader loaded={(this.props.categories !== null)} top="30%">
					<div>
						<Collapse accordion={accordionVal}
							onChange={this.onChange}
							activeKey={this.state.activeKey}
							defaultActiveKey="2"
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
