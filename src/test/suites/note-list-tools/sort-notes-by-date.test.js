import * as CONSTANTS from "../../test-data/note-list-constants";
import { sortByDate } from "../../../app/note-list-tools";

test('sortByDate with invalid input', () => {
	const submitInvalidParameter = () => {
		sortByDate(1);
	}

	expect(submitInvalidParameter).toThrow(TypeError);
});

test('sortByDate with valid input', () => {
	const list = [ CONSTANTS.SAMPLE_NOTE_1_A, CONSTANTS.SAMPLE_NOTE_2_A, CONSTANTS.SAMPLE_NOTE_3_A, CONSTANTS.SAMPLE_NOTE_4_A ];

	const expected = [ CONSTANTS.SAMPLE_NOTE_1_A, CONSTANTS.SAMPLE_NOTE_2_A, CONSTANTS.SAMPLE_NOTE_4_A, CONSTANTS.SAMPLE_NOTE_3_A ];

	const actual = sortByDate(list);

	expect(actual).toEqual(expected);
})