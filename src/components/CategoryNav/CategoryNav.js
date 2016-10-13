import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './CategoryNav.scss';
import withStyles from '../../decorators/withStyles';
import Menu from './Menu';
import Search from '../SearchForm';

@withStyles(s)
class CategoryNav extends Component {

	static propTypes = {
		className: PropTypes.string,
		categories: PropTypes.array,
		categoryItems: PropTypes.array,
		menu: PropTypes.array,
		vehicle: PropTypes.object,
		params: PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.clearOpen = this.clearOpen.bind(this);

		this.state = {
			menusOpen: false,
		};
	}

	clearOpen(title) {
		let update = title;
		if (title === this.state.openTitle) {
			update = '';
		}
		this.setState({
			openTitle: update,
		});
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<nav itemScope itemType="http://www.schema.org/SiteNavigationElement">
					<Menu
						openItem={this.clearOpen}
						open={this.state.menusOpen}
						openTitle={this.state.openTitle}
						isParent
						items={this.props.categoryItems}
						className={s.categories}
					/>
				</nav>
				<Search className={s.search} />
			</div>
		);
	}

}

export default CategoryNav;
