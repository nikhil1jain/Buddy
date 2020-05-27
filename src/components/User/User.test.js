import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import User from "./User";

configure({ adapter: new Adapter() });

describe("<User />", () => {
  it("should render a user", () => {
    const userDetails = {
      firstName: "Dummy",
    };
    const component = shallow(<User userDetails={userDetails} />);
    const wrapper = component.find(`[data-test='userItem']`);
    expect(wrapper.length).toBe(1);
  });
});
