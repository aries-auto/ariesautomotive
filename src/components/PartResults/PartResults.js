import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './PartResults.scss';
import QuickView from '../Product/QuickView';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class PartResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		parts: PropTypes.array,
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				{this.props.parts.map((p, i) => <QuickView product={p} key={i} />)}
			</div>
		);
	}

}

export default PartResults;
