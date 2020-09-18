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