import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import s from './SearchForm.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class SearchForm extends Component {

	static propTypes = {
		className: PropTypes.string,
		term: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			term: '',
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		const term = this.refs.term.getValue();
		window.location = `/search/${term}`;
	}

	render() {
		return (
			<form action="/search" method="get" className={s.root} onSubmit={this.handleSubmit} role="search">
				<input type="search" name="search" ref="term" label="Enter search" placeholder="Search" />
				<button type="submit">
					<span className={s.nodisplay}>Search</span>
					<Glyphicon glyph="search" />
				</button>
			</form>
		);
	}

}

export default SearchForm;
