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
		clearOpen: PropTypes.func,
		open: PropTypes.bool,
		parent: PropTypes.bool,
	};

	constructor(props) {
		super(props);

		this.state = {
			open: props.open || false,
		};

		this.handleDrop = this.handleDrop.bind(this);
		this.children = this.children.bind(this);
	}

	componentWillReceiveProps(props) {
		if (this.props.open !== props.open) {
			this.props.clearOpen();
			this.setState({
				open: props.open || false,
			});
		}
	}

	handleDrop(e) {
		e.preventDefault();
		this.props.clearOpen();
		this.setState({
			open: !this.state.open,
		});
	}

	children() {
		if (this.props.children && this.props.children.length === 0) {
			return null;
		}

		return <Menu showChildren={this.state.open} items={this.props.children} />;
	}

	render() {
		return (
			<div className={cx(
					s.root,
					this.props.className,
					this.props.parent ? s.parent : '',
				)}
			>
				<Link itemProp={this.props.itemProp} onClick={this.handleDrop} to={this.props.to} title={this.props.title}>
					<span>{this.props.text}</span>
					{ this.props.children ? <span></span> : <i></i>}
				</Link>
				{this.children()}
			</div>
		);
	}

}

export default MenuItem;
