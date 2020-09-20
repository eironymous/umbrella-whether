import { uniqueId } from "lodash";
import { getWeatherItem } from "./weather-item";

export const parseResults = (results) => {
	if (results.success === false) {
		return results;
	}

	const utc = results.location.utc_offset.charAt(0).localeCompare("-") !== 0 ? "+".concat(results.location.utc_offset) : results.location.utc_offset;
	
	return getWeatherItem(
		uniqueId(),
		false,
		results.location.name,
		results.location.country,
		results.location.localtime,
		results.current.observation_time,
		utc,
		results.current.temperature,
		results.request.unit,
		results.current.weather_icons,
		results.current.weather_descriptions,
		results.current.wind_speed,
		results.current.wind_dir,
		results.current.pressure,
		results.current.precipitation,
		results.current.humidity,
		results.current.cloudcover,
		results.current.feelslike,
		results.current.uv_index,
		results.current.visibility
	);
}