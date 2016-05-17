import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import cx from 'classnames';
import s from './App.scss';
import Header from '../Header';
import Lookup from '../Lookup';
import Footer from '../Footer';

class App extends Component {

	static propTypes = {
		context: PropTypes.shape({
			insertCss: PropTypes.func,
			onSetTitle: PropTypes.func,
			onSetMeta: PropTypes.func,
			onPageNotFound: PropTypes.func,
			years: PropTypes.array,
			categories: PropTypes.array,
			params: PropTypes.object,
		}),
		children: PropTypes.element.isRequired,
		error: PropTypes.object,
	};

	static childContextTypes = {
		insertCss: PropTypes.func.isRequired,
		onSetTitle: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		seo: PropTypes.func.isRequired,
	};

	getChildContext() {
		const context = this.props.context;
		return {
			insertCss: context.insertCss || emptyFunction,
			onSetTitle: context.onSetTitle || emptyFunction,
			onSetMeta: context.onSetMeta || emptyFunction,
			onPageNotFound: context.onPageNotFound || emptyFunction,
			seo: context.seo || emptyFunction,
		};
	}

	componentWillMount() {
		this.removeCss = this.props.context.insertCss(s);
	}

	componentWillUnmount() {
		this.removeCss();
	}

	render() {
		const styles = {
			background: "url('/img/bgtexture.png')",
		};
		return !this.props.error ? (
			<div className={cx(s.root)} style={styles}>
				<Header categories={this.props.context.categories} />
				<Lookup years={this.props.context.years} params={this.props.context.params} />
				<div className="children">
					{this.props.children}
				</div>
				<Footer />
			</div>
		) : this.props.children;
	}

}

export default App;
