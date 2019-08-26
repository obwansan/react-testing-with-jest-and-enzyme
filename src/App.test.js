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
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  // spread operator takes props object and turns it into individual props.
  // The shallow function returns a copy of the component 'wrapped' in an
  // object with methods that can be run on the copied component, e.g. finding something or setting / checking state.
  // 'shallow' means it only copies/renders a single function with placeholders for any children. Have to use 'mount' function to copy/render a component and its children.
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute or search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders app without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking increment counter button increments counter display', () => {
  const counter = 7;

  // ES6 shorthand - key and value are both counter
  const wrapper = setup(null, { counter });

  // Find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update(); // forces a re-render

  // Find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

test('clicking decrement counter button decrements counter display', () => {
  const counter = 2;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('counter does not decrement below zero', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter);
});

test('error message displays if counter decrements below zero', () => {
  const showErrMsg = false;
  const errMsg = 'Counter cannot go below zero';

  const wrapper = setup(null, { showErrMsg });

  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  wrapper.update();

  const errMsgDisplay = findByTestAttr(wrapper, 'error-message');
  expect(errMsgDisplay.text()).toContain(errMsg);
});

test('error clears on click of increment button', () => {
    const counter = -1;
    const wrapper = setup(null, { counter });
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();
});