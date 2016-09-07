import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './FeaturedProducts.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class FeaturedProducts extends Component {

	static propTypes = {
		className: PropTypes.string,
		title: PropTypes.string,
		products: PropTypes.array,
		featured: PropTypes.array,
	};

	getFeaturedImage(prod) {
		if (!prod.images) {
			return '';
		}
		let url;
		prod.images.map((img) => {
			if (img.sort === 'a' && img.size === 'Grande') {
				url = `${img.path.Scheme}://${img.path.Host}${img.path.Path}`;
			}
		});
		return url;
	}

	render() {
		if (!this.props.products || !this.props.products.length) {
			return <div></div>;
		}

		const output = [];
		(this.props.products || []).map((prod, i) => {
			const path = this.getFeaturedImage(prod);
			if (path === '') {
				return;
			}
			output.push(
				<div key={i}>
					<h4>
						<Link title={prod.short_description} to={`/part/${prod.part_number}`}>
							{prod.short_description}
						</Link>
					</h4>
					<Link title={prod.short_description} to={`/part/${prod.part_number}`}>
						<img
							src={path}
							className="img-responsive"
							alt={'Image for ' + prod.short_description}
						/>
					</Link>
					<hr className="visible-xs-block" />
				</div>
			);
		});

		return (
			<div className={cx(s.root, 'container', this.props.className)}>
				<h3>{this.props.title || `FEATURED PRODUCTS`}</h3>
				{output}
			</div>
		);
	}
}

export default FeaturedProducts;
