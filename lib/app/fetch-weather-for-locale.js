"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scaleIsValid = exports.fetchUpdates = exports.fetchList = exports.fetchWeather = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fetches current weather information for the given locale in the given scale
 * @param {String} locale - May be a city name, UK/Canada/US ZIP code, or latitude and longitude coordinates.
 * @param {String} scale - The requested scale - s for scientific, m for metric (default), or f for fahrenheit + imperial
 */
var fetchWeather = function fetchWeather(locale) {
  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.METRIC_SCALE;

  //Validate inputs - locale must be defined
  if (!locale) {
    throw TypeError("Locale cannot be undefined or null.");
  } //Scale must be within three acceptable values defined in constants.js


  if (!scaleIsValid(scale)) {
    throw TypeError("fetch-weather-for-locale: Invalid scale parameter passed: must be 'm', 's', or 'f'.");
  } //Make request, extract data from promise and return


  return axiosRequest(locale, scale).then(function (data) {
    return data;
  });
};
/**
 * Fetches current weather information for a list of locales.
 * @param {[]} localeList 
 * @param {String} scale 
 */


exports.fetchWeather = fetchWeather;

var fetchList = function fetchList(localeList) {
  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.METRIC_SCALE;

  if (!localeList) {
    throw TypeError("List of locales cannot be undefined or null.");
  }

  if (!scaleIsValid(scale)) {
    throw TypeError("Invalid scale parameter passed: must be 'm', 's', or 'f'.");
  }

  var list = [];
  localeList.forEach(function (locale) {
    list.push(axiosRequest(locale, scale));
  });
  return Promise.all(list).then(function (vals) {
    return vals;
  });
};
/**
 * Used specifically to update an extant list of previously-generated locale items.
 * If city name search returns no result, a repeat search will be performed with coordinates.
 * @param {[]} locales 
 * @param {String} scale 
 */


exports.fetchList = fetchList;

var fetchUpdates = function fetchUpdates(locales) {
  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.METRIC_SCALE;

  if (!locales) {
    throw TypeError("List of locales cannot be undefined or null.");
  }

  if (!scaleIsValid(scale)) {
    throw TypeError("Invalid scale parameter passed: must be 'm', 's', or 'f'.");
  }

  var list = [];
  var failed = [];
  locales.forEach(function (locale) {
    var result = axiosRequest(locale.city, scale);

    if (result.success === false) {
      failed.push(locale);
    } else {
      list.push(result);
    }
  });

  if (failed.length) {
    failed.forEach(function (locale) {
      list.push(axiosRequest("".concat(locale.lat, ",").concat(locale.long), scale));
    });
  }

  return Promise.all(list).then(function (vals) {
    return vals;
  });
}; //Performs axios request


exports.fetchUpdates = fetchUpdates;

var axiosRequest = function axiosRequest(locale, scale) {
  var params = {
    access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
    query: locale,
    units: scale
  };
  return _axios.default.get("http://api.weatherstack.com/current", {
    params: params
  }).then( //Extract promise
  function (res) {
    return res.data;
  }).catch(function (err) {
    //Throw the error up to presentation
    throw err;
  });
};

var scaleIsValid = function scaleIsValid(scale) {
  var valid = false;

  if (scale.localeCompare(_constants.METRIC_SCALE) === 0) {
    valid = true;
  }

  if (scale.localeCompare(_constants.FAHRENHEIT_SCALE) === 0) {
    valid = true;
  }

  if (scale.localeCompare(_constants.SCIENTIFIC_SCALE) === 0) {
    valid = true;
  }

  return valid;
};

exports.scaleIsValid = scaleIsValid;