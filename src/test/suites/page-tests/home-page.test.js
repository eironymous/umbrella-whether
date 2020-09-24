import React from "react";
import App from "../../../App";
import Home from "../../../pages/home/index";
import { mount, shallow, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import store from "../../../state/state";

configure({ adapter: new Adapter() });

// test('App loads correctly', () => {
// 	let wrapper = mount(<App/>);

// 	expect(wrapper).toMatchSnapshot();
// })

// test('Home page loads correctly', () => {
// 	let wrapper = mount(
// 		<Provider store={store}>
// 			<Home activeRoute={"home"} allRoutes={"home"} />
// 		</Provider>
// 	);
	
// 	expect(wrapper.find("h1").text()).toContain("home")
// });