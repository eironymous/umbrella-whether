import { mergeNoteLists } from "../../../app/note-list-tools";
import * as CONSTANTS from "../../test-data/note-list-constants";

test('mergeNoteLists with invalid input', () => {
	const list1 = undefined;
	const list2 = undefined;

	const goofingOff = () => {
		mergeNoteLists(list1, list2);
	}

	expect(goofingOff).toThrow(TypeError);
});

test('mergeNoteLists with no changes', () => {
	const list1 = [ CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_1_B ];
	const list2 = [ CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_1_B ];

	const expected = [ CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_1_B ];

	const actual = mergeNoteLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
});

test('mergeNoteLists with one change, one new element', () => {
	const list1 = [ CONSTANTS.SAMPLE_NOTE_1_A, CONSTANTS.SAMPLE_NOTE_2_A ];
	const list2 = [ CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_1_B ];

	const expected = [ CONSTANTS.MERGED_1_AB, CONSTANTS.SAMPLE_NOTE_2_A, CONSTANTS.SAMPLE_NOTE_3_A ];

	const actual = mergeNoteLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	);
});

test('mergeNoteLists with several changes', () => {
	const list1 = [ CONSTANTS.SAMPLE_NOTE_1_A, CONSTANTS.SAMPLE_NOTE_2_A, CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_4_A ];
	const list2 = [ CONSTANTS.SAMPLE_NOTE_2_B, CONSTANTS.SAMPLE_NOTE_3_B ];

	const expected = [ CONSTANTS.SAMPLE_NOTE_1_A, CONSTANTS.MERGED_2_AB, CONSTANTS.MERGED_3_AB, CONSTANTS.SAMPLE_NOTE_4_A ];

	const actual = mergeNoteLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
});

test('mergeNoteLists with all elements changed', () => {
	const list1 = [ CONSTANTS.SAMPLE_NOTE_1_A, CONSTANTS.SAMPLE_NOTE_2_A, CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_4_A ];
	const list2 = [ CONSTANTS.SAMPLE_NOTE_1_B, CONSTANTS.SAMPLE_NOTE_2_B, CONSTANTS.SAMPLE_NOTE_3_B, CONSTANTS.SAMPLE_NOTE_4_B ];

	const expected = [ CONSTANTS.MERGED_1_AB, CONSTANTS.MERGED_2_AB, CONSTANTS.MERGED_3_AB, CONSTANTS.MERGED_4_AB ];

	const actual = mergeNoteLists(list1, list2);

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
});