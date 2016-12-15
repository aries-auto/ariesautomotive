import React, { Component } from 'react';
import cx from 'classnames';
import s from './Catalogs.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

const catalogs = [
	{
		title: '2016 Exterior Catalog',
		image: 'https://storage.googleapis.com/aries-website/ARIES-Exterior-Cover.png',
		link: 'https://storage.googleapis.com/aries-website/2016-Exterior-Catalog.pdf',
	}
];

@withStyles(s)
class Catalogs extends Component {
	render() {
		const output = [];
		catalogs.map((cat, i) => {
			output.push(
				<Link key={i} title={ `Download ${cat.title}` } external target="_blank" to={cat.link}>
					<img src={ cat.image } alt={ cat.title } />
					<div>
						<h3>{ cat.title }</h3>
						<button type="button" className={`red-transparent-button`} >Download</button>
					</div>
				</Link>
			);
		});

		return (
			<div className={cx('container', s.root)}>{ output }</div>
		);
	}
}

export default Catalogs;
