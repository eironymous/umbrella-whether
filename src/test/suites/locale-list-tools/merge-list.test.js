import { mergeLists } from "../../../app/locale-list-tools";
import * as MERGE_LIST_CONSTANTS from "../../test-data/merge-lists-constants";

test('mergeLists with invalid input', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A];
	const list2 = [1];

	const havingABadTime = () => {
		mergeLists(list1, list2)
	}

	expect(havingABadTime).toThrow(TypeError);
});

//FAVORITES INCLUDED

test('mergeLists with favorites included, no changes', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});

test('mergeLists with favorites included, change to one existing entry', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A, MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL];

	const actual = mergeLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});

test('mergeLists with favorites included, changes to some entries', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_2_AB_FAV_INCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
});

test('mergeLists with favorites included, changes to all entries', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_B];

	const expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_2_AB_FAV_INCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_3_AB_FAV_INCL];

	const actual = mergeLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
});

test('mergeLists with favorites included, no change to existing entries, new entry', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
});

test('mergeLists with favorites included, change to existing entry, and new entry', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});

// FAVORITES EXCLUDED

test('mergeLists with favorites excluded, no changes', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2, true);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});

test('mergeLists with favorites excluded, change to one existing entry', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A, MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_EXCL];

	const actual = mergeLists(list1, list2, true);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});

test('mergeLists with favorites excluded, changes to some entries', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_2_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2, true);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
});

test('mergeLists with favorites excluded, changes to all entries', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_B];

	const expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_2_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_3_AB_FAV_EXCL];

	const actual = mergeLists(list1, list2, true);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
});

test('mergeLists with favorites excluded, no change to existing entries, new entry', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2, true);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
});

test('mergeLists with favorites excluded, change to existing entry, and new entry', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2, true);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});