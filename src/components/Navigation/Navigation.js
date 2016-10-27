import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import { brand } from '../../config';
import Link from '../Link';
import Lookup from '../Lookup/Lookup';
import LvLookup from '../Lookup/LvLookup';
import Menu from './Menu';

@withStyles(s)
class Navigation extends Component {

	static propTypes = {
		className: PropTypes.string,
		menu: PropTypes.array,
		vehicle: PropTypes.object,
		params: PropTypes.object,
	};

	render() {
		let lookup = null;
		switch (brand.id) {
		case 3:
			lookup = <Lookup vehicle={this.props.vehicle} params={this.props.params} />;
			break;
		case 4:
			lookup = <LvLookup vehicle={this.props.vehicle} params={this.props.params} />;
			break;
		default:
		}

		return (
			<div
				className={cx(s.root, this.props.className)}
				role="navigation"
			>
				<div className={s.logo}>
					<Link className={s.brand} to={`/`} title={brand.name}>
						<img src={brand.logo} alt={`${brand.name} Logo`} className="logo" />
					</Link>
				</div>
				<Menu items={this.props.menu} />
				{ lookup }
			</div>
		);
	}

}

export default Navigation;
