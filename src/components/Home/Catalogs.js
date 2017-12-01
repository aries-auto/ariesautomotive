import React, { Component } from 'react';
import cx from 'classnames';
import s from './Catalogs.scss';
import withStyles from '../../decorators/withStyles';
import Catalog from './Catalog';

const catalogs = [
	{
		title: '2018 Catalog',
		image: 'https://storage.googleapis.com/aries_catalog/ARIES%20Cover%201-WEB%20RA.JPG',
		link: 'https://storage.googleapis.com/aries_catalog/ARIES%202018%20-%20Catalog.pdf',
	},
];

@withStyles(s)
class Catalogs extends Component {

	render() {
		const catalogList = catalogs.map((catalog, index) => {
			return <Catalog key={index} title={catalog.title} link={catalog.link} img={catalog.image} />;
		});

		return (
			<div className={cx(s.root)}>
				{ catalogList }
			</div>
		);
	}
}

export default Catalogs;
