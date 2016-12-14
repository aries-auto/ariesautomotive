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
		// we build the embed code to control rel until its fixed in the admin and in all existing videos.
		const tmpEmbedCode = `<iframe width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/${this.props.video.channel[0].foreign_id}?rel=0\" frameborder=\"0\" allowfullscreen></iframe>`;
		return (
			<div className={s.root} onClick={this.close}>
				<div
					className={s.videoModal}
					dangerouslySetInnerHTML={{ __html: tmpEmbedCode }}
				></div>
			</div>
		);
	}
}

export default ShadowboxVideo;
