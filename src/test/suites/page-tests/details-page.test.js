import React from "react";
import Details from "../../../pages/details/index";
import DetailsCard from "../../../pages/details/detail-card";
import MainInfoContainer from "../../../pages/details/detail-card-elements/main-info-container";
import DetailedInfoContainer from "../../../pages/details/detail-card-elements/detailed-info-container";
import { mount, shallow, configure } from "enzyme";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import store from "../../../state/state";

configure({ adapter: new Adapter() });

const units = {
	temperature: "C",
	windSpeed: "km/h",
	pressure: "millibars",
	precip: "mm",
	totalSnow: "cm",
	visibility: "km",
}

const locale = {
	id: "Montreal.1",
	city: "Montreal",
	favorited: false,
	country: "CA",
	descriptions: ["Sunny"],
	temperature: "20",
	feelsLike: "22",
	windDirection: "360",
	windSpeed: "5",
	rain: 0,
	snow: 0,
	pressure: 10,
	cloudCover: 40,
	humidity: 50,
	visibility: 12,
};

const time = "15:00";

test('Details page loads.', () => {
	let wrapper = mount(
		<Provider store={store}>
			<Details activeRoute={"details-Beijing.1"} allRoutes={"details-"} id={"Beijing.1"} />
		</Provider>
	)

	expect(wrapper).toMatchSnapshot();
});

test('Details card returns null if locale is undefined', () => {
	let wrapper = shallow(
		<DetailsCard locale={undefined} />
	);

	expect(wrapper.get(0)).toBeFalsy();
});

test('MainInfoContainer populates city correctly', () => {
	let wrapper = mount(
		<MainInfoContainer locale={locale} units={units} time={time} />
	);

	expect(wrapper.find(".city-text").first().text()).toContain("Montreal");
});

test('MainInfoContainer populates country correctly', () => {
	let wrapper = mount(
		<MainInfoContainer locale={locale} units={units} time={time} />
	);

	expect(wrapper.find(".country-text").first().text()).toContain("Canada");
});

test('MainInfoContainer populates temperature correctly', () => {
	let wrapper = mount(
		<MainInfoContainer locale={locale} units={units} time={time} />
	);

	expect(wrapper.find(".temperature-text").first().text()).toContain("20 C");
});

test('MainInfoContainer populates feels like correctly', () => {
	let wrapper = mount(
		<MainInfoContainer locale={locale} units={units} time={time} />
	);

	expect(wrapper.find(".feels-like-text").first().text()).toContain("22 C");
});

test('DetailedInfoContainer populates time correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".observation-time-text").first().text()).toContain("15:00");
});

test('DetailedInfoContainer populates favorite correctly ', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".favorite-icon").props().icon).toEqual(["far", "heart"]);
});

test('DetailedInfoContainer populates description text correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".description-text").first().text()).toContain("Sunny");
});

test('DetailedInfoContainer populates wind degree correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".wind-text").first().text()).toContain("N");
});

test('DetailedInfoContainer populates wind speed correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".wind-text").first().text()).toContain("5 km/h");
});

test('DetailedInfoContainer populates rain correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".rain-text").first().text()).toContain("0 mm");
});

test('DetailedInfoContainer populates snow correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".snow-text").first().text()).toContain("0 cm");
});

test('DetailedInfoContainer populates cloud cover correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".cloud-cover-text").first().text()).toContain("40%");
});

test('DetailedInfoContainer populates humidity correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".humidity-text").first().text()).toContain("50%");
})

test('DetailedInfoContainer populates visibility correctly', () => {
	let wrapper = mount(
		<Provider store={store}>
			<DetailedInfoContainer locale={locale} time={time} units={units} />
		</Provider>
	);

	expect(wrapper.find(".visibility-text").first().text()).toContain("12 km");
});