import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Lookup.scss';
import withStyles from '../../decorators/withStyles';
// import Link from '../Link';


@withStyles(s)
class Lookup extends Component {

    static propTypes = {
        className: PropTypes.string,
        years: PropTypes.array,
    };

    render() {
        const years = [];
        for (const y in this.props.years) {
            if (this.props.years.hasOwnProperty(y)) {
                years.push(<option value="{ this.props.years[y] }">{ this.props.years[y] }</option>);
            }
        }

        return (
            <div className={cx(s.root, this.props.className)} role="navigation">
                <form className="form-inline">
                    <div className="form-group">
                        <div id="year_lookup_label" className="nodisplay">Vehicle Year Lookup</div>
                        <select className="form-control" aria-labelledby="year_lookup_label">
                            <option value="">- Select Year -</option>
                            { years }
                        </select>
                    </div>
                </form>
            </div>
        );
    }

}

export default Lookup;
