import { mergeLists } from "../../../app/locale-list-tools";
import * as MERGE_LIST_CONSTANTS from "../../test-data/merge-lists-constants";

test('mergeLists with invalid input', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A];
	const list2 = [undefined];

	const haveABadTime = () => {
		mergeLists(list1, list2)
	}

	expect(haveABadTime).toThrow(TypeError);
});

test('mergeLists with favorites included, no changes', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});

test('mergeLists with favorites included, some changes', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A, MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL];

	const actual = mergeLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});

test('mergeLists with favorites included, new entry', () => {
	const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
	const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

	const actual = mergeLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});