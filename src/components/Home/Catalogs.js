import React, { Component } from 'react';
import cx from 'classnames';
import s from './Catalogs.scss';
import withStyles from '../../decorators/withStyles';
import Catalog from './Catalog';

const catalogs = [
	{
		title: '2017 Catalog',
		image: 'https://storage.googleapis.com/aries_catalog/ARIES_2017_Cover.jpg',
		link: 'https://storage.googleapis.com/aries_catalog/ARIES%202017%20Catalog.pdf',
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
