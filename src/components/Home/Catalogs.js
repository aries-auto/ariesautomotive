import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Catalogs.scss';
import withStyles from '../../decorators/withStyles';
import Catalog from './Catalog';

const catalogs = [
	{
		title: '2017 Exterior Catalog',
		image: 'https://storage.googleapis.com/aries_catalog/ARIES_2017_Cover.jpg',
		link: 'https://storage.googleapis.com/aries_catalog/ARIES%202017%20Catalog.pdf',
	},
];

@withStyles(s)
class Catalogs extends Component {

	static propTypes = {
		fullWidth: PropTypes.bool,
	};

	getContainerClasses() {
		let containerClasses;
		containerClasses = [s.root];
		if (this.props.fullWidth === 'true') {
			containerClasses.push('container');
		}
		return cx.apply(null, containerClasses);
	}

	render() {
		const catalogList = catalogs.map((catalog, index) => {
			return <Catalog key={index} title={catalog.title} link={catalog.link} img={catalog.image} />;
		});

		return (
			<div className={this.getContainerClasses()}>
				{ catalogList }
			</div>
		);
	}
}

export default Catalogs;
