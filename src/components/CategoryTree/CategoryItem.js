import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './CategoryItem.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import SubItem from './CategoryItem';

@withStyles(s)
class CategoryItem extends Component {

	static propTypes = {
		className: PropTypes.string,
		items: PropTypes.array,
		cat: PropTypes.object,
		item: PropTypes.object,
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

		if (!this.props.isParent) {
			let imgPath = '/img/partImgPlaceholder.jpg';
			if (this.props.cat.image.Path !== '') {
				imgPath = `${this.props.cat.image.Scheme}://${this.props.cat.image.Host}${this.props.cat.image.Path}`;
			}
			catItems.push(
				<div className={s.cat} key={this.props.cat.id}>
					<Link to={this.props.item.to} title={this.props.cat.title}>
						<img className={cx(s.catImage)} src={imgPath} />
						<span className={cx(s.catTitle)}>{this.props.cat.title}</span>
					</Link>
				</div>
			);
		}

		this.props.items.map((item, i) => {
			catItems.push(
				<SubItem
					key={i}
					cat={item.cat}
					item={item}
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
				<div className={s.categories}>
					{this.categoryItems()}
				</div>
			</div>
		);
	}

}

export default CategoryItem;
