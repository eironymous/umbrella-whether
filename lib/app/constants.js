"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCIENTIFIC_UNITS = exports.FAHRENHEIT_UNITS = exports.METRIC_UNITS = exports.SCIENTIFIC_SCALE = exports.FAHRENHEIT_SCALE = exports.METRIC_SCALE = void 0;

/**
 * Used to define the scale for requests for the weatherstack API. Requests may return values in:
 *   - Metric units:
 * 		- Celsius (temperature)
 * 		- km/h (wind speed)
 * 		- km (visibility)
 * 		- mm (precip)
 * 		- cm (total snow)
 * 		- mb (pressure)
 * 
 * 	- Fahrenheit + Imperial units:
 * 		- Fahrenheit (temperature)
 * 		- mph (wind speed)
 * 		- m (visibility)
 * 		- in (precip + total snow)
 * 		- mb (pressure)
 * 
 * 	- Scientific units:
 * 		- Kelvin (temperature)
 * 		- hm/h (wind speed)
 * 		- km (visibility)
 * 		- mm (precip)
 * 		- cm (total snow)
 * 		- mb (pressure)
 */
var METRIC_SCALE = "m";
exports.METRIC_SCALE = METRIC_SCALE;
var FAHRENHEIT_SCALE = "f";
exports.FAHRENHEIT_SCALE = FAHRENHEIT_SCALE;
var SCIENTIFIC_SCALE = "s";
exports.SCIENTIFIC_SCALE = SCIENTIFIC_SCALE;
var METRIC_UNITS = {
  temperature: "°C",
  windSpeed: "km/h",
  visibility: "km",
  precip: "mm",
  totalSnow: "cm",
  pressure: "millibars"
};
exports.METRIC_UNITS = METRIC_UNITS;
var FAHRENHEIT_UNITS = {
  temperature: "°F",
  windSpeed: "mph",
  visibility: "m",
  precip: "in",
  totalSnow: "in",
  pressure: "millibars"
};
exports.FAHRENHEIT_UNITS = FAHRENHEIT_UNITS;
var SCIENTIFIC_UNITS = {
  temperature: "°K",
  windSpeed: "km/h",
  visibility: "km",
  precip: "mm",
  totalSnow: "cm",
  pressure: "millibars"
};
exports.SCIENTIFIC_UNITS = SCIENTIFIC_UNITS;