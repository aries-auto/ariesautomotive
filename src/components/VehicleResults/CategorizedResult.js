import React, { Component, PropTypes } from 'react';
import s from './CategorizedResult.scss';
import ResultSegment from './ResultSegment';
import Results from './Results';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class CategorizedResult extends Component {

	static propTypes = {
		parent: PropTypes.object,
		subs: PropTypes.array,
		activeIndex: PropTypes.number,
	};

	render() {
		const segments = [];
		const tmp = this.props.subs;
		while (tmp.length > 0) {
			const res = tmp.splice(0, 2);
			segments.push(
				<div>
					<ResultSegment activeIndex={this.props.activeIndex} results={res} />
					<Results activeIndex={this.props.activeIndex} results={res} />
				</div>);
		}

		return (
			<div className={s.root}>
				<h3>{this.props.parent.title}</h3>
				{segments}
			</div>
		);
	}

}

export default CategorizedResult;
