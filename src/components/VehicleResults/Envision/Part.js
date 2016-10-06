import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Part.scss';
import withStyles from '../../../decorators/withStyles';
import Link from '../../Link';
import VehicleActions from '../../../actions/VehicleActions';

@withStyles(s)
class Part extends Component {

	static propTypes = {
		className: PropTypes.string,
		part: PropTypes.object,
	};

	constructor() {
		super();

		this.handleRemovePart = this.handleRemovePart.bind(this);
	}

	handleRemovePart() {
		VehicleActions.removeEnvisionPart(this.props.part);
	}

	render() {
		let img = 'https://storage.googleapis.com/aries-website/site-assets/noimage.jpg';
		const imgs = (this.props.part.images || []).filter((i) => i.width === 300).sort((a, b) => a.sort.localeCompare(b.sort));
		if (imgs && imgs.length > 0) {
			img = `${imgs[0].path.Scheme}://${imgs[0].path.Host}${imgs[0].path.Path}`;
		}

		return (
			<div className={s.root}>
				<img src={img} alt={this.props.part.short_description} />
				<div>
					<p>{this.props.part.short_description}</p>
					<p>{this.props.part.part_number}</p>
					<Link
						to={`/part/${this.props.part.part_number}`}
						className={cx('btn', 'red-transparent-button', s.viewDetails)}
						title={this.props.part.short_description}
						role="button"
					>
						View Details
					</Link>
				</div>
				<span className={cx('glyphicon glyphicon-remove', s.x)}></span>
			</div>
		);
	}

}

export default Part;
