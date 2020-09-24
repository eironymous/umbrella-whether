import React from "react";
import About from "../../../pages/about/index";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import store from "../../../state/state";

configure({ adapter: new Adapter() });

test('About page loads', () => {
	let wrapper = mount(
		<Provider store={store}>
			<About activeRoute="about" allRoutes={{about: "about"}} />
		</Provider>
	);

	expect(wrapper).toMatchSnapshot();
});

test('About page loads correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<About activeRoute="about" allRoutes={{ about: "about" }} />
		</Provider>
	);

	expect(wrapper.find(".header-text").first().text()).toContain("About");
});