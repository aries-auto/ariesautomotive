import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Catalogs.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

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
			<div className={this.getContainerClasses()}>{ output }</div>
		);
	}
}

export default Catalogs;
