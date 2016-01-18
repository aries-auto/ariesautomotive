import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
// import Link from '../Link';

@withStyles(s)
class Navigation extends Component {

    static propTypes = {
        className: PropTypes.string,
        categories: PropTypes.array,
    };

    render() {
        return (
            <div className={cx(s.root, this.props.className)} role="navigation">
                <ul className="nav nav-pills">
                    {this.props.categories.map((cat, j) => {
                        return (
                            <li key={j} role="presentation" className="dropdown">
                                <a className={s.link + ' dropdown-toggle'} data-toggle="dropdown" href={'/category/' + cat.id + '/' + cat.title} role="button" aria-haspopup="true" aria-expanded="false">
                                    {cat.title} <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    {cat.children.map((sub, i) => {
                                        return (
                                            <li key={i}><a href={'/category/' + sub.id + '/' + cat.title + '/' + sub.title}>{sub.title}</a></li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}

                </ul>
            </div>
        );
    }

}

export default Navigation;
