import { saveState, loadState } from "../../state/persistence/save-load";
import * as CONSTANTS from "../test-data/merge-lists-constants";

test('data can be saved to localstorage without error', () => {
	const testData = CONSTANTS.SAMPLE_ITEM_1_A;

	expect(() => saveState(testData)).toBeTruthy();
});

test('data can be saved to and then loaded from localstorage appropriately', () => {
	const testData = {
		list: [
			CONSTANTS.SAMPLE_ITEM_1_A,
			CONSTANTS.SAMPLE_ITEM_2_A,
			CONSTANTS.SAMPLE_ITEM_3_A,
		]
	};

	const expected = {...testData};

	saveState(testData);

	const actual = loadState();

	expect(actual).toEqual(expected);
});

test('loading returns undefined if no data is in local storage', () => {
	localStorage.clear();

	const actual = loadState();

	expect(actual).toBeUndefined();
})