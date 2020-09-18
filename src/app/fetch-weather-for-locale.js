import axios from "axios";
import { FAHRENHEIT_SCALE, METRIC_SCALE, SCIENTIFIC_SCALE } from "./constants";

/**
 * Fetches current weather information for the given locale in the given scale
 * @param {String} locale - May be:
 * 		- A single locale - may be a city name, UK/Canada/US ZIP code, or latitude and longitude coordinates.
 * 		- A semicolon-separated set of locales of any of the above types.
 * @param {String} scale - The requested scale - s for scientific, m for metric (default), or f for fahrenheit + imperial
 */
export const fetchWeather = (locale, scale = METRIC_SCALE) => {
	//Validate inputs - locale must be defined
	if (!locale) {
		throw "Locale cannot be undefined or null.";
	}

	//Scale must be within three acceptable values defined in constants.js
	if (!scaleIsValid(scale)) {
		throw "fetch-weather-for-locale: Invalid scale parameter passed: must be 'm', 's', or 'f'.";
	}

	//Make request, extract data from promise and return
	return axiosRequest(locale, scale).then(data => data);
}

export const fetchList = (localeList, scale = METRIC_SCALE) => {
	if (!localeList) {
		throw "List of locales cannot be undefined or null.";
	}

	if (!scaleIsValid(scale)) {
		throw "Invalid scale parameter passed: must be 'm', 's', or 'f'.";
	}

	const list = [];

	localeList.forEach((locale) => {
		list.push(axiosRequest(locale, scale));
	});

	console.log(list);

	return Promise.all(list).then((vals) => vals);
}

//Performs axios request
const axiosRequest = (locale, scale) => {
	const params = {
		access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
		query: locale,
		scale: scale
	}

	return axios.get(
		"http://api.weatherstack.com/current", { params }
	).then(
		//Extract promise
		(res) => { return res.data; }
	).catch(err => {
		//Throw the error up to presentation
		throw err;
	});
}

export const scaleIsValid = (scale) => {
	let valid = false;

	if (scale.localeCompare(METRIC_SCALE) === 0) {
		valid = true;
	}

	if (scale.localeCompare(FAHRENHEIT_SCALE) === 0) {
		valid = true;
	}

	if (scale.localeCompare(SCIENTIFIC_SCALE) === 0) {
		valid = true;
	}

	return valid;
}