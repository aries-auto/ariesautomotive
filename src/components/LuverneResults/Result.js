import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import LuverneStore from '../../stores/LuverneStore';
import s from './Result.scss';
import withStyles from '../../decorators/withStyles';
import PartResults from '../PartResults';

@withStyles(s)
class Result extends Component {

	static propTypes = {
		result: PropTypes.object.isRequired,
		activeIndex: PropTypes.number,
		className: PropTypes.string,
		fitments: PropTypes.array,
		iconParts: PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array,
		]),
	};

	constructor() {
		super();

		this.state = {
			products: [],
		};

		this.updateStyle = this.updateStyle.bind(this);
	}

	componentWillReceiveProps(props) {
		const products = [];
		if (props.fitments && props.fitments.length > 0) {
			props.fitments.map((ft) => {
				if (!ft.product || !ft.product.categories || ft.product.categories.length === 0) {
					return;
				}

				if (ft.product.categories[0].id === props.result.category.id) {
					ft.product.iconLayer = this.props.iconParts ? this.props.iconParts[ft.product.part_number] : '';
					products.push(ft.product);
				}
			});
		}

		if (products.length !== this.state.products.length) {
			this.setState({
				products,
			});
		}
	}

	updateStyle(e) {
		e.preventDefault();

		LuverneStore.fetchFitments(this.props.result, this.refs.style.value);
	}

	renderStyles() {
		if (
			!this.props.result.fitments ||
			this.props.result.fitments.length === 0
		) {
			return null;
		}

		const lst = [];
		this.props.result.fitments.map((fit) => {
			const opts = [];
			if (fit.options.length > 0) {
				fit.options.map((o, i) => {
					opts.push(
						<option key={i}>{o.toUpperCase()}</option>
					);
				});
			}

			lst.push(
				<div className={'form-group'}>
					<select ref="style" onChange={this.updateStyle} className="form-control">
						<option value="">- {fit.title.toUpperCase()} -</option>
							{ opts }
					</select>
				</div>
			);
		});

		console.log(lst);

		return lst;
	}

	render() {
		if (
			!this.props.activeIndex ||
			!this.props.result.category
		) {
			return <div></div>;
		}

		return (
			<div
				className={cx(
					s.root,
					this.props.className,
					(this.props.activeIndex === this.props.result.category.id) ? s.active : '',
				)}
			>
				<div className={s.header}>
					<span>{this.props.result.category.title}</span>
					{this.renderStyles()}
				</div>
				<PartResults className={`test`} parts={this.state.products} iconParts={this.props.iconParts} />
			</div>
		);
	}

}

export default Result;
