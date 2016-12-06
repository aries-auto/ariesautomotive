import React, { Component, PropTypes } from 'react';
import s from './AppGuide.scss';
import AppGuideActions from '../../../actions/AppGuideActions';
import AppGuideStore from '../../../stores/AppGuideStore';
import withStyles from '../../../decorators/withStyles';
import cx from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';
import { Glyphicon } from 'react-bootstrap';
import { brand } from '../../../config';
// import { appguides } from './data';

const cache = '06072016';

@withStyles(s)
@connectToStores
class AppGuide extends Component {

	static propTypes = {
		title: PropTypes.string,
		guide: PropTypes.object,
		page: PropTypes.number,
	};

	static contextTypes = {
		onSetTitle: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
	};

	static defaultProps = {
		guides: [],
		guide: null,
	};

	constructor() {
		super();
		this.getAttr = this.getAttr.bind(this);
		this.renderBreadCrumbs = this.renderBreadCrumbs.bind(this);
	}

	componentWillMount() {
		const title = this.props.guide && this.props.guide.name ? this.props.guide.name : 'Application Guide';
		this.context.onSetTitle(title);
		this.context.onSetMeta('description', `${title} Application Guides`);
	}

	static getStores() {
		return [AppGuideStore];
	}

	static getPropsFromStores() {
		return AppGuideStore.getState();
	}

	getAttrs() {
		const output = [];
		if (!this.props.guide.name) {
			return null;
		}
		if (this.props.guide.name.toLowerCase().indexOf('floor liners') !== -1) {
			this.props.guide.colors.map((color, i) => {
				output.push(<th key={i}>{color}</th>);
			});
		} else {
			this.props.guide.finishes.map((finish, i) => {
				output.push(<th key={i}>{finish}</th>);
			});
		}
		return output;
	}

	getAttr(application) {
		const appguideSlice = [];
		const attrToAppguide = {};
		let attrToSearch = [];
		let isFloorLiner = false;
		if (this.props.guide.name.toLowerCase().indexOf('floor liners') !== -1) {
			isFloorLiner = true;
			attrToSearch = this.props.guide.colors;
		} else {
			attrToSearch = this.props.guide.finishes;
		}

		attrToSearch.map((attr) => {
			attrToAppguide[attr] = [];
			application.parts.map((part, j) => {
				if ((part.color === attr && isFloorLiner) || (part.finish === attr && !isFloorLiner)) {
					const appguideCell = (
						<div key={j}>
							<a href={`/part/${part.oldPartNumber}`}>{part.oldPartNumber} - {part.short_description}</a>
							{ part.install_sheet && part.install_sheet.length > 0 ?
								<a href={part.install_sheet} target="_blank">
									<Glyphicon glyph="wrench" className={s.wrench} />
								</a>
								: null
							}
						</div>
					);
					attrToAppguide[attr].push(appguideCell);
				}
			});
		});
		attrToSearch.map((attr) => {
			for (const i in attrToAppguide) {
				if (i === attr) {
					appguideSlice.push(<td key={i}>{attrToAppguide[i]}</td>);
				}
			}
		});
		return appguideSlice;
	}

	handlePagination(inc) {
		if (this.props.page && this.props.page === 0 && inc === -1) {
			return;
		}
		let currentPage = 0;
		if (this.props.page) {
			currentPage = this.props.page;
		}
		const page = currentPage + inc;
		AppGuideActions.set(this.props.guide.name, page);
	}

	renderBreadCrumbs() {
		if (this.props.guide) {
			return (
				[
					<li key="app"><a href={`/appguides`}>Application Guides</a></li>,
					<li key="apps" className="active">{this.props.guide ? this.props.guide.name : null}</li>,
				]
			);
		}
		return <li key="apps" className="active">Application Guides</li>;
	}

	renderApplications() {
		return (
			<table className={cx('table table-hover table-bordered')}>
				<thead>
					<tr>
						<th>Make</th>
						<th>Model</th>
						<th>Style</th>
						<th>Start Year</th>
						<th>End Year</th>
						{this.getAttrs()}
					</tr>
				</thead>
				<tbody>{this.renderApplicationRows()}</tbody>
			</table>
		);
	}

	renderApplicationRows() {
		const output = [];
		if (!this.props.guide.applications) {
			return null;
		}
		this.props.guide.applications.map((app, i) => {
			let attr = {};
			attr = this.getAttr(app);
			output.push(
				<tr key={i}>
					<td>{app.make}</td>
					<td>{app.model}</td>
					<td>{app.style}</td>
					<td>{app.min_year}</td>
					<td>{app.max_year}</td>
					{attr}
				</tr>
			);
		});
		return output;
	}

	renderPagination() {
		return (
			<div className={s.pagination}>
				{this.props.page > 0 ? <div className={s.left} onClick={this.handlePagination.bind(this, -1)}></div> : null}
				<div className={s.right} onClick={this.handlePagination.bind(this, 1)}></div>
			</div>
		);
	}

	renderDownloadLinks() {
		const guide = this.props.guide;
		if (guide === undefined || guide === null) {
			return <span></span>;
		}
		let page = this.props.guide.name;
		let render = false;
		page = (page) ? page.toLowerCase() : '';
		const links = [];
		if (guide.appGuide === undefined || guide.appGuide === null) {
			return <span></span>;
		}
		if (guide.appGuide.pdfPath) {
			const pdfLink = `${guide.appGuide.pdfPath}?cache=${cache}`;
			links.push(
				<a key={1} href={pdfLink} target="_blank" analytics-on="click" analytics-event={`${page}:pdf`}>
					<img src={'https://storage.googleapis.com/curt-icons/PDF-Icon-Aries.png'} alt="App Guide" className={cx('icon', s.appguideIcon)} />
				</a>
			);
			render = true;
		}
		if (guide.appGuide.xlsPath) {
			const xlsLink = `${guide.appGuide.xlsPath}?cache=${cache}`;
			links.push(
				<a key={2} href={xlsLink} target="_blank" analytics-on="click" analytics-event={`${page}:pdf`}>
					<img src={'https://storage.googleapis.com/curt-icons/Excel-Icon.png'} alt="App Guide" className={cx('icon', s.appguideIcon)} />
				</a>
			);
			render = true;
		}

		if (!render) {
			return null;
		}
		return (
			<div className={s.downloads}>
				<span className="heading">Download a Copy</span>
				{links}
			</div>
			);
	}

	render() {
		if (!this.props.guide) {
			return null;
		}
		return (
			<div className={s.appguideContainer}>
				<div className={s.breadcrumbContainer}>
					<ol className="breadcrumb">
						<li><a href="/">Home</a></li>
						{this.renderBreadCrumbs()}
					</ol>
				</div>
				<h1 className={s.header}>{this.props.guide.name}</h1>
				<div className={s.install}>Click the <Glyphicon glyph="wrench"/> next to a product for installation instructions.</div>
				{this.renderDownloadLinks()}
				<p className={s.subheading}>The application guides below will help you determine which {brand.code} parts will fit your vehicle. Each app guide is category-specific and broken down by vehicle make, model, year and style.</p>

				{this.renderApplications()}
				{this.renderPagination()}
			</div>
		);
	}

}

export default AppGuide;
