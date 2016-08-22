import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './MenuItem.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Menu from './Menu';

@withStyles(s)
class MenuItem extends Component {

	static propTypes = {
		className: PropTypes.string,
		to: PropTypes.string,
		itemProp: PropTypes.string,
		title: PropTypes.string,
		text: PropTypes.string,
		children: PropTypes.array,
		openItem: PropTypes.func,
		parent: PropTypes.bool,
		open: PropTypes.bool,
	};

	constructor(props) {
		super(props);

		this.children = this.children.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	toggle(e) {
		if (!this.props.children || this.props.children.length === 0) {
			return;
		}
		e.preventDefault();

		this.props.openItem(this.props.title);
	}

	children() {
		if (this.props.children && this.props.children.length === 0) {
			return null;
		}

		return <Menu open={this.props.open} items={this.props.children} />;
	}

	render() {
		return (
			<div className={cx(
					s.root,
					this.props.className,
					this.props.parent ? s.parent : '',
				)}
			>
				<Link itemProp={this.props.itemProp} onClick={ this.props.parent ? this.toggle : null } to={this.props.to} title={this.props.title}>
					<span>{this.props.text}</span>
					{ this.props.children ? <span></span> : <i></i>}
				</Link>
				{this.children()}
			</div>
		);
	}

}

export default MenuItem;
