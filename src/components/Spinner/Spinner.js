import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Spinner.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Spinner extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}

}

export default Spinner;
