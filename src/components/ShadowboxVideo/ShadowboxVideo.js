import React, { Component, PropTypes } from 'react';
import withStyles from '../../decorators/withStyles';
import s from './ShadowboxVideo.scss';
import ProductActions from '../../actions/ProductActions';

@withStyles(s)
class ShadowboxVideo extends Component {

	static propTypes = {
		video: PropTypes.object,
		className: PropTypes.string,
	};

	close() {
		ProductActions.setActiveVideo(null);
	}

	render() {
		if (!this.props.video) {
			return null;
		}

		return (
			<div className={s.root} onClick={this.close}>
				<div
					className={s.videoModal}
					dangerouslySetInnerHTML={{ __html: this.props.video.channel[0].embed_code }}
				></div>
			</div>
		);
	}
}

export default ShadowboxVideo;
