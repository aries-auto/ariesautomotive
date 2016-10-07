import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Results.scss';
import Result from './Result';
import withStyles from '../../decorators/withStyles';
// import LuverneStore from '../../stores/LuverneStore';

@withStyles(s)
class Results extends Component {

	static propTypes = {
		results: PropTypes.array.isRequired,
		activeIndex: PropTypes.number,
		className: PropTypes.string,
		fitments: PropTypes.array,
		iconParts: PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array,
		]),
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				{this.props.results.map((r, i) => {
					if (this.props.activeIndex === null || r.category.id !== this.props.activeIndex) {
						return null;
					}
					// if (this.props.fitments.length === 0) {
					// 	LuverneStore.fetchFitments(r, this.props.activeIndex);
					// }

					return <Result key={i} fitments={r.fitments} result={r} activeIndex={this.props.activeIndex} iconParts={this.props.iconParts} />;
				})}
			</div>
		);
	}

}

export default Results;
