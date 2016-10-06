import React, { Component, PropTypes } from 'react';
import s from './PartList.scss';
import Part from './Part';
import withStyles from '../../../decorators/withStyles';

@withStyles(s)
class Envision extends Component {

	static propTypes = {
		products: PropTypes.array,
	};

	render() {
		if (!this.props.products || this.props.products.length === 0) {
			return <div></div>;
		}

		const parts = [];
		(this.props.products || []).map((part, i) => {
			parts.push(<Part part={part} key={i} />);
		});
		return (
			<div className={s.root}>
				<section>
					<p>Parts List</p>
					<article>
						These are the products that are currently visible on the vehicle.
						To remove a product, simply click the
						<span className={`glyphicon glyphicon-remove`}></span>
						in the top right corner.
					</article>
				</section>
				<div>{parts}</div>
			</div>
		);
	}

}

export default Envision;
