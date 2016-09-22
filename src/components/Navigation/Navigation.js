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

	getCategories() {
		const cats = [];
		if (!this.props.categories || this.props.categories.length === 0) {
			return cats;
		}

		this.props.categories.sort((a, b) => a.sort > b.sort);
		this.props.categories.map((cat, i) => {
			if (cat.children && cat.children.length > 0) {
				return cats.push(
					<li key={i + 'child' + cat.id} role="presentation" className="dropdown">
						<a
							className={cx(s.link, 'dropdown-toggle')}
							data-toggle="dropdown"
							href={`/category/${cat.id}/${cat.title}`}
							role="button"
							aria-haspopup="true"
							aria-expanded="false"
						>
							{cat.title.toUpperCase()} <span className="caret"></span>
						</a>
						<ul className={cx(s.subMenu, 'dropdown-menu')} role="menu">
							{cat.children.sort((a, b) => a.sort > b.sort).map((sub, j) => {
								return (
									<li key={j + 'sub' + sub.id}>
										<a
											href={`/category/${sub.id}/${cat.title}/${sub.title}`}
										>
											{sub.title}
										</a>
									</li>
								);
							})}
						</ul>
					</li>
				);
			}
			return cats.push(
				<li key={i + 'parent' + cat.id} role="presentation">
					<a className={s.link} href={`/category/${cat.id}/${cat.title}`} aria-haspopup="true">
						{cat.title}
					</a>
				</li>
			);
		});

		return cats;
	}
	render() {
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
				<Lookup vehicle={this.props.vehicle} params={this.props.params} />
			</div>
		);
	}

}

export default Navigation;
