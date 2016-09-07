import React, { Component, PropTypes } from 'react';
import s from './InstallButtons.scss';
import ProductActions from '../../actions/ProductActions';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class InstallButtons extends Component {

	static propTypes = {
		installSheet: PropTypes.object,
		videos: PropTypes.array,
	};

	setActiveVideo(vid) {
		ProductActions.setActiveVideo(vid);
	}

	renderSheet() {
		if (!this.props.installSheet || this.props.installSheet.Path === '') {
			return null;
		}

		const path = `${this.props.installSheet.Scheme}://${this.props.installSheet.Host}${this.props.installSheet.Path}`;
		return (
			<a href={path} target="_blank">
				<span className="glyphicon glyphicon-wrench"></span>
				Install Sheet
			</a>
		);
	}

	renderVideo() {
		let video;
		(this.props.videos || []).map((vid) => {
			if (vid.subject_type && vid.subject_type.toLowerCase() === 'installation video') {
				video = (
					<a aria-controls="Installation Videos" role="button" onClick={this.setActiveVideo.bind(this, vid)}>
						<span className="glyphicon glyphicon-play"></span>
						Install Video
					</a>
				);
			}
		});
		return video;
	}

	render() {
		return (
			<div className={s.root}>
				{/* Install Sheet */}
				{this.renderSheet()}

				{/* Install Video */}
				{this.renderVideo()}

				{/* Where To Buy */}
				<Link to={`/buy`} title="Where To Buy" role="button">
					<span className="glyphicon glyphicon-usd"></span>
					Where To Buy
				</Link>
			</div>
		);
	}
}

export default InstallButtons;
