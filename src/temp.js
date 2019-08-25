import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

// Configure enzyme with the adapter.
// Tells enzyme we're using React 16 and that's what it needs to use to create the virtual DOM.
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props sepcific to this setup.
 * @param {any} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  // spread operator takes props object and turns it into individual props
  return shallow(<App {...props} />)
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute or search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test=${val}]`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = wrapper.find("[data-test='component-app']");
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = wrapper.find("[data-test='increment-button']");
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = wrapper.find("[data-test='counter-display']");
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {

});

test('clicking button increments counter display', () => {

});