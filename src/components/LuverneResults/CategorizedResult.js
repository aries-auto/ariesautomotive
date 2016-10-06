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
		fitments: PropTypes.array,
		iconParts: PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array,
		]),
	};

	render() {
		const segments = [];
		const tmp = this.props.subs;
		while (tmp.length > 0) {
			const res = tmp.splice(0, 2);
			segments.push(
				<div key={segments.length}>
					<ResultSegment fitments={this.props.fitments} activeIndex={this.props.activeIndex} results={res} iconParts={this.props.iconParts} />
					<Results fitments={this.props.fitments} activeIndex={this.props.activeIndex} results={res} iconParts={this.props.iconParts} />
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
