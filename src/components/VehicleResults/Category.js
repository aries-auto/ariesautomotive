import React, { Component, PropTypes } from 'react';
import s from './Category.scss';

class Category extends Component {

	static propTypes = {
		catTitle: PropTypes.string,
		subs: PropTypes.array,
	};

	constructor() {
		super();
	}

	buildSubs() {
		const output = [];
		let cnt = 0;

		this.props.subs.map((sub) => {
			output.push(
				<div key={sub.parent + cnt} className={'col-md-6'}>
					{sub.title}
				</div>
			);
			cnt++;
		});

		return output;
	}

	render() {
		return (
			<div className={s.root}>
				<h2>{this.props.catTitle}</h2>
				{this.buildSubs()}
			</div>
		);
	}

}

export default Category;
