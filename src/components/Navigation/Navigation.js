import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import { brand } from '../../config';
import Link from '../Link';
import Lookup from '../Lookup/Lookup';
import Menu from './Menu';

@withStyles(s)
class Navigation extends Component {

	static propTypes = {
		className: PropTypes.string,
		categories: PropTypes.array,
		menu: PropTypes.array,
		vehicle: PropTypes.object,
		params: PropTypes.object,
	};

	render() {
		return (
			<div
				className={cx(s.root, this.props.className)}
				role="navigation"
			>
				<div className={s.logo}>
					<Link className={s.brand} to="/" title={brand.name}>
						<img src={brand.logo} alt={`${brand.name} Logo`} className="logo" />
					</Link>
				</div>
				<Menu items={this.props.menu} />
				<Lookup vehicle={this.props.vehicle} params={this.props.params} />
			</div>
		);
	}

}

export default Navigation;
