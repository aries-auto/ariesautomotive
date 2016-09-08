import React, { Component, PropTypes } from 'react';
import s from './ResultSegment.scss';
import Subcategory from './Subcategory';
import Result from './Result';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class ResultSegment extends Component {

	static propTypes = {
		results: PropTypes.array,
		activeIndex: PropTypes.number,
	};

	render() {
		let out = [];
		this.props.results.map((res) => {
			out = out.concat([
				<Subcategory
					title={res.category.title}
					id={res.category.id}
					active={(this.props.activeIndex !== null && res.category.id === this.props.activeIndex)}
					image={`${res.category.image.Scheme}://${res.category.image.Host}${res.category.image.Path}`}
				/>,
				<Result className={s.mobileResult} result={res} activeIndex={this.props.activeIndex} />,
			]);
		});

		return (
			<div className={s.root}>
				{out}
			</div>
		);
	}

}

export default ResultSegment;
