import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class Alert extends Component {

	static propTypes = {
		success: PropTypes.object,
		error: PropTypes.object,
	};

	render() {
		if (this.props.error) {
			return (
				<div className={cx('form-group', 'col-xs-12', 'alert', 'alert-danger')}>
					Error: {this.props.error.message}
				</div>);
		} else if (this.props.success) {
			return (
				<div className={cx('form-group', 'col-xs-12', 'alert', 'alert-success')}>
					<a href="/">Thank you. We have received your request.</a>
				</div>
			);
		}

		return <div></div>;
	}
}

export default Alert;
