import React, { Component, PropTypes } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Navigation from '../Navigation';
// import CategoryNav from '../CategoryNav';
import CategoryStore from '../../stores/CategoryStore';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Header extends Component {

	static propTypes = {
		categories: PropTypes.array,
		categoryItems: PropTypes.array,
		context: PropTypes.shape({
			insertCss: PropTypes.func,
			onSetTitle: PropTypes.func,
			onSetMeta: PropTypes.func,
			onPageNotFound: PropTypes.func,
			vehicle: PropTypes.array,
			params: PropTypes.object,
			siteContents: PropTypes.array,
			siteMenu: PropTypes.array,
		}),
	};

	static getStores() {
		return [CategoryStore];
	}

	static getPropsFromStores() {
		return CategoryStore.getState();
	}

	render() {
		return (
			<div className={s.root}>
				<Navigation
					menu={this.props.context.siteMenu || []}
					vehicle={this.props.context.vehicle}
					params={this.props.context.params}
				/>
				{/* <CategoryNav categoryItems={this.props.categoryItems} categories={this.props.categories} /> */}
			</div>
		);
	}

}

export default Header;
