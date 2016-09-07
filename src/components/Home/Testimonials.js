import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Testimonials.scss';
import withStyles from '../../decorators/withStyles';


@withStyles(s)
class Testimonials extends Component {

	static propTypes = {
		className: PropTypes.string,
		testimonials: PropTypes.array,
	};

	render() {
		if (!this.props.testimonials || !this.props.testimonials.length) {
			return <div></div>;
		}

		const output = [];
		(this.props.testimonials || []).map((t, i) => {
			output.push(
				<div key={i} className={cx(s.testimonial, 'col-md-6')}>
					<h4>"{t.title}"</h4>
					<p>{t.content}</p>
					<span className={cx(s.name)}>- {t.firstName} {t.lastName}, {t.location}</span>
				</div>
			);
		});

		return (
			<div className={cx(this.props.className, s.root, 'container')}>
				<h3>FROM OUR CUSTOMERS</h3>
				{output}
			</div>
		);
	}
}

export default Testimonials;
