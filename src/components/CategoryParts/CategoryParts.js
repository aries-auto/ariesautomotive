import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './CategoryParts.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';
import VehicleStore from '../../stores/VehicleStore';
import Results from '../VehicleResults/Results';

@withStyles(s)
@connectToStores
class CategoryParts extends Component {

	static propTypes = {
		catID: PropTypes.int,
		vehicle: PropTypes.object,
		envision: PropTypes.object,
		fitments: PropTypes.array,
	};

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
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

		return (
			<div>
				<strong>Your Vehicle Parts</strong>
				<Results className={'catres'} fitments={this.props.fitments} activeIndex={this.props.catID} results={res} />
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

export default CategoryParts;
