import React, { Component, PropTypes } from 'react';
import VehicleStore from '../../stores/LuverneStore';
import VehicleActions from '../../actions/LuverneActions';
import CategoryStore from '../../stores/LvCategoryStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import s from './Category.scss';

@connectToStores
class LvCategory extends Component {

	static propTypes = {
		catTitle: PropTypes.string,
		subs: PropTypes.array,
	};

	constructor() {
		super();
	}

	static getPropsFromStores() {
		return {
			...VehicleStore.getState(),
			...CategoryStore.getState(),
		};
	}

	static getStores() {
		return [VehicleStore, CategoryStore];
	}

	setActiveCategory(cat) {
		VehicleActions.setActiveCategory(cat);
	}

	buildSubs() {
		const output = [];
		let cnt = 0;

		this.props.subs.map((sub) => {
			output.push(
				<div key={sub.parent + cnt} className={'col-md-6'} onClick={this.setActiveCategory.bind(this, sub.cat)}>
					{sub.cat.category.title}
				</div>
			);
			cnt++;
		});

		return output;
	}

	render() {
		return (
			<div className={s.root}>
				<h2>{this.props.catTitle}</h2>
				{this.buildSubs()}
			</div>
		);
	}

}

export default LvCategory;
