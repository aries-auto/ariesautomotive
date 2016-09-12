import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './QuickView.scss';
import Link from '../../Link';
import withStyles from '../../../decorators/withStyles';
import { brand } from '../../../config';

@withStyles(s)
class QuickView extends Component {

	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object,
	};

	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<Link to={`/part/${this.props.product.part_number}/${this.props.product.short_description}`} title={`${brand.name} #${this.props.product.part_number} - ${this.props.product.short_description}`} className={cx(s.root, this.props.className)}>
				<div>
					<span>{this.props.product.short_description || ''} - {this.props.product.part_number}</span>
				</div>
				<div>
					<img src={this.state.image || '/img/partImgPlaceholder.jpg'} alt={`${brand.name} #${this.props.product.part_number} - ${this.props.product.short_description}`} />
				</div>
			</Link>
		);
	}

}

export default QuickView;
