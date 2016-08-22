import React, { Component, PropTypes } from 'react';
import s from './Subcategory.scss';
import VehicleActions from '../../actions/VehicleActions';

class Subcategory extends Component {

	static propTypes = {
		subs: PropTypes.array,
	};

	constructor() {
		super();
	}

	componentWillMount() {
	}

	setActiveCategory(cat) {
		VehicleActions.setActiveCategory(cat);
	}

	render() {
		return (
			<div className={s.root}>
			</div>
		);
	}

}

export default Subcategory;
