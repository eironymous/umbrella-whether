import { getWeatherItem } from "../../../app/weather-item";
import * as MERGE_LIST_CONSTANTS from "../../test-data/merge-lists-constants";

//Ensures getWeatherItem appropriately generates an object when input is
//correct.
test('weatheritem appropriately generated', () => {
	const expected = MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A;

	const actual = getWeatherItem(
		"1",
		true,
		"New York",
		"United States of America",
		"2019-09-07 08:14",
		"12:14 PM",
		13,
		"m",
		"http://www.website.com",
		["Sunny"],
		0,
		"N",
		0,
		0,
		90,
		0,
		13,
		4,
		16
	);

	expect(actual).toEqual(expected);
});