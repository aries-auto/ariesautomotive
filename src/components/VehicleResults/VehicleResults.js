import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './VehicleResults.scss';
// import Location from '../../core/Location';
import withStyles from '../../decorators/withStyles';
import VehicleStore from '../../stores/VehicleStore';
import VehicleActions from '../../actions/VehicleActions';
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
			output.push(
				<li key={cat} className={cx(s.categoryStyle, (this.state.category === cat ? s.active : ''))} role="presentation">
					<a onClick={this.setCategoryStyle.bind(this, cat)}>{cat}</a>
				</li>
			);
		}
		return output;
	}

	setCategoryStyle(cat) {
		this.setState({
			category: cat,
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
				{this.state.category ? <VehicleStyle className={s.vehicleStyle} category={this.state.category}/> : null}
			</div>
		);
	}

}

export default VehicleResults;
