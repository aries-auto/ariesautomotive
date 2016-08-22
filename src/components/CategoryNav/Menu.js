import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Menu.scss';
import withStyles from '../../decorators/withStyles';
import MenuItem from './MenuItem';

@withStyles(s)
class Menu extends Component {

	static propTypes = {
		className: PropTypes.string,
		items: PropTypes.array,
		showChildren: PropTypes.bool,
		isParent: PropTypes.bool,
	};

	constructor(props) {
		super(props);

		this.state = {
			showChildren: props.showChildren,
		};

		this.menuItems = this.menuItems.bind(this);
		this.clearOpen = this.clearOpen.bind(this);
	}

	componentWillReceiveProps(props) {
		if (this.props.showChildren !== props.showChildren) {
			this.setState({
				showChildren: props.showChildren,
			});
		}
	}

	clearOpen() {
		this.setState({
			showChildren: false,
		});
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
					children={item.children}
					clearOpen={this.clearOpen}
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
					!this.state.showChildren && !this.props.isParent ? s.hide : '',
					this.props.isParent ? s.parent : '',
				)}
			>
				{this.menuItems()}
			</div>
		);
	}

}

export default Menu;
