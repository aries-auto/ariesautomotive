import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Menu.scss';
import withStyles from '../../decorators/withStyles';
import MenuItem from './MenuItem';

@withStyles(s)
class Menu extends Component {

	static propTypes = {
		className: PropTypes.string,
		openTitle: PropTypes.string,
		items: PropTypes.array,
		open: PropTypes.bool,
		isParent: PropTypes.bool,
		openItem: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			open: props.open,
		};
		this.menuItems = this.menuItems.bind(this);
		this.collapse = this.collapse.bind(this);
	}

	collapse(title) {
		this.props.openItem(title);
	}

	menuItems() {
		if (!this.props.items || this.props.items.length === 0) {
			return null;
		}

		const menus = [];
		this.props.items.map((item, i) => {
			menus.push(
				<MenuItem
					key={i}
					parent={this.props.isParent}
					itemProp="url"
					to={item.to}
					title={item.title}
					text={item.text}
					children={item.children || []}
					open={this.props.openTitle === item.title}
					openItem={this.props.isParent ? this.collapse : null}
				/>
			);
		});

		return menus;
	}

	render() {
		return (
			<div className={cx(
					s.root,
					this.props.className,
					this.props.open || this.props.isParent ? '' : s.hide,
					this.props.isParent ? s.parent : '',
				)}
			>
				{this.menuItems()}
			</div>
		);
	}

}

export default Menu;
