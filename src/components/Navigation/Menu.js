import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Menu.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Menu extends Component {

	static propTypes = {
		className: PropTypes.string,
		selectedItem: PropTypes.object,
		items: PropTypes.array,
	};

	constructor() {
		super();
		this.items = this.items.bind(this);
		this.pageClick = this.pageClick.bind(this);
		this.toggle = this.toggle.bind(this);
		this.mouseUpHandler = this.mouseUpHandler.bind(this);
		this.mouseDownHandler = this.mouseDownHandler.bind(this);

		this.state = {
			open: false,
			mouseIsDown: false,
		};
	}

	componentDidMount() {
		window.addEventListener('mousedown', this.pageClick, false);
		window.addEventListener('touchstart', this.pageClick, false);
	}

	pageClick() {
		if (this.state.mouseIsDown) {
			return;
		}

		this.setState({
			open: false,
		});
	}

	toggle(e) {
		e.preventDefault();

		this.setState({
			open: !this.state.open,
		});
	}

	mouseDownHandler() {
		this.setState({
			mouseIsDown: true,
		});
	}

	mouseUpHandler() {
		this.setState({
			mouseIsDown: false,
		});
	}

	items() {
		const items = [];
		if (!this.props.items || this.props.items.length === 0) {
			return items;
		}

		this.props.items.map((item, i) => {
			items.push(
				<Link key={i} external={item.external || false} itemProp="url" to={item.href} title={item.title}>
					{item.value}
				</Link>
			);
		});
		return items;
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<button
					type="button"
					className={cx('navbar-toggle', s.menuIcon)}
					aria-expanded="false"
					onClick={this.toggle}
				>
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar" />
					<span className="icon-bar" />
					<span className="icon-bar" />
				</button>
				<div onTouchStart={this.mouseDownHandler} onTouchEnd={this.mouseUpHandler} onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler} className={ this.state.open ? s.open : ''}>
					{this.items()}
				</div>
			</div>
		);
	}

}

export default Menu;
