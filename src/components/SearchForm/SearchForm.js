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
        mobile: PropTypes.boolean,
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

    renderForm() {
        if (this.props.mobile) {
            return (
                <form action="/search" method="get" className={cx(s.navbarSearch, 'navbar-form', 'navbar-left', 'row', s.mobile)} onSubmit={this.handleSubmit} role="search">
                    <Input type="search" name="term" ref="term" groupClassName={cx(s.group, 'col-sm-10', 'col-xs-10')} label="Enter search" placeholder="Search" />
                    <Button type="submit" bsStyle="default" className="col-sm-2 col-xs-2">
                        <span className={s.nodisplay}>Search</span>
                        <Glyphicon glyph="search" />
                    </Button>
                </form>
            );
        }

        return (
            <form action="/search" method="get" className={cx(s.navbarSearch, 'navbar-form', 'navbar-left', 'row')} onSubmit={this.handleSubmit} role="search">
                <Input type="search" name="term" ref="term" groupClassName={s.group} label="Enter search" placeholder="Search" />
                <Button type="submit" bsStyle="default" className="">
                    <span className={s.nodisplay}>Search</span>
                    <Glyphicon glyph="search" />
                </Button>
            </form>
        );
    }

    render() {
        return (
            <div className={cx(s.root)} role="navigation">
                {this.renderForm()}
            </div>
        );
    }

}

export default SearchForm;
