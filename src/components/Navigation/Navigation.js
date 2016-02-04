import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import SearchForm from '../SearchForm';

@withStyles(s)
class Navigation extends Component {

    static propTypes = {
        className: PropTypes.string,
        categories: PropTypes.array,
    };

    getCategories() {
        const cats = [];
        this.props.categories.map((cat) => {
            if (cat.children && cat.children.length > 0) {
                cats.push(
                    <li key={cat.id} role="presentation" className="dropdown">
                        <a className={cx(s.link, 'dropdown-toggle')} data-toggle="dropdown" href={'/category/' + cat.id + '/' + cat.title} role="button" aria-haspopup="true" aria-expanded="false">
                            {cat.title} <span className="caret"></span>
                        </a>
                        <ul className={cx(s.subMenu, 'dropdown-menu')} role="menu">
                            {cat.children.map((sub) => {
                                return (
                                    <li key={sub.id}><a href={'/category/' + sub.id + '/' + cat.title + '/' + sub.title}>{sub.title}</a></li>
                                );
                            })}
                        </ul>
                    </li>
                );
            } else {
                cats.push(
                    <li key={cat.id} role="presentation">
                        <a className={s.link} href={'/category/' + cat.id + '/' + cat.title} aria-haspopup="true">
                            {cat.title}
                        </a>
                    </li>
                );
            }
        });

        return cats;
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className, 'navbar-collapse', 'collapse')} id="categoryMenu" role="navigation">
                <div className="visible-xs visible-sm">
                    <SearchForm mobile="true" />
                </div>
                <ul className={cx(s.nav, 'nav', 'navbar-nav')}>
                    {this.getCategories()}
                    <li role="presentation">
                        <a className={s.link} href="/appguides">
                            Application Guides
                        </a>
                    </li>
                </ul>
            </div>
        );
    }

}

export default Navigation;
