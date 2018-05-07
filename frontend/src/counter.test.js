import React from 'react';
import Counter from './Counter.js';
import renderer from 'react-test-renderer';

test('Counter should render without crashing', () => {
  const component = renderer.create(
    <Counter numberOfMessages={3}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});