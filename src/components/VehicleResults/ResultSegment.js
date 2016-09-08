import React, { Component, PropTypes } from 'react';
import s from './ResultSegment.scss';
import Subcategory from './Subcategory';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class ResultSegment extends Component {

	static propTypes = {
		results: PropTypes.array,
		activeIndex: PropTypes.number,
	};

	render() {
		const out = [];
		this.props.results.map((res) => {
			out.push(
				<Subcategory
					title={res.category.title}
					id={res.category.id}
					active={(this.props.activeIndex !== null && res.category.id === this.props.activeIndex)}
					image={`${res.category.image.Scheme}://${res.category.image.Host}${res.category.image.Path}`}
				/>
			);
		});

		return (
			<div className={s.root}>
				{out}
			</div>
		);
	}

}

export default ResultSegment;
