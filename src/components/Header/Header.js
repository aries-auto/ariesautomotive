import React, { Component, PropTypes } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Navigation from '../Navigation';
import CategoryNav from '../CategoryNav';

@withStyles(s)
class Header extends Component {

	static propTypes = {
		context: PropTypes.shape({
			insertCss: PropTypes.func,
			onSetTitle: PropTypes.func,
			onSetMeta: PropTypes.func,
			onPageNotFound: PropTypes.func,
			categories: PropTypes.array,
			vehicle: PropTypes.array,
			params: PropTypes.object,
			siteContents: PropTypes.array,
			siteMenu: PropTypes.array,
		}),
	};

	render() {
		return (
			<div className={s.root}>
				<Navigation
					menu={this.props.context.siteMenu || []}
					vehicle={this.props.context.vehicle}
					params={this.props.context.params}
				/>
				<CategoryNav categories={this.props.context.categories} />
			</div>
		);
	}

}

export default Header;
