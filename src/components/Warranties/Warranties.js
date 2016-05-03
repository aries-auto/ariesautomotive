import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Warranties.scss';
import withStyles from '../../decorators/withStyles';
import { fields } from './FormFields';
import WarrantiesStore from '../../stores/WarrantiesStore';
import WarrantiesActions from '../../actions/WarrantiesActions';
import Form from '../Form/Form';
import connectToStores from 'alt-utils/lib/connectToStores';

@withStyles(s)
@connectToStores
class Warranties extends Component {

	static propTypes = {
		className: PropTypes.string,
		enabled: PropTypes.bool,
		inputs: PropTypes.array,
	};

	constructor() {
		super();
		this.submit = this.submit.bind(this);
		this.enabled = false;
	}

	componentWillReceiveProps() {
		for (let i = 0; i < fields.length; i++) {
			if (!this.props.inputs[fields[i].name] || this.props.inputs[fields[i].name] === '') {
				return;
			}
		}
		this.enabled = true;
	}

	static getStores() {
		return [WarrantiesStore];
	}

	static getPropsFromStores() {
		return WarrantiesStore.getState();
	}

	getForm() {
		return (<Form fields={fields} />);
	}

	submit(event) {
		event.preventDefault();
		WarrantiesActions.postData(this.props.inputs);
	}

	render() {
		return (
			<div className={cx(s.root, this.props.className)}>
				<div className={cx('visible-sm visible-md visible-lg internal-hero', s.hero)}></div>
				<div className={cx(s.container, 'container')}>

					<div className="col-xs-12 col-md-6 col-lg-6">
						<div className={cx('head')}>
							<h1>ONLINE WARRANTIES</h1>
							<p>In order to accept a warranty all ARIES products must have a warranty card completed with proof of purchase.</p>
						</div>
						<form name="contactForm" role="form" noValidate>
							{this.getForm()}
							<div className="form-group col-xs-12">
								<button type="submit" className="btn btn-primary" disabled={!this.enabled} onClick={this.submit}>SUBMIT</button>
							</div>
						</form>
					</div>
				</div>
			</div>

		);
	}

}

export default Warranties;
