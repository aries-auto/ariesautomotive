import React, { Component, PropTypes } from 'react';
import LuverneStore from '../../stores/LuverneStore';
import LuverneActions from '../../actions/LuverneActions';
import CategoryStore from '../../stores/CategoryStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import s from './Category.scss';

@connectToStores
class Category extends Component {

	static propTypes = {
		catTitle: PropTypes.string,
		subs: PropTypes.array,
	};

	constructor() {
		super();
	}

	static getPropsFromStores() {
		return {
			...LuverneStore.getState(),
			...CategoryStore.getState(),
		};
	}

	static getStores() {
		return [LuverneStore, CategoryStore];
	}

	setActiveCategory(cat) {
		LuverneActions.setActiveCategory(cat);
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

export default Category;
