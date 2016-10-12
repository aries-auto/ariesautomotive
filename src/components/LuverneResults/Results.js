import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Results.scss';
import Result from './Result';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';
import LuverneStore from '../../stores/LuverneStore';

@withStyles(s)
@connectToStores
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
		configs: PropTypes.array,
	};

	static getStores() {
		return [LuverneStore];
	}

	static getPropsFromStores() {
		return LuverneStore.getState();
	}


	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				{this.props.results.map((r, i) => {
					if (this.props.activeIndex === null || r.category.id !== this.props.activeIndex) {
						return null;
					}

					return <Result key={i} fitments={r.fitments} result={r} activeIndex={this.props.activeIndex} iconParts={this.props.iconParts} />;
				})}
			</div>
		);
	}

}

export default Results;
