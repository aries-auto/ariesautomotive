import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import cx from 'classnames';
import s from './SearchForm.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class SearchForm extends Component {

    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        return (
            <div className={cx(s.root, this.props.className)} role="navigation">
                <form className={s.navbarSearch + ' navbar-form navbar-left row'} role="search">
                    <Input type="search" label="Enter search" placeholder="Search" />
                    <Button type="submit" bsStyle="default">
                        <span className={s.nodisplay}>Search</span>
                        <Glyphicon glyph="search" />
                    </Button>
                </form>
            </div>
        );
    }

}

export default SearchForm;
