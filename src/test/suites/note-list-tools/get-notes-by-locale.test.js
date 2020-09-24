import * as CONSTANTS from "../../test-data/note-list-constants";
import { getNotesByLocale } from "../../../app/note-list-tools";

test('getNotesByLocale with invalid first parameter', () => {
	const passingInvalidParameter = () => {
		getNotesByLocale(1, 1);
	}

	expect(passingInvalidParameter).toThrow(TypeError);
});

test('getNotesByLocale with invalid second parameter', () => {
	const fullList = [CONSTANTS.SAMPLE_NOTE_1_A, CONSTANTS.SAMPLE_NOTE_2_A, CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_4_A];

	const expected = [];

	const actual = getNotesByLocale(fullList, undefined);

	expect(actual).toEqual(expected);
})

test('getNotesByLocale with valid parameters', () => {
	const fullList = [ CONSTANTS.SAMPLE_NOTE_1_A, CONSTANTS.SAMPLE_NOTE_2_A, CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_4_A ];

	const expected = [ CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_4_A ];

	const actual = getNotesByLocale(fullList, "1");

	expect(actual).toEqual(
		expect.arrayContaining(expected)
	)
})