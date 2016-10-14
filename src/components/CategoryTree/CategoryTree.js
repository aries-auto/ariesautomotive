import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './CategoryTree.scss';
import withStyles from '../../decorators/withStyles';
import CategoryStore from '../../stores/CategoryStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import CategoryItem from './CategoryItem';

@withStyles(s)
@connectToStores
class CategoryTree extends Component {

	static propTypes = {
		className: PropTypes.string,
		categories: PropTypes.array,
		params: PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.categoryToItem = this.categoryToItem.bind(this);
		this.renderCatItems = this.renderCatItems.bind(this);

		this.state = {
			items: [],
		};

		if (!props.categories) {
			return;
		}

		if (props.categories && props.categories.length > 0) {
			props.categories.sort((a, b) => a.sort > b.sort);
		}

		props.categories.map((cat) => {
			const tmp = this.categoryToItem(cat);
			this.state.items.push(tmp);
		});
	}

	static getStores() {
		return [CategoryStore];
	}

	static getPropsFromStores() {
		return CategoryStore.getState();
	}

	categoryToItem(cat) {
		if (cat.children && cat.children.length > 0) {
			cat.children.sort((a, b) => a.sort > b.sort);
		}
		const item = {
			cat,
			to: `/category/${cat.id}/${cat.title}`,
			text: cat.title,
			children: cat.children.map(this.categoryToItem),
		};
		item.items = item.children;

		return item;
	}
	renderCatItems() {
		if (!this.state.items || this.state.items.length === 0) {
			return null;
		}
		const itemElms = [];
		this.state.items.map((item) => {
			itemElms.push(<CategoryItem cat={item.cat} items={item.children} isParent />);
		});
		return itemElms;
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				{this.renderCatItems()}
			</div>
		);
	}

}

export default CategoryTree;
