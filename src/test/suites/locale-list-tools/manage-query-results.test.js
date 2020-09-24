import { parseResults } from "../../../app/manage-query-results";

test('If results are undefined, parseResults returns undefined', () => {
	expect(parseResults(undefined, "metric")).toBeFalsy();
});

const input = {
	status: 200,
	name: "Montreal",
	timezone: 600,
	dt: 1600913538,
	main: {
		pressure: 20,
		humidity: 50,
		feels_like: 20,
		temp: 22,
	},
	visibility: 10,
	snow: 60,
	rain: 50,
	weather: [
		{
			main: "Sunny"
		}
	],
	wind: {
		speed: 300,
		deg: 240,
	},
	sys: {
		country: "CA"
	},
	clouds: {
		all: 50,
	}
};

const unit = "metric";

test('parseResults populates a weatherItem correctly', () => {
	const actual = parseResults(input, unit);
	
	expect(actual.id).toContain('Montreal');
});

test('parseResults populates city and country correctly', () => {
	const expectedVals = [ "Montreal", "CA" ];

	const actual = parseResults(input, unit);
	const actualVals = [ actual.city, actual.country ];

	expect(actualVals).toEqual(expectedVals);
});

test('parseResults populates weather values correctly', () => {
	const expectedVals = [20, 50, 20, 22, 10, 60, 50, "Sunny", 300, 240, 50];

	const actual = parseResults(input, unit);
	const actualVals = [ actual.pressure, actual.humidity, actual.feelsLike, actual.temperature, actual.visibility, actual.snow, actual.rain, actual.descriptions[0], actual.windSpeed, actual.windDirection, actual.cloudCover];

	expect(actualVals).toEqual(expectedVals);
});