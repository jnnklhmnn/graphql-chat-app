import { Message } from './message.js';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe('Message', () => {
    test('renders with data correctly', () => {
      Enzyme.configure({ adapter: new Adapter() });
      const wrapper = shallow(<Message  message="Example Message" createdAt="2018-04-07T20:34:04.000Z" updatedAt="2018-05-06T20:34:04.000Z" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });