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
		sels: PropTypes.array,
	};

	constructor() {
		super();

		this.state = {
			products: [],
		};

		this.updateStyle = this.updateStyle.bind(this);
		this.setProducts = this.setProducts.bind(this);
		this.isComplete = this.isComplete.bind(this);
	}

	componentWillMount() {
		const reqFits = [];

		this.props.result.fitments.map((r) => {
			reqFits.push(r.title.toLowerCase());
		});
		this.setState({ reqFits });


		if (this.isComplete(this.props.sels, reqFits)) {
			this.setProducts();
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
		const sel = this.props.sels;

		this.props.result.products.map((p) => {
			let matched = true;
			p.fitment_attributes.map((fa) => {
				const k = fa.key.toLowerCase();
				const v = fa.value.toLowerCase();
				if (sel[k] !== v) {
					matched = false;
				}
			});

			if (matched) {
				prods.push(p.product_identifier);
			}
		});

		LuverneStore.fetchFitments(prods);
	}

	updateStyle(e) {
		e.preventDefault();

		const sels = this.props.sels;
		sels[e.target.id] = e.target.value;
		LuverneActions.setSel(sels);

		if (this.isComplete(sels, this.state.reqFits)) {
			this.setProducts();
		}
	}

	isComplete(sels, reqs) {
		let comp = true;
		reqs.map((r) => {
			if (sels[r] === undefined) {
				comp = false;
			}
		});

		return comp;
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

			fit.options.map((o, i) => {
				if (this.props.sels && this.props.sels[fit.title.toLowerCase()] === o.toLowerCase()) {
					sel = o.toLowerCase();
				}

				opts.push(
					<option key={i} value={o.toLowerCase()}>{o.toUpperCase()}</option>
				);
			});

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
				<LvPartResults className={`test`} parts={this.state.products} />
			</div>
		);
	}

}

export default Result;
