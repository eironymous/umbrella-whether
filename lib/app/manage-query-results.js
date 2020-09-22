"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseResults = void 0;

var _lodash = require("lodash");

var _weatherItem = require("./weather-item");

var parseResults = function parseResults(results) {
  if (results.success === false) {
    return results;
  }

  var utc = results.location.utc_offset.charAt(0).localeCompare("-") !== 0 ? "+".concat(results.location.utc_offset) : results.location.utc_offset;
  return (0, _weatherItem.getWeatherItem)((0, _lodash.uniqueId)("".concat(results.location.name, ".")), false, results.location.name, results.location.country, results.location.localtime, results.current.observation_time, utc, results.current.temperature, results.request.unit, results.current.weather_icons, results.current.weather_descriptions, results.current.wind_speed, results.current.wind_dir, results.current.pressure, results.current.precipitation, results.current.humidity, results.current.cloudcover, results.current.feelslike, results.current.uv_index, results.current.visibility, results.location.lat, results.location.lon);
};

exports.parseResults = parseResults;