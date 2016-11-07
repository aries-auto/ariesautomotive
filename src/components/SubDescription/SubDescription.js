import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './SubDescription.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class SubDescription extends Component {

	static propTypes = {
		product: PropTypes.object,
	};

	renderSubDescription() {
		let desc = <span></span>;
		if (this.props.product.content && this.props.product.content.length > 0) {
			this.props.product.content.map((c) => {
				if (c.contentType.type.toLowerCase() === 'sub description') {
					desc = (<span>{ c.text }</span>);
				}
			});
			return desc;
		}
	}

	render() {
		return (
			<div className={cx(s.root)}>
        { this.renderSubDescription() }
			</div>
		);
	}

}

export default SubDescription;
