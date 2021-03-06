/**
 * WeatherItem is used to manage and display the relevant information returned from a
 * request to the weatherstack API.
 * 
 * It stores:
 *  - the basic metadata associated with the weather snapshot - relevant location and local time information
 * 	- a CurrentWeatherItem storing more detailed information about the weather
 * A WeatherItem consists of some or all of the following parameters:
 * @param {String} id - An unique identifier
 * @param {boolean} favorited - Whether or not the given locale should be stored as a favorite
 * @param {String} city - The city associated with the request
 * @param {String} country - The country associated with the request
 * @param {String} observationtime - The time of the latest observation
 * @param {String} temperature - The temperature at time of latest observation
 * @param {String} scale - The scale used for the temperature and precipitation measurements
 * @param {String[]} descriptions - An array of descriptions associated with the current weather status
 * @param {String} windSpeed - The windspeed at time of observation
 * @param {String} windDirection - The wind direction at time of observation
 * @param {String} pressure - The pressure at time of observation
 * @param {String} rain - The amount of precipitation at time of observation, in units defined by the scale parameter
 * @param {String} snow - The amount of snow at time of observation, in units defined by the scale parameter
 * @param {String} humidity - The humidity at time of observation, in percentage
 * @param {String} cloudCover - Cloud cover at time of observation, in percentage
 * @param {String} feelsLike - The perceived temperature at time of observation, in selected scale
 * @param {String} visibility - The visibility distance at time of observation, in selected scale
 */
const getWeatherItem = (
	id,
	favorited,
	city,
	country,
	observationTime,
	temperature,
	scale,
	descriptions,
	windSpeed,
	windDirection,
	pressure,
	rain,
	snow,
	humidity,
	cloudCover,
	feelsLike,
	visibility,
) => ({
	id,
	favorited,
	city,
	country,
	observationTime,
	temperature,
	scale,
	descriptions,
	windSpeed,
	windDirection,
	pressure,
	rain,
	snow,
	humidity,
	cloudCover,
	feelsLike,
	visibility,
});

export { getWeatherItem };