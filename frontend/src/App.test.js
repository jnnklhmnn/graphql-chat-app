import { App } from "./App.js";
import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

describe("App", () => {
  
  test("renders in Loading State Correctly", () => {
    Enzyme.configure({ adapter: new Adapter() });
    const wrapper = shallow(<App allPostsQuery={{ loading: true }} />);
    wrapper.setProps({
      allPostsQuery: {
        loading: true
      }
    });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test("renders in Loaded State Correctly", () => {
    const testData = {
      loading: false,
      allPosts: [
        {
          message: 'testmessage1',
          updatedAt: undefined,
          createdAt: '2018-04-07T20:34:04.000Z',
          id: 'testid1'
        },
        {
          message: 'testmessage2',
          updatedAt: '2018-04-07T20:34:04.000Z',
          createdAt: '2018-04-07T20:34:04.000Z',
          id: 'testid2'
        }
      ]
    };
    Enzyme.configure({ adapter: new Adapter() });
    const wrapper = shallow(<App allPostsQuery={testData} />);
    wrapper.setProps({
      allPostsQuery: {
        loading: true
      }
    });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
