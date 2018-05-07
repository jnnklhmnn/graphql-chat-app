import { DeleteButton } from './delete-button.js';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe('DeleteButton', () => {
    test('renders with data correctly', () => {
      Enzyme.configure({ adapter: new Adapter() });
      const wrapper = shallow(<DeleteButton  id="exampleID"/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });