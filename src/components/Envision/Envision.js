import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Envision.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Envision';

@withStyles(s)
class Envision extends Component {

	static propTypes = {
		className: PropTypes.string,
		protocol: PropTypes.string,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	componentWillMount() {
		this.context.onSetTitle(title);
		this.context.onSetMeta(title);
		const seo = {
			title,
		};
		this.context.seo(seo);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div className="iconfig-container">
					<div className="container-fluid">
						<div className="container">
							<h3>Envision ARIES</h3>
							<p>See what your vehicle will look like with ARIES accessories fully installed, even before deciding which ones you actually want! Simply select your year, make, model, style and color. Then select one or more accessories to preview. When you're satisfied with your selections, connect to one of our dealers by going to <a href="/buy">Where to Buy</a>.</p>
							<div id="icf_page"></div>
							<script src="//ver1.iconfigurators.com/src/embed.cfm?ky=539D7C9D0B8B72F4966C"></script>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default Envision;
