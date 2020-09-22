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
export const METRIC_SCALE = "m";
export const FAHRENHEIT_SCALE = "f";
export const SCIENTIFIC_SCALE = "s";

export const METRIC_UNITS = {
	temperature: "°C",
	windSpeed: "km/h",
	visibility: "km",
	precip: "mm",
	totalSnow: "cm",
	pressure: "millibars",
};

export const FAHRENHEIT_UNITS = {
	temperature: "°F",
	windSpeed: "mph",
	visibility: "m",
	precip: "in",
	totalSnow: "in",
	pressure: "millibars",
};

export const SCIENTIFIC_UNITS = {
	temperature: "°K",
	windSpeed: "km/h",
	visibility: "km",
	precip: "mm",
	totalSnow: "cm",
	pressure: "millibars",
};