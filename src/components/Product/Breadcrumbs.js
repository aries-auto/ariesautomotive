import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Link from '../Link';
import s from './Breadcrumbs.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Product extends Component {

	static propTypes = {
		partNumber: PropTypes.string,
		categories: PropTypes.array,
		className: PropTypes.string,
	};

	render() {
		console.log(this.props.categories);
		if (!this.props.categories || this.props.categories.length === 0) {
			return <div></div>;
		}

		const links = [];
		this.props.categories.slice().reverse().map((cat, i) => {
			links.push(
				<li key={i}>
					<Link to={`/category/${cat.id}`} title={cat.title}>{ cat.title }</Link>
				</li>
			);
		});

		return (
			<ol className={cx(s.root, this.props.className)}>
				{links}
				<li className={s.active}>Part #{ this.props.partNumber }</li>
			</ol>
		);
	}

}

export default Product;
