import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './VehicleResults.scss';

class Subcategory extends Component {

	static propTypes = {
		cat: PropTypes.object,
		keyStr: PropTypes.string,
		toggleKey: PropTypes.func.isRequired,
		btnActive: PropTypes.bool,
	};

	constructor() {
		super();
		this.toggleKey = this.toggleKey.bind(this);
	}

	componentWillMount() {
	}

	toggleKey(e) {
		e.preventDefault();
		this.props.toggleKey(this.props.keyStr, this.props.cat);
	}

	render() {
		const cat = this.props.cat;
		const image = cat.category.image.Path ? `${cat.category.image.Scheme}://${cat.category.image.Host}${cat.category.image.Path}` : '';
		const activeClass = this.props.btnActive ? s.btnActive : '';
		return (
			<div className={cx(s.category, 'col-lg-6', 'col-md-6', 'col-sm-6', 'col-xs-12')} onClick={this.toggleKey}>
				<div className={cx(s.categoryBox, activeClass)}>
					<img className={cx(s.categoryImage)} src={image} />
					<span className={cx(s.catTitle)}>{cat.category.title}</span>
				</div>
			</div>
		);
	}

}

export default Subcategory;
