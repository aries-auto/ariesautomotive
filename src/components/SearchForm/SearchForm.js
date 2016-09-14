import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import ga from 'react-ga';
import Location from '../../core/Location';
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
		const term = this.refs.term.value;
		ga.event({ category: 'Search', action: 'Form Submission', label: term });
		Location.push(`/search/${term}`);
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
