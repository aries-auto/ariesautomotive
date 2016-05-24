import React, { Component, PropTypes } from 'react';
import s from './AppGuide.scss';
import AppGuideActions from '../../../actions/AppGuideActions';
import AppGuideStore from '../../../stores/AppGuideStore';
import withStyles from '../../../decorators/withStyles';
import cx from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';
import { Glyphicon } from 'react-bootstrap';
import { appguides } from './data';

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
	};

	constructor() {
		super();
		this.getFinish = this.getFinish.bind(this);
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

	getFinishes() {
		const output = [];
		this.props.guide.finishes.map((finish, i) => {
			output.push(<th key={i}>{finish}</th>);
		});
		return output;
	}

	getFinish(application) {
		const partNumber = [];
		this.props.guide.finishes.map((finish) => {
			application.parts.map((part, j) => {
				if (part.finish === finish) {
					const url = `/part/${part.oldPartNumber}`;
					const ins = `https://www.curtmfg.com/masterlibrary/01ARIES/206003-2/installsheet/${part.oldPartNumber}_INS.pdf`;
					partNumber.push(<td key={j}><a href={url}>{part.oldPartNumber} - {part.short_description}</a><a href={ins} target="_blank"><Glyphicon glyph="wrench" className={s.wrench} /></a></td>);
				}
			});
		});
		return partNumber;
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

	renderApplications() {
		return (<table className={cx('table table-hover table-bordered')}><thead><tr><th>Make</th><th>Model</th>
		<th>Style</th><th>Start Year</th><th>End Year</th>
		{this.getFinishes()}</tr></thead><tbody>
		{this.renderApplicationRows()}</tbody></table>);
	}

	renderApplicationRows() {
		const output = [];
		this.props.guide.applications.map((app, i) => {
			const fin = this.getFinish(app);
			output.push(<tr key={i}><td>{app.make}</td><td>{app.model}</td><td>{app.style}</td><td>{app.min_year}</td><td>{app.max_year}</td>{fin}</tr>);
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
		const page = this.props.guide.name;
		const links = [];
		appguides.map((guide, i) => {
			if ((guide.cats.indexOf(page) !== -1) || (guide.type !== 'xls')) {
				links.push(
					<a key={i} href={guide.link} target="_blank" analytics-on="click" analytics-event="AppGuides:3 IN Round Side Bars:pdf">
						<img src={guide.icon} alt="App Guide" className={cx('icon', s.appguideIcon)} />
					</a>
				);
			}
		});
		return (
			<div className={s.downloads}>
				<span className="heading">Download a Copy</span>
				{links}
			</div>
			);
	}

	render() {
		return (
			<div className={s.appguideContainer}>
				<h1 className={s.header}>{this.props.guide.name}</h1>
				<div className={s.install}>Click the <Glyphicon glyph="wrench"/> next to a product for installation instructions.</div>
				{this.renderDownloadLinks()}
				<p className={s.subheading}>The application guides below will help you determine which ARIES parts will fit your vehicle. Each app guide is category-specific and broken down by vehicle make, model, year and style.</p>

				{this.renderApplications()}
				{this.props.guide.applications && this.props.guide.applications.length > 99 ? this.renderPagination() : null}
			</div>
		);
	}

}

export default AppGuide;
