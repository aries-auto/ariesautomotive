import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Results.scss';
import Result from './Result';
import withStyles from '../../decorators/withStyles';
import VehicleStore from '../../stores/VehicleStore';

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
					if (this.props.fitments.length === 0 && r.style_options[0].style.toLowerCase() === 'all') {
						VehicleStore.fetchFitments(r, 'all');
					}
					return <Result key={i} fitments={this.props.fitments} result={r} activeIndex={this.props.activeIndex} iconParts={this.props.iconParts} />;
				})}
			</div>
		);
	}

}

export default Results;
