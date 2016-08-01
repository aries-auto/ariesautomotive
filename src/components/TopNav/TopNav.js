import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './TopNav.scss';
import SearchForm from '../SearchForm';
import withStyles from '../../decorators/withStyles';
import topnav from '../../data/topnav';

@withStyles(s)
class TopNav extends Component {

	static propTypes = {
		className: PropTypes.string,
	};

	render() {
		return (
			<div className={cx(s.root, this.props.className) + ' row'} role="navigation">
				<div className="hidden-sm hidden-xs col-lg-4 col-md-4">
					<SearchForm />
				</div>
				<div className={cx('hidden-sm', 'hidden-xs', 'col-lg-8', 'col-md-8')}>
					<ul className={cx('nav', 'navbar-nav', 'pull-right', s.menu)}>
						{topnav.links.map((link, i) => {
							return (
								<li key={i} className={s.item}><a href={link.href} title={link.title}>{link.value}</a></li>
							);
						})}
					</ul>
				</div>
				<div className="clearfix"></div>
			</div>
		);
	}

}

export default TopNav;
