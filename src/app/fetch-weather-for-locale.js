import axios from "axios";
import { FAHRENHEIT_SCALE, METRIC_SCALE, SCIENTIFIC_SCALE } from "./constants";

/**
 * Fetches current weather information for the given locale in the given scale
 * @param {String} locale - May be a city name, UK/Canada/US ZIP code, or latitude and longitude coordinates.
 * @param {String} scale - The requested scale
 */
export const fetchWeather = (locale, scale = METRIC_SCALE) => {
	//Validate inputs - locale must be defined
	if (!locale) {
		throw TypeError("Locale cannot be undefined or null.");
	}

	//Scale must be within three acceptable values defined in constants.js
	if (!scaleIsValid(scale)) {
		throw TypeError("fetch-weather-for-locale: Invalid scale parameter passed.");
	}

	//Make request, extract data from promise and return
	return axiosRequest(locale, scale).then(data => data).catch((err) => console.log(err));
}

/**
 * Retrieves weather based on coordinates.
 * @param {String} lat 
 * @param {String} lon 
 * @param {String} scale 
 */
export const getWeatherByCoordinates = (lat, lon, scale = METRIC_SCALE) => {
	if (!scaleIsValid(scale)) {
		throw TypeError("fetch-weather-for-locale: Invalid scale parameter passed.")
	}

	return axiosByCoords(lat, lon, scale).then(data => data).catch(err => console.log(err));
}

/**
 * Fetches current weather information for a list of locales.
 * @param {[]} localeList 
 * @param {String} scale 
 */
export const fetchList = (localeList, scale = METRIC_SCALE) => {
	if (!localeList) {
		throw TypeError("List of locales cannot be undefined or null.");
	}

	if (!scaleIsValid(scale)) {
		throw TypeError("Invalid scale parameter passed: must be 'm', 's', or 'f'.");
	}

	const list = [];

	localeList.forEach((locale) => {
		list.push(axiosRequest(locale, scale));
	});

	return Promise.all(list).then((vals) => vals).catch((err) => console.log(err));
}

/**
 * Used specifically to update an extant list of previously-generated locale items.
 * If city name search returns no result, a repeat search will be performed with coordinates.
 * @param {[]} locales 
 * @param {String} scale 
 */
export const fetchUpdates = (locales, scale = METRIC_SCALE) => {
	if (!locales) {
		throw TypeError("List of locales cannot be undefined or null.");
	}

	if (!scaleIsValid(scale)) {
		throw TypeError("Invalid scale parameter passed: must be 'm', 's', or 'f'.");
	}

	const list = [];

	locales.forEach((locale) => {
		list.push(axiosRequest(`${locale.city},${locale.country}`, scale));
	});

	return Promise.all(list).then((vals) => vals).catch((err) => console.log(err));
}

//Performs axios request
const axiosRequest = (locale, scale) => {
	const params = {
		appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
		q: locale,
		units: scale
	}

	console.log("requesting!");

	return axios.get(
		"https://api.openweathermap.org/data/2.5/weather", { params, timeout: 500 },
	).then(
		//Extract promise
		(res) => { return { ...res.data, status: res.status }; }
	).catch(err => {
		//Log the error
		console.log(err);
	});
}

const axiosByCoords = (lat, lon, scale) => {
	const params = {
		appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
		units: scale,
		lat,
		lon
	};

	return axios.get(
		"https://api.openweathermap.org/data/2.5/weather", { params, timeout: 500 }
	).then(
		(res) => { return { ...res.data, status: res.status }; }
	).catch(err => {
		console.log(err);
	})
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