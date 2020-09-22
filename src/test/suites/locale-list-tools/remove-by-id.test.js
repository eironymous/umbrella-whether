import { removeById } from "../../../app/locale-list-tools";

test('removeById throws error on undefined input', () => {
	const input = [undefined];

	const screwingUp = () => {
		removeById(input, input);
	};

	expect(screwingUp).toThrow(TypeError);
});

test('removeById throws error when first parameter is not a list', () => {
	const beingAGoofball = () => {
		removeById(1, "1");
	};

	expect(beingAGoofball).toThrow(TypeError);
});

test('removeById returns correctly-filtered list', () => {
	const inputList = [
		{ id: "1" },
		{ id: "2" },
		{ id: "3" },
		{ id: "4" },
		{ id: "10" },
	];

	const expected = [
		{ id: "2" },
		{ id: "3" },
		{ id: "4" },
		{ id: "10" }
	];

	const actual = removeById(inputList, "1");

	expect(actual).toEqual(expected);
});