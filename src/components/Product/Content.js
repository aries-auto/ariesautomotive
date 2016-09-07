import React, { Component, PropTypes } from 'react';
import s from './Content.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Product extends Component {

	static propTypes = {
		content: PropTypes.array,
		className: PropTypes.string,
	};

	render() {
		if (!this.props.content || this.props.content.length === 0) {
			return (<div></div>);
		}

		let htmlDesc;
		const bulls = [];
		const existing = [];

		this.props.content.map((c, i) => {
			if (c.contentType.type.toLowerCase() === 'htmldescription') {
				htmlDesc = c.text;
				return;
			}

			if (
				c.contentType.type.toLowerCase() === 'bullet' &&
				existing.indexOf(c.text) === -1
			) {
				bulls.push(<li key={i}>{c.text}</li>);
				existing.push(c.text);
			}
		});

		return (
			<div className={s.root}>
				<div dangerouslySetInnerHTML={{ __html: htmlDesc }}></div>
				<ul>{bulls}</ul>
			</div>
		);
	}

}

export default Product;
