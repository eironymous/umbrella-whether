import React from "react";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import store from "../../../state/state";
import Help from "../../../pages/help/index";

configure({ adapter: new Adapter() });

test('Help page loads', () => {
	let wrapper = mount(
		<Provider store={store}>
			<Help activeRoute="help" allRoutes={{ help: "help" }} />
		</Provider>
	);

	expect(wrapper).toMatchSnapshot();
});

test('Help page loads correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<Help activeRoute="help" allRoutes={{ help: "help" }} />
		</Provider>
	);

	expect(wrapper.find(".header-text").first().text()).toContain("Help");
});