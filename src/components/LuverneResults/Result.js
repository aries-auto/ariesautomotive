import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import LuverneActions from '../../actions/LuverneActions';
import connectToStores from 'alt-utils/lib/connectToStores';
import LuverneStore from '../../stores/LuverneStore';
import s from './Result.scss';
import withStyles from '../../decorators/withStyles';
import LvPartResults from '../LvPartResults';

@withStyles(s)
@connectToStores
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
		configs: PropTypes.array,
		products: PropTypes.array,
	};

	constructor() {
		super();

		this.state = {
			products: [],
			reqFits: [],
		};

		this.updateStyle = this.updateStyle.bind(this);
		this.setProducts = this.setProducts.bind(this);
	}

	componentWillMount() {
		const reqFits = [];

		this.props.result.fitments.map((fit) => {
			reqFits[fit.title.toLowerCase()] = '';
		});

		this.setState({
			reqFits,
		});
	}

	componentWillReceiveProps(props) {
		const products = [];
		console.log('testing');
		if (this.props.result.fitments && this.props.result.fitments.length > 0) {
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

	static getStores() {
		return [LuverneStore];
	}

	static getPropsFromStores() {
		return LuverneStore.getState();
	}

	setProducts() {
		const prods = [];
		const rq = this.state.reqFits;
		// console.log(this.props.configs);

		this.props.result.products.map((p) => {
			let matched = true;
			p.fitment_attributes.map((fa) => {
				const k = fa.key.toLowerCase();
				if (fa.value.toLowerCase() !== rq[k]) {
					matched = false;
				}
			});

			if (matched) {
				prods.push(p.product_identifier);
			}
		});

		if (prods.length > 0) {
			const temp = this.props.configs;
			const conf = {
				id: this.props.result.category.title,
				selection: temp,
			};
			temp.push(conf);

			// LuverneActions.setConfigs(temp);
			LuverneActions.setProducts(prods, temp);
			console.log();
			// console.log(this.props.products);
		}
	}

	updateStyle(e) {
		e.preventDefault();
		let comp = true;

		const sel = this.state.reqFits;
		sel[e.target.id] = e.target.value;

		this.setState({
			reqFits: sel,
		});

		this.props.result.fitments.map((r) => {
			if (sel[r.title.toLowerCase()] === '') {
				comp = false;
			}
		});

		if (comp) {
			this.setProducts();
		}
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
						<option key={i} value={o.toLowerCase()}>{o.toUpperCase()}</option>
					);
				});
			}

			lst.push(
				<div className={'form-group'}>
					<select ref="style" id={fit.title.toLowerCase()} onChange={this.updateStyle} className="form-control">
						<option value="">- {fit.title.toUpperCase()} -</option>
							{ opts }
					</select>
				</div>
			);
		});

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
				<LvPartResults className={`test`} parts={this.state.products} iconParts={this.props.iconParts} />
			</div>
		);
	}

}

export default Result;
