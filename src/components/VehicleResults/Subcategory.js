import React, { Component, PropTypes } from 'react';
import s from './Subcategory.scss';

class Subcategory extends Component {

	static propTypes = {
		subs: PropTypes.array,
	};

	constructor() {
		super();
	}

	componentWillMount() {
	}

	render() {
		return (
			<div className={s.root}>
			</div>
		);
	}

}

export default Subcategory;
