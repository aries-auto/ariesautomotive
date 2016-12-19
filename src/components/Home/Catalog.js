import React, { Component, PropTypes } from 'react';
import Link from '../Link';

class Catalog extends Component {
	static propTypes = {
		title: PropTypes.string,
		img: PropTypes.string,
		link: PropTypes.string,
		key: PropTypes.number,
	};

	render() {
		return (
			<Link key={this.props.key} title={ `Download ${this.props.title}` } external target="_blank" to={this.props.link}>
				<img src={ this.props.img } alt={ this.props.title } />
				<div>
					<h3>{ this.props.title }</h3>
					<button type="button" className={`red-transparent-button`} >Download</button>
				</div>
			</Link>
		);
	}
}

export default Catalog;
