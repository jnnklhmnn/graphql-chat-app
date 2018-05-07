import { MessageInput } from './message-input.js';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe('MessageInput', () => {
    test('renders with data correctly', () => {
      Enzyme.configure({ adapter: new Adapter() });
      const wrapper = shallow(<MessageInput  />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  // should enable button on update state... der ist einfach.