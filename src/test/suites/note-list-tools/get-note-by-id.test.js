import * as CONSTANTS from "../../test-data/note-list-constants";
import { getNoteById } from "../../../app/note-list-tools";

test('getNoteById with invalid input', () => {
	const thumbingYourNose = () => {
		getNoteById(1, 2);
	}

	expect(thumbingYourNose).toThrow(TypeError);
});

test('getNoteById with valid input', () => {
	const list = [ CONSTANTS.SAMPLE_NOTE_1_B, CONSTANTS.SAMPLE_NOTE_2_A, CONSTANTS.SAMPLE_NOTE_3_A ]
	const expected = CONSTANTS.SAMPLE_NOTE_1_B;

	const actual = getNoteById(list, "note-1")

	expect(actual).toEqual(expected);
});

test('getNoteById with two entries with the same id - should return the first matching', () => {
	const list = [ CONSTANTS.SAMPLE_NOTE_1_A, CONSTANTS.SAMPLE_NOTE_1_B, CONSTANTS.SAMPLE_NOTE_2_A ];
	const expected = CONSTANTS.SAMPLE_NOTE_1_A;

	const actual = getNoteById(list, "note-1");

	expect(actual).toEqual(expected);
});