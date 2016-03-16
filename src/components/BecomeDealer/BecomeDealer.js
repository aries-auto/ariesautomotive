import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './BecomeDealer.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class BecomeDealer extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	constructor() {
		super();
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className, 'container')}>
			</div>
		);
	}

}

export default BecomeDealer;
