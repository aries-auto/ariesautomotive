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
		fitments: PropTypes.array,
	};

	render() {
		let out = [];
		this.props.results.map((res, i) => {
			let tmp = null;
			if (this.props.activeIndex !== null && res.category.id === this.props.activeIndex) {
				tmp = <Result key={`result-${i}`} fitments={this.props.fitments} className={s.mobileResult} result={res} activeIndex={this.props.activeIndex} />;
			}
			out = out.concat([
				<Subcategory key={`sub-${i}`}
					title={res.category.title}
					id={res.category.id}
					active={(this.props.activeIndex !== null && res.category.id === this.props.activeIndex)}
					image={`${res.category.image.Scheme}://${res.category.image.Host}${res.category.image.Path}`}
				/>,
				tmp,
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
