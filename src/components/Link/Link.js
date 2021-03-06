
import React, { Component, PropTypes } from 'react';
import ga from 'react-ga';
import parsePath from 'history/lib/parsePath';
import Location from '../../core/Location';

function isLeftClickEvent(event) {
	return event.button === 0;
}

function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {

	static propTypes = {
		to: PropTypes.string.isRequired,
		query: PropTypes.object,
		state: PropTypes.object,
		onClick: PropTypes.func,
		external: PropTypes.bool,
	};

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		let allowTransition = true;
		let clickResult;

		if (this.props && this.props.onClick) {
			clickResult = this.props.onClick(event);
		}

		if (isModifiedEvent(event) || !isLeftClickEvent(event) || (this.props && this.props.external)) {
			return;
		}

		if (clickResult === false || event.defaultPrevented === true) {
			allowTransition = false;
		}

		event.preventDefault();

		if (allowTransition) {
			const link = event.currentTarget;
			if (this.props && this.props.to) {
				ga.event({ category: 'Ariect:Link:', action: 'Open Link', label: this.props.to });
				Location.push({
					...(parsePath(this.props.to)),
					state: this.props && this.props.state || null,
				});
			} else {
				ga.event({ category: 'Ariect:Link:', action: 'Open Link', label: link.pathname });
				Location.push({
					pathname: link.pathname,
					search: link.search,
					state: this.props && this.props.state || null,
				});
			}
		}
	}

	render() {
		const { to, query, ...props } = this.props;
		const target = this.props.external ? '_blank' : '';
		return <a href={Location.createHref(to, query)} target={target} onClick={this.handleClick} {...props} />;
	}

}

export default Link;
