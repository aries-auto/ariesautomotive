import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import LuverneActions from '../../actions/LuverneActions';
import LuverneStore from '../../stores/LuverneStore';
import s from './Result.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt-utils/lib/connectToStores';
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
		reqFits: PropTypes.array,
		allProducts: PropTypes.array,
	};

	constructor() {
		super();

		this.state = {
			products: [],
		};

		this.updateStyle = this.updateStyle.bind(this);
		this.setProducts = this.setProducts.bind(this);
	}

	componentWillMount() {
		const reqFits = [];
		this.props.result.fitments.map((fit) => {
			reqFits[fit.title.toLowerCase()] = '';
		});
		LuverneActions.setFits(reqFits);

		if (this.props.configs && this.props.configs.length > 0) {
			this.props.configs.map((c) => {
				if (c.id === this.props.result.category.id) {
					console.log('match');
					LuverneStore.fetchFitments(c.products);
				}
			});
		}
	}

	componentWillReceiveProps(props) {
		const products = [];
		if (this.props.result.fitments && this.props.result.fitments.length > 0) {
			props.fitments.map((ft) => {
				products.push(ft);
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
		const rq = this.props.reqFits;

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
			const figs = this.props.configs;
			const sel = this.props.reqFits;
			const x = [];
			x.push(sel);
			const conf = {
				id: this.props.result.category.id,
				selection: x,
				products: prods,
			};

			figs.push(conf);
			LuverneActions.setConfigs(figs);
			LuverneStore.fetchFitments(prods);
		}
	}

	updateStyle(e) {
		e.preventDefault();
		let comp = true;

		const sel = this.props.reqFits;
		sel[e.target.id] = e.target.value;

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
			let sel = '';
			const opts = [];
			if (fit.options.length > 0) {
				fit.options.map((o, i) => {
					const conf = this.props.configs.filter((c) => c.id === this.props.result.category.id);
					if (conf.length > 0) {
						conf.map((c) => {
							if (c.selection[o.toLowerCase()] !== '') {
								sel = o.toLowerCase();
							}
						});
					}

					opts.push(
						<option key={i} value={o.toLowerCase()}>{o.toUpperCase()}</option>
					);
				});
			}

			lst.push(
				<div className={'form-group'}>
					<select defaultValue={sel} ref="style" id={fit.title.toLowerCase()} onChange={this.updateStyle} className="form-control">
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
