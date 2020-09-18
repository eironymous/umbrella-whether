import { fetchWeather, scaleIsValid } from "./fetch-weather-for-locale";
import { METRIC_SCALE } from "./constants";
import { WeatherItem, CurrentWeatherItem } from "./weather-item";
import { uniqueId } from "lodash";

export const parseResults = (results) => {
	if (results.success === false) {
		return results;
	}

	const details = new CurrentWeatherItem(
		results.current.observation_time,
		results.current.temperature,
		results.request.unit,
		results.current.weather_icons,
		results.current.weather_descriptions,
		results.current.wind_speed,
		results.current.wind_dir,
		results.current.pressure,
		results.current.humidity,
		results.current.cloudcover,
		results.current.feelslike,
		results.current.uv_index,
		results.current.visibility
	);

	return new WeatherItem(
		uniqueId(),
		results.location.name,
		results.location.country,
		results.location.localtime,
		details
	);
}