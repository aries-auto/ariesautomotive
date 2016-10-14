import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './CategoryItem.scss';
import withStyles from '../../decorators/withStyles';
import SubItem from './CategoryItem';

@withStyles(s)
class CategoryItem extends Component {

	static propTypes = {
		className: PropTypes.string,
		items: PropTypes.array,
		cat: PropTypes.object,
		isParent: PropTypes.bool,
	};

	constructor(props) {
		super(props);

		this.menuItems = this.categoryItems.bind(this);
	}


	categoryItems() {
		const catItems = [];
		if (!this.props.items) {
			return null;
		}

		this.props.items.map((item, i) => {
			catItems.push(
				<SubItem
					key={i}
					cat={item.cat}
					items={item.items}
					isParent={false}
				/>
			);
		});

		return catItems;
	}

	render() {
		return (
			<div className={cx(
					s.root,
					this.props.className,
					this.props.isParent ? s.parent : '',
				)}
			>
				<span className={cx(s.catTitle)}>{this.props.cat.title}</span>
				{this.categoryItems()}
			</div>
		);
	}

}

export default CategoryItem;
