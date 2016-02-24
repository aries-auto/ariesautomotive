import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Upsell.scss';
// import PartActions from '../../../actions/PartActions';
import PartStore from '../../../stores/PartStore';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Upsell extends Component {

	static propTypes = {
		parts: PropTypes.array,
		featured: PropTypes.array,
		className: PropTypes.string,
	};

	static defaultProps = {
		featured: [],
		parts: [],
	};

	constructor(props) {
		super();

		if (!props || !props.parts || props.parts.length === 0) {
			console.log('getting featured');
			// PartActions.featured();
		}
	}

	componentWillMount() {
	}

	static getStores() {
		return [PartStore];
	}

	static getPropsFromStores() {
		return PartStore.getState();
	}

	renderParts() {
		console.log(this.props);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)} role="navigation">
				<h1>Hello world</h1>
				{this.renderParts()}
			</div>
		);
	}

}

export default Upsell;
