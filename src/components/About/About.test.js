import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import About from './About';
// import App from '../App';

describe('About', () => {

	it('renders', () => {
		const wrapper = mount(<About  context={{ insertCss: () => {} }} bar="bax"></About>);
		// expect(wrapper.props().bar).to.equal("bax");

		// expect(wrapper.contains(<div className="child" />)).to.be.true;
	});

});
