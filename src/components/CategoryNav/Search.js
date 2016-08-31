import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Search.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Search extends Component {

	static propTypes = {
		className: PropTypes.string,
		params: PropTypes.object,
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className)}></div>
		);
	}

}

export default Search;
