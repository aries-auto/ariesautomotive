import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './../WhereToBuy.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class Locations extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	constructor() {
		super();
	}

	render() {
		return (
			<div className={cx()}>
			</div>
		);
	}
}

export default Locations;
