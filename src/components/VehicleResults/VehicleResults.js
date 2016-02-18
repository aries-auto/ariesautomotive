import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './VehicleResults.scss';
import Location from '../../core/Location';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class VehicleResults extends Component {

    static propTypes = {
        className: PropTypes.string,
        context: PropTypes.shape({
            params: PropTypes.shape({
                year: PropTypes.string,
                make: PropTypes.string,
                model: PropTypes.string,
            }),
        }),
    };

    constructor() {
        super();
        this.parseVehicle = this.parseVehicle.bind(this);
        this.state = {
            context: {},
        };
    }

    componentWillMount() {
        console.log(this.state.vehicle);
        if (!this.state.vehicle) {
            this.parseVehicle();
            return;
        }

        console.log(this.state.vehicle);
    }

    parseVehicle() {
        if (!this.props.context.params || !this.props.context.params.year || !this.props.context.params.make ||
            !this.props.context.params.model || this.props.context.params.year === '') {
            Location.push({
                pathname: '/vehicle',
                state: this.state || null,
            });
            return;
        }
        if (this.props.context.params.make === '') {
            Location.push({
                pathname: `/vehicle/${this.props.context.params.year}`,
                state: this.state || null,
            });
            return;
        }
        if (this.props.context.params.model === '') {
            Location.push({
                pathname: `/vehicle/${this.props.context.params.year}/${this.props.context.params.make}`,
                state: this.state || null,
            });
            return;
        }

        this.setState({
            vehicle: {
                year: this.props.context.params.year,
                make: this.props.context.params.make,
                model: this.props.context.params.model,
            },
        });
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className, 'container')} role="navigation">
            </div>
        );
    }

}

export default VehicleResults;
