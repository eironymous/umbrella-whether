import React from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export const getIconForKeyword = (keyword, observationTime) => {
	switch (true) {
		case /clear/i.test(keyword) || /sunny/i.test(keyword): {
			if (beforeNight(observationTime)) {
				return <Icon icon={["far", "sun"]} className="weather-icon" />
			} else {
				return <Icon icon="moon" className="weather-icon" />
			}
		}
		case /partly cloudy/i.test(keyword): {
			if (beforeNight(observationTime)) {
				return <Icon icon="cloud-sun" className="weather-icon" />
			} else {
				return <Icon icon="cloud-moon" className="weather-icon" />
			}
		}

		case /cloudy/i.test(keyword) || /overcast/i.test(keyword): {
			return <Icon icon="cloud" className="weather-icon" />
		}

		case /thundery/i.test(keyword): {
			return <Icon icon="bolt" className="weather-icon" />
		}

		case /fog/i.test(keyword) || /haze/i.test(keyword): {
			return <Icon icon="smog" className="weather-icon" />
		}

		case /blowing/i.test(keyword) || /blizzard/i.test(keyword): {
			return <Icon icon="wind" className="weather-icon" />
		}

		case /snow/i.test(keyword): {
			return <Icon icon="snowflake" className="weather-icon" />	
		}

		case /drizzle/i.test(keyword): {
			if (beforeNight(observationTime)) {
				return <Icon icon="cloud-sun-rain" className="weather-icon" />
			} else {
				return <Icon icon="cloud-moon-rain" className="weather-icon" />
			}
		}

		case (/light/i.test(keyword) || /patchy/i.test(keyword)) && /rain/i.test(keyword): {
			if (beforeNight(observationTime)) {
				return <Icon icon="cloud-sun-rain" className="weather-icon" />
			} else {
				return <Icon icon="cloud-moon-rain" className="weather-icon" />
			}
		}

		case /moderate/i.test(keyword) && /rain/i.test(keyword): {
			return <Icon icon="cloud-rain" className="weather-icon" />
		}

		case /rain/i.test(keyword) && /heavy/i.test(keyword): {
			return <Icon icon="cloud-showers-heavy" className="weather-icon" />
		}

		default: return <Icon icon="umbrella" className="weather-icon" />
	}
}

const beforeNight = (time) => {
	return time.localeCompare("20:00") < 0 && time.localeCompare("6:00") > 0;
}