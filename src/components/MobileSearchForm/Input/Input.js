import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import cx from 'classnames';
import s from './Input.scss';
import withStyles from '../../../decorators/withStyles';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';

@withStyles(s)
class SearchInput extends Component {

	static propTypes = {
		className: PropTypes.string,
		term: PropTypes.string,
		close: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.closeOverlay = this.closeOverlay.bind(this);
		this.keydown = this.keydown.bind(this);
		this.state = {
			term: '',
		};
		this.transitionNames = {
			enter: s.transitionEnter,
			enterActive: s.transitionEnterActive,
			leave: s.transitionLeave,
			leaveActive: s.transitionLeaveActive,
			appear: s.transitionAppear,
			appearActive: s.transitionAppearActive,
		};
	}

	componentDidMount() {
		document.addEventListener('keydown', (e) => {
			this.keydown(e);
		});

		const el = ReactDOM.findDOMNode(this.refs.term);
		if (el) {
			el.focus();
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const term = this.refs.term.getValue();
		window.location = `/search/${term}`;
	}

	closeOverlay() {
		this.props.close();
	}

	keydown(e) {
		const ev = e || window.event;
		if (ev.type !== 'keydown' || ev.keyCode !== 27) {
			return;
		}

		this.closeOverlay();
	}

	render() {
		// TODO: ReactCSSTransitionGroup isn't working for some reason...
		// WORKS: http://codepen.io/agrewell/pen/ZYdGOJ

		return (
			<ReactCSSTransitionGroup
				transitionName={this.transitionNames}
				transitionEnterTimeout={5000}
				transitionLeaveTimeout={300}
				ref="input"
			>
				<form action="/search" method="get" className={cx(s.root, 'navbar-form', 'navbar-left', 'row', 'navbar-search')} onSubmit={this.handleSubmit} role="search">
					<Input type="search" name="term" ref="term" groupClassName={cx(s.group, 'col-sm-10', 'col-xs-10')} label="Enter search" placeholder="Search" />
					<Button type="button" bsStyle="link" onClick={this.closeOverlay} className={cx('col-sm-2', 'col-xs-2', s.closeButton)}>
						<span className={s.nodisplay}>Close</span>
						<Glyphicon bsClass={cx('glyphicon')} glyph="remove-sign" />
					</Button>
					<Button type="submit" bsStyle="default" className={cx('col-sm-2', 'col-xs-2', s.inputButton)}>
						<span className={s.nodisplay}>Search</span>
						<Glyphicon bsClass={cx('glyphicon', s.searchIcon)} glyph="search" />
					</Button>
				</form>
				<div className={s.overlay} onClick={this.closeOverlay}></div>
			</ReactCSSTransitionGroup>
		);
	}

}

export default SearchInput;
