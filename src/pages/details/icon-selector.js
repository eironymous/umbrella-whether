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

		default: return <Icon icon="umbrella" className="weather-icon" />
	}
}

const beforeNight = (time) => {
	return time.localeCompare("20:00") < 0;
}