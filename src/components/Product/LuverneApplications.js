import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
// import Link from '../Link';
import s from './Applications.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Applications extends Component {

	static propTypes = {
		applications: PropTypes.array,
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);

		(props.applications || []).sort(
			this.sortBy(
				{ name: 'year', primer: parseInt, reverse: true },
				'make',
				'model',
				'style',
			),
		);
	}

	getCmpFunc(primer, reverse) {
		const dfc = this.defaultCmp; // closer in scope
		let cmp = this.defaultCmp;
		if (primer) {
			cmp = (a, b) => {
				return dfc(primer(a), primer(b));
			};
		}
		if (reverse) {
			return (a, b) => {
				return -1 * cmp(a, b);
			};
		}
		return cmp;
	}

	defaultCmp(a, b) {
		if (a === b) {
			return 0;
		}
		return a < b ? -1 : 1;
	}

	sortBy() {
		const fields = [];
		const nFields = arguments.length;
		let field;
		let name;
		let cmp;

		// preprocess sorting options
		for (let i = 0; i < nFields; i++) {
			field = arguments[i];
			if (typeof field === 'string') {
				name = field;
				cmp = this.defaultCmp;
			} else {
				name = field.name;
				cmp = this.getCmpFunc(field.primer, field.reverse);
			}
			fields.push({
				name,
				cmp,
			});
		}

		// final comparison function
		return (A, B) => {
			let n;
			let result;
			for (let i = 0; i < nFields; i++) {
				result = 0;
				field = fields[i];
				n = field.name;

				result = field.cmp(A[n], B[n]);
				if (result !== 0) break;
			}
			return result;
		};
	}

	render() {
		if (!this.props.applications || this.props.applications.length === 0) {
			return <div></div>;
		}

		const apps = [];
		this.props.applications.map((v, i) => {
			apps.push(
				<tr key={i}>
					<td className="year">{ v.year }</td>
					<td className="make">{ v.make }</td>
					<td className="model">{ v.model }</td>
					<td className="style">{ v.body }</td>
					<td className="style">{ v.boxLength }</td>
					<td className="style">{ v.cabLength }</td>
					<td className="style">{ v.fuelType }</td>
				</tr>
			);
		});

		return (
			<div className={cx(s.root, 'container')}>
				<h3>Application</h3>
				<p>Check out our Application Guides to see what fits your vehicle.</p>
				<div className={s.vehicle}>
					<table className={cx(s.responsiveTable, s.applicationsTbl)}>
						<thead>
							<tr>
								<th>Year</th>
								<th>Make</th>
								<th>Model</th>
								<th>Body</th>
								<th>Box Length</th>
								<th>Cab Length</th>
								<th>Fuel Type</th>
							</tr>
						</thead>
						<tbody>
							{ apps }
						</tbody>
					</table>
				</div>
			</div>
		);
	}}

export default Applications;
