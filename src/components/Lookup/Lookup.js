import React, { Component, PropTypes } from 'react';
import fetch from '../../core/fetch';
import cx from 'classnames';
import s from './Lookup.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Lookup extends Component {

    static propTypes = {
        className: PropTypes.string,
        years: PropTypes.array,
        makes: PropTypes.array,
        models: PropTypes.array,
        vehicle: PropTypes.object,
    };

    constructor() {
        super();

        this.changeVehicle = this.changeVehicle.bind(this);
        this.state = {
            vehicle: {},
            makes: [],
            models: [],
        };
    }

    changeVehicle(event) {
        if (event.target === undefined || event.target.name === undefined) {
            return;
        }

        switch (event.target.name.toLowerCase()) {
        case 'year':
            this.state.vehicle = {
                year: event.target.value,
                make: '',
                model: '',
            };
            break;
        case 'make':
            this.state.vehicle = {
                year: this.state.vehicle.year,
                make: event.target.value,
                model: '',
            };
            break;
        case 'model':
            this.state.vehicle = {
                year: this.state.vehicle.year,
                make: this.state.vehicle.make,
                model: event.target.value,
            };
            break;
        default:
            break;
        }

        fetch('https://goapi.curtmfg.com/vehicle/mongo/allCollections?key=883d4046-8b96-11e4-9475-42010af00d4e', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: `year=${this.state.vehicle.year || 0}&make=${this.state.vehicle.make || ''}&model=${this.state.vehicle.model || ''}&style=${this.state.vehicle.style || ''}&collection=${this.state.vehicle.collection || ''}`,
        }).then((resp) => {
            return resp.json();
        }).then((data) => {
            if (data.available_years !== undefined) {
                this.setState({
                    vehicle: this.state.vehicle,
                    years: data.available_years,
                    makes: [],
                    models: [],
                });
            } else if (data.available_makes !== undefined) {
                this.setState({
                    vehicle: this.state.vehicle,
                    years: this.state.years,
                    makes: data.available_makes,
                    models: [],
                });
            } else if (data.available_models !== undefined) {
                this.setState({
                    vehicle: this.state.vehicle,
                    years: this.state.years,
                    makes: this.state.makes,
                    models: data.available_models,
                });
            }
        });
    }

    render() {
        const yearSelect = (
            <div className="form-group">
                <select className="form-control" name="year" onChange={this.changeVehicle} aria-labelledby="year_lookup_label">
                    <option value="">- Select Year -</option>
                    {this.props.years.map((year, i) => {
                        return <option key={i} value={year}>{ year }</option>;
                    })}
                </select>
            </div>
        );
        let makeSelect = (
            <div className="form-group">
                <select className="form-control" name="make" disabled="disabled" aria-labelledby="make_lookup_label">
                    <option value="">- Select Make -</option>
                </select>
            </div>
        );
        let modelSelect = (
            <div className="form-group">
                <select className="form-control" name="model" disabled="disabled" aria-labelledby="model_lookup_label">
                    <option value="">- Select Model -</option>
                </select>
            </div>
        );

        if (this.state.makes && this.state.makes.length > 0) {
            makeSelect = (
                <div className="form-group">
                    <select className="form-control" name="make" onChange={this.changeVehicle} aria-labelledby="make_lookup_label">
                        <option value="">- Select Make -</option>
                        {this.state.makes.map((make, i) => {
                            return <option key={i} value={make}>{ make }</option>;
                        })}
                    </select>
                </div>
            );
        }
        if (this.state.models && this.state.models.length > 0) {
            modelSelect = (
                <div className="form-group">
                    <select className="form-control" name="model" onChange={this.changeVehicle} aria-labelledby="model_lookup_label">
                        <option value="">- Select Model -</option>
                        {this.state.models.map((model, i) => {
                            return <option key={i} value={model}>{ model }</option>;
                        })}
                    </select>
                </div>
            );
        }
        return (
            <div className={cx(s.root, this.props.className, 'container-fluid')} role="navigation">
                <form className={cx('form-inline')}>
                    <label>Vehicle Lookup</label>
                    {yearSelect}
                    {makeSelect}
                    {modelSelect}
                </form>
            </div>
        );
    }

}

export default Lookup;
