import React, { Component, PropTypes } from 'react';
import s from './Swatch.scss';
import withStyles from '../../../../decorators/withStyles';

@withStyles(s)
class Configurator extends Component {

	static propTypes = {
		className: PropTypes.string,
		color: PropTypes.object,
		click: PropTypes.func,
	};

	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}

		this.props.click(this.props.color.id);
	}

	render() {
		return (
			<li className={s.root}>
				<a href={`#${this.props.color.id}`} onClick={this.handleClick} title={this.props.color.name}>
					<img src={`//${this.props.color.swatch.Host}${this.props.color.swatch.Path}`} />
				</a>
			</li>
		);
	}

}

export default Configurator;
