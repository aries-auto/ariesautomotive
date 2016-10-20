import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Subcategory.scss';
import withStyles from '../../decorators/withStyles';
import LuverneActions from '../../actions/LuverneActions';

@withStyles(s)
class Subcategory extends Component {

	static propTypes = {
		id: PropTypes.number,
		image: PropTypes.string,
		title: PropTypes.string,
		active: PropTypes.bool,
	};

	constructor() {
		super();

		this.setActiveIndex = this.setActiveIndex.bind(this);
	}

	setActiveIndex(e) {
		e.preventDefault();
		LuverneActions.setActiveIndex(this.props.id);
	}

	render() {
		// console.log(this.props);
		return (
			<a onClick={this.setActiveIndex} className={cx(s.root, this.props.active ? s.active : '')}>
				<img alt={this.props.title} src={this.props.image} />
				<span>{this.props.title}</span>
			</a>
		);
	}

}

export default Subcategory;
