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
	}, {
		title: '2016 Interior Catalog',
		image: 'https://storage.googleapis.com/aries-website/ARIES-Interior-Cover.png',
		link: 'https://storage.googleapis.com/aries-website/2016-Interior-Catalog.pdf',
	}, {
		title: '2016 Jeep Catalog',
		image: 'https://storage.googleapis.com/aries-website/ARIES-Jeep-Cover.png',
		link: 'https://storage.googleapis.com/aries-website/_2016%20ARIES%20Jeep%20Catalog-SFS.pdf',
	},
];

@withStyles(s)
class Catalogs extends Component {
	render() {
		const output = [];
		catalogs.map((cat, i) => {
			output.push(
				<div key={i} className={cx('col-xs-12', 'col-sm-4', 'col-md-4', 'col-lg-4')}>
					<img src={ cat.image } alt={ cat.title } />
					<div>
						<h3>{ cat.title }</h3>
						<Link className={`red-transparent-button`} title={ `Download ${cat.title}` } external target="_blank" to={cat.link}>
							Download
						</Link>
					</div>
				</div>
			);
		});

		return (
			<div className={cx('container', s.root)}>{ output }</div>
		);
	}
}

export default Catalogs;
