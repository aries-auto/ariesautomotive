import React, { Component, PropTypes } from 'react';
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
	}


	render() {
		return (
			<div className={cx(s.root, 'container', this.props.className)}>
				<div>
					<h1>Unique, New Step-in-Step</h1>
					<p>
						ARIES all-new ActionTrac™ powered running boards offer an innovative step-within-a-step design. They’re actually two steps in one, providing the easiest possible access, especially on larger, lifted trucks and Jeeps.
					</p>
					<p>
						ActionTrac™ running boards also feature smart sensors for automated operation, powder-coated aluminum construction for maximum corrosion resistance and an easy, no-drill installation.
					</p>
					<div className={cx(s.ytWrapper)}>
						<iframe allowFullScreen="" frameBorder="0" height="315" src="https://www.youtube.com/embed/aAeQvvZN-GE?rel=0" width="420"></iframe>
					</div>
					<div className={cx(s.ytWrapper)}>
						<iframe allowFullScreen="" frameBorder="0" height="315" src="https://www.youtube.com/embed/lkxKCr3Gx5I?rel=0" width="420"></iframe>
					</div>
				</div>
				<div>
					<div className={cx(s.whatsNew, s.styleguard, 'row')}>
						<img src="https://storage.googleapis.com/aries-website/whatsnew/What's-New-Banner.png" alt="What's New with ARIES" className={cx(s.header)} />
						<div className={cx(s.callout)}>
							<a href="/category/467/ActionTrack%20Powered%20Running%20Boards">
								<img src="https://storage.googleapis.com/aries-website/whatsnew/Current%20Site%20-%20Whats%20New%20with%20ARIES.gif" alt="Innovative Step within a Step" className="styleguard" />
								<span>Innovative Step within a Step.</span>
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
