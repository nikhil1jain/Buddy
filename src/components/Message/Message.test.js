import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Message from "./Message";

configure({ adapter: new Adapter() });

describe("<Message />", () => {
  it("should render a Message", () => {
    const messageDetails = {
      name: "Dummy",
      message: "Dummy Message",
    };
    const classes = {
      black: "black",
    };
    const component = shallow(
      <Message messageDetails={messageDetails} classes={classes} />
    );
    const wrapper = component.find(`[data-test='messageItem']`);
    expect(wrapper.length).toBe(1);
  });
});
