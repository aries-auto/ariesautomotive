import React, { Component, PropTypes } from 'react';
import s from './Results.scss';
import Result from './Result';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Results extends Component {

	static propTypes = {
		results: PropTypes.array.isRequired,
		activeIndex: PropTypes.number,
	};

	render() {
		return (
			<div className={s.root}>
				{this.props.results.map((r) => <Result result={r} activeIndex={this.props.activeIndex} />)}
			</div>
		);
	}

}

export default Results;
