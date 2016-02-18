import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import SearchInput from './Input';
import cx from 'classnames';
import s from './MobileSearchForm.scss';
import withStyles from '../../decorators/withStyles';


@withStyles(s)
class MobileSearchForm extends Component {

	static propTypes = {
		className: PropTypes.string,
		term: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.showInput = this.showInput.bind(this);
		this.closeOverlay = this.closeOverlay.bind(this);
		this.state = {
			term: '',
			open: false,
		};
	}

	showInput() {
		this.setState({
			term: this.state.term,
			open: true,
		});
	}

	closeOverlay() {
		this.setState({
			term: this.state.term,
			open: false,
		});
	}

	genForm() {
		if (!this.state.open) {
			return (<div></div>);
		}

		return (
			<SearchInput close={this.closeOverlay} />
		);
	}

	render() {
		return (
			<div className={cx(s.root)} role="navigation">
				<Button onClick={this.showInput} bsSize="small" bsStyle="link" type="submit" className="col-sm-2 col-xs-2">
					<span className={s.nodisplay}>Search</span>
					<Glyphicon bsClass={cx('glyphicon', s.searchIcon)} glyph="search" />
				</Button>
				{this.genForm()}
			</div>
		);
	}

}

export default MobileSearchForm;
