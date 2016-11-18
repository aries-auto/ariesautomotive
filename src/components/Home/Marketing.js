import React, { Component, PropTypes } from 'react';
import ga from 'react-ga';
import cx from 'classnames';
import s from './Marketing.scss';
import Modal from 'react-modal';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Home extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			modalStyles: {
				overlay: {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.75)',
					zIndex: '40',
				},
				content: {
					top: '30%',
					left: '30%',
					right: 'auto',
					bottom: 'auto',
					padding: '0',
					transform: 'translate(-25%, -25%)',
					width: '80%',
					height: '80%',
					borderRadius: '0',
					border: '0',
				},
			},
			modalIsOpen: false,
		};
	}

	openModal() {
		ga.event({ category: 'Ariect:HP', action: 'Open Modal', label: 'StyleGaurd' });
		this.setState({
			context: this.state.context,
			modalIsOpen: true,
		});
	}

	closeModal() {
		this.setState({
			context: this.state.context,
			modalIsOpen: false,
		});
	}

	render() {
		return (
			<div className={cx(s.root, 'container', this.props.className)}>
				<div>
					<h1>DO IT WITH STYLE. DO IT WITH ARIES</h1>
					<p>
						They change the rules, so we make up our own. They put up road blocks; we find a way around. They tell us there is no path ahead; we blaze a trail. At ARIES, we get revved up about going off the beaten path. From our Pro Series grille guards and modular
						Jeep bumpers to our StyleGuard&trade; floor liners and Seat Defenders, ARIES offers freedom of customization and a perfect fit for your vehicle. So whatever terrain you choose to conquer, do it with style and do it with ARIES.
					</p>
					<div className={cx(s.ytWrapper)}>
						<iframe allowFullScreen="" frameBorder="0" height="315" src="https://www.youtube.com/embed/RsH5vaVF4w4" width="420"></iframe>
					</div>
					<div className={cx(s.ytWrapper)}>
						<iframe allowFullScreen="" frameBorder="0" height="315" src="https://www.youtube.com/embed/8RaC5j5UT5w" width="420"></iframe>
					</div>
				</div>
				<div>
					<div onClick={this.openModal} className={cx(s.whatsNew, s.styleguard, 'row')}>
						<img src="https://storage.googleapis.com/aries-website/whatsnew/What's-New-Banner.png" alt="What's New with ARIES" className={cx(s.header)} />
						<div className={cx(s.callout)}>
							<img src="https://storage.googleapis.com/aries-website/whatsnew/ARIES-Floor-Liner-Artistic-Black%20(20).jpg" alt=" Introducing StyleGuard Floor Liners" className="styleguard" />
							<span>Introducing StyleGuard&trade; Floor Liners</span>
						</div>
					</div>
				</div>

				{/* YouTube Modal */}
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={this.state.modalStyles}
				>
					<iframe className={s.modalIframe} src="https://www.youtube.com/v/8GzILyP_2BM" frameBorder="0" allowFullscreen></iframe>
				</Modal>
			</div>
		);
	}

}

export default Home;
