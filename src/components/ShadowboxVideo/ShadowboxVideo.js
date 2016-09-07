import React, { Component, PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import s from './ShadowboxVideo.scss';

@withStyles(s)
class ShadowboxVideo extends Component {

	static propTypes = {
		video: PropTypes.object,
		className: PropTypes.string,
	};

	render() {
		if (!this.props.video) {
			return null;
		}

		return (
			<div className={s.root} onClick={this.handleModalClose}>
				<div
					className={s.videoModal}
					dangerouslySetInnerHTML={{ __html: this.props.video.channel[0].embed_code }}
				></div>
			</div>
		);
	}
}

export default ShadowboxVideo;
