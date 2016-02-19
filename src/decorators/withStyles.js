import React, { Component, PropTypes } from 'react';

function withStyles(...styles) {
	return (BaseComponent) => class StyledComponent extends Component {
		static contextTypes = {
			insertCss: PropTypes.func.isRequired,
		};

		componentWillMount() {
			this.removeCss = this.context.insertCss.apply(undefined, styles);
		}

		componentWillUnmount() {
			this.removeCss();
		}

		static getStores() {
			return [];
		}

		static getPropsFromStores() {
			return {};
		}

		render() {
			return <BaseComponent {...this.props} />;
		}
	};
}

export default withStyles;
