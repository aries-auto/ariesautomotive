import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './CategoryTree.scss';
import withStyles from '../../decorators/withStyles';
import CategoryStore from '../../stores/CategoryStore';
import SiteStore from '../../stores/SiteStore';
import connectToStores from 'alt-utils/lib/connectToStores';
import CategoryItem from './CategoryItem';

@withStyles(s)
@connectToStores
class CategoryTree extends Component {

	static propTypes = {
		className: PropTypes.string,
		categories: PropTypes.array,
		params: PropTypes.object,
		pageData: PropTypes.object,
		linkOverride: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.categoryToItem = this.categoryToItem.bind(this);
		this.renderCatItems = this.renderCatItems.bind(this);
		this.renderSiteContent = this.renderSiteContent.bind(this);

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
			this.state.items = this.state.items.concat(tmp.items);
		});
	}

	static getStores() {
		return [CategoryStore, SiteStore];
	}

	static getPropsFromStores() {
		return {
			...SiteStore.getState(),
			...CategoryStore.getState(),
		};
	}

	categoryToItem(cat) {
		if (cat.children && cat.children.length > 0) {
			cat.children.sort((a, b) => a.sort > b.sort);
		}
		const item = {
			cat,
			to: this.props.linkOverride ? `${this.props.linkOverride}/${cat.id}/${cat.title}` : `/category/${cat.id}/${cat.title}`,
			text: cat.title,
			children: cat.children ? cat.children.map(this.categoryToItem) : [],
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
			if (!item.children || !item.children.length === 0) {
				return;
			}
			let subs = [];
			if (item.children && item.children.length > 0) {
				(item.children || []).map((cat) => {
					subs = subs.concat(cat);
				});
			} else {
				subs = subs.concat(item);
			}
			if (subs.length > 0) {
				const elm = (
					<div className={cx(s.categoriesContainer, 'well')} key={item.cat.id}>
						<h2 className={s.catHeading}>{item.cat.title}</h2>
						<CategoryItem item={item} cat={item.cat} items={subs} isParent />
					</div>
				);
				itemElms.push(elm);
			}
		});
		return itemElms;
	}

	renderSiteContent() {
		if (!this.props.pageData || !this.props.pageData.contentRevisions) {
			return null;
		}
		return (
			<div dangerouslySetInnerHTML={{ __html: this.props.pageData.contentRevisions[0].text }} />
		);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div className={'container'}>
					{this.renderSiteContent()}
				</div>
				<div className={'container'}>
					{this.renderCatItems()}
				</div>
			</div>
		);
	}

}

export default CategoryTree;
