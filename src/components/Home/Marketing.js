import React, { Component, PropTypes } from 'react';
import ga from 'react-ga';
import cx from 'classnames';
import s from './Marketing.scss';
import Catalogs from './Catalogs';
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
						<iframe allowFullScreen="" frameBorder="0" height="315" src="https://www.youtube.com/embed/dT8xOZk0geQ?rel=0" width="420"></iframe>
					</div>
					<div className={cx(s.ytWrapper)}>
						<iframe allowFullScreen="" frameBorder="0" height="315" src="https://www.youtube.com/embed/lkxKCr3Gx5I?rel=0" width="420"></iframe>
					</div>
				</div>
				<div>
					<div className={cx(s.whatsNew, s.styleguard, 'row')}>
						<img src="https://storage.googleapis.com/aries-website/whatsnew/What's-New-Banner.png" alt="What's New with ARIES" className={cx(s.header)} />
						<div className={cx(s.callout)}>
							<a href="http://www.ariesautomotive.com/category/344/3%22%20Rocker%20Steps">
								<img src="https://storage.googleapis.com/aries-website/whatsnew/Rocker-Step.jpg" alt="Form and function. ARIES Rocker Steps." className="styleguard" />
								<span>Form and function. ARIES Rocker Steps.</span>
							</a>
						</div>
						<Catalogs />
					</div>
				</div>
			</div>
		);
	}

}

export default Home;
