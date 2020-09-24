import { inRange } from "lodash";

export const getDirectionForDegrees = (deg) => {
	switch(true) {
		case deg > 349 || deg < 11: return "N";
		case inRange(deg, 12, 33): return "NNE";
		case inRange(deg, 34, 56): return "NE";
		case inRange(deg, 57, 78): return "ENE";
		case inRange(deg, 79, 101): return "E";
		case inRange(deg, 102, 123): return "ESE";
		case inRange(deg, 124, 146): return "SE";
		case inRange(deg, 147, 168): return "SSE";
		case inRange(deg, 169, 191): return "S";
		case inRange(deg, 192, 213): return "SSW";
		case inRange(deg, 214, 236): return "SW";
		case inRange(deg, 237, 258): return "WSW";
		case inRange(deg, 259, 281): return "W";
		case inRange(deg, 282, 303): return "WNW";
		case inRange(deg, 304, 326): return "NW";
		case inRange(deg, 327, 248): return "NNW";
		default: return "Variable wind direction";
	}
}