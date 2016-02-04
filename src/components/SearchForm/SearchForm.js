import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import cx from 'classnames';
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
            <div className={cx(s.root)} role="navigation">
                <form action="/search" method="get" className={cx(s.navbarSearch, 'navbar-form', 'navbar-left', 'row')} onSubmit={this.handleSubmit} role="search">
                    <Input type="search" name="term" ref="term" groupClassName={s.group} label="Enter search" placeholder="Search" />
                    <Button type="submit" bsStyle="default" className="">
                        <span className={s.nodisplay}>Search</span>
                        <Glyphicon glyph="search" />
                    </Button>
                </form>
            </div>
        );
    }

}

export default SearchForm;
