import { uniqueId } from "lodash";
import { getWeatherItem } from "./weather-item";

export const parseResults = (results) => {
	if (results.success === false) {
		return results;
	}

	return getWeatherItem(
		uniqueId(),
		false,
		results.location.name,
		results.location.country,
		results.location.localtime,
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
}