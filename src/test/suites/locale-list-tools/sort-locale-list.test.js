import { sortLocaleList } from "../../../app/locale-list-tools";

test('invalid input causes error', () => {
	const input = [1, 2, 3];

	const aSillyMistake = () => {
		sortLocaleList(input);
	}

	expect(aSillyMistake).toThrow(TypeError);
});

test('valid input is correctly sorted', () => {
	const input = [{city: "m"}, {city:"A"}, {city: "qw"}, {city: "a"}];

	const expected = [{city: "a"}, {city: "A"}, {city: "m"}, {city: "qw"}];

	const actual = sortLocaleList(input);

	expect(actual).toEqual(expected);
});