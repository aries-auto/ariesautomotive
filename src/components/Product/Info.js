import React, { Component, PropTypes } from 'react';
import s from './Info.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Info extends Component {

	static propTypes = {
		content: PropTypes.array,
		attributes: PropTypes.array,
		className: PropTypes.string,
	};

	render() {
		let catBrief = '';
		this.props.content.map((c) => {
			if (c.contentType.type === 'CategoryBrief') {
				catBrief = c.text;
				return;
			}
		});

		const details = [];
		this.props.attributes.map((attr, i) => {
			if (!attr.name || !attr.value) {
				return;
			}
			details.push(
				<div key={i}>
					<span>{ attr.name }</span>
					<span>{ attr.value }</span>
				</div>
			);
		});

		return (
			<div className={s.root}>
				<div className="container">
					<div className={s.more}>
						{catBrief ? <h3>More Details</h3> : null}
						<div dangerouslySetInnerHTML={{ __html: catBrief }}></div>
					</div>

					<div className={s.attributes}>
						{details.length ? <h3>Technical Details</h3> : null}
						{details}
					</div>
				</div>
			</div>
		);
	}
}

export default Info;
