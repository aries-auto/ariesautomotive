import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './VehicleResults.scss';
// import Location from '../../core/Location';
import withStyles from '../../decorators/withStyles';
import VehicleStore from '../../stores/VehicleStore';
import VehicleActions from '../../actions/VehicleActions';
import LookupActions from '../../actions/LookupActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import VehicleStyle from './VehicleStyle';

@withStyles(s)
@connectToStores
class VehicleResults extends Component {

	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.shape({
			params: PropTypes.shape({
				year: PropTypes.string,
				make: PropTypes.string,
				model: PropTypes.string,
			}),
		}),
		vehicle: PropTypes.shape({
			year: PropTypes.string,
			make: PropTypes.string,
			model: PropTypes.string,
		}),
		categoryparts: PropTypes.object,
		category: PropTypes.string,
	};

	constructor() {
		super();
		this.state = {
			context: {},
		};
		this.getCategoryStyles = this.getCategoryStyles.bind(this);
		this.setCategoryStyle = this.setCategoryStyle.bind(this);
	}

	componentWillMount() {
		VehicleActions.set({
			year: this.props.context.params.year,
			make: this.props.context.params.make,
			model: this.props.context.params.model,
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps === this.props) {
			return;
		}
		// setdefaultPartCategory
		let i = 0;
		for (const cat in nextProps.categoryparts) {
			if (!cat) {
				return;
			}
			if (!this.state.category && i === 0) {
				this.setState({
					category: cat,
					categoryparts: nextProps.categoryparts[cat],
				});
			}
			i++;
		}

		// set vehicle Props for Lookup
		LookupActions.set(this.props.vehicle);
	}

	static getStores() {
		return [VehicleStore];
	}

	static getPropsFromStores() {
		return VehicleStore.getState();
	}

	getCategoryStyles() {
		const output = [];
		for (const cat in this.props.categoryparts) {
			if (!cat) {
				return output;
			}
			const active = this.state.category === cat;
			output.push(
				<li key={cat} className={cx(s.categoryStyle, (active ? s.active : ''))} role="presentation">
					<a onClick={this.setCategoryStyle.bind(this, cat, this.props.categoryparts[cat])}>{cat.toUpperCase()}</a>
				</li>
			);
		}
		return output;
	}

	setCategoryStyle(cat, categoryparts) {
		this.setState({
			category: cat,
			categoryparts,
		});
	}

	render() {
		return (
			<div className={s.container}>
				<div className={cx(s.root, this.props.className)} role="navigation">
					<div className="tab-wrap">
						<ul className="nav nav-pills nav-stacked lg-tabs" role="tablist">
							{this.getCategoryStyles()}
						</ul>
					</div>
				</div>
				{this.state.category ? <VehicleStyle className={s.vehicleStyle} category={this.state.category} categoryparts={this.state.categoryparts}/> : null}
				<div className={s.clearfix}></div>
			</div>
		);
	}

}

export default VehicleResults;
