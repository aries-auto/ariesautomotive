import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './CategoryParts.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';
import LuverneStore from '../../stores/LuverneStore';
import LuverneActions from '../../actions/LuverneActions';
import Results from '../LuverneResults/Results';

@withStyles(s)
@connectToStores
class LvCategoryParts extends Component {

	static propTypes = {
		catID: PropTypes.number,
		vehicle: PropTypes.object,
		envision: PropTypes.object,
		fitments: PropTypes.array,
	};

	static getStores() {
		return [LuverneStore];
	}

	static getPropsFromStores() {
		return LuverneStore.getState();
	}

	renderParts() {
		const res = [];
		if (!this.props.vehicle.lookup_category.length > 0) {
			return <span></span>;
		}

		this.props.vehicle.lookup_category.map((l) => {
			if (l.category.id === this.props.catID) {
				res.push(l);
			}
		});

		LuverneActions.setActiveIndex(this.props.catID);

		if (res.length === 0) {
			return <span></span>;
		}

		return (
			<div>
				<strong>Your Vehicle Parts</strong>
				<Results className={'catres'} fitments={this.props.fitments} results={res} />
			</div>
		);
	}

	render() {
		return (
			<div className={cx(s.root)} role="navigation">
				{this.renderParts()}
			</div>
		);
	}

}

export default LvCategoryParts;
