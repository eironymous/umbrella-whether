import { uniqueId } from "lodash";
import { getWeatherItem } from "./weather-item";
import { DateTime } from "luxon";

export const parseResults = (results, unit) => {
	if (results === undefined) {
		return undefined;
	}

	if (results.status !== 200) {
		return results;
	}
	
	const timezone = results.timezone / 60;
	const time = DateTime.fromSeconds(results.dt).toUTC(timezone);
	const hoursMinutesIsolated = time.toString().split("T")[1].split(":");
	const offset = /\+/.test(hoursMinutesIsolated[2]) ? `+${hoursMinutesIsolated[2].split("+")[1]}:${hoursMinutesIsolated[3]}` : `-${hoursMinutesIsolated[2].split("-")[1]}:${hoursMinutesIsolated[3]}`;
	const dateString = `${hoursMinutesIsolated[0]}:${hoursMinutesIsolated[1]} GMT ${offset}`;

	return getWeatherItem(
		uniqueId(`${results.name}.`),
		false,
		results.name,
		results.sys.country,
		dateString,
		Math.round(results.main.temp),
		unit,
		[results.weather[0].main],
		results.wind.speed,
		results.wind.deg,
		results.main.pressure,
		results.rain,
		results.snow,
		results.main.humidity,
		results.clouds.all,
		Math.round(results.main.feels_like),
		results.visibility
	);
}