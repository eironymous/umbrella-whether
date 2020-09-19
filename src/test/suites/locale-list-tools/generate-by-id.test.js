import { generateListById } from "../../../app/locale-list-tools";

test('generateListById throws error on invalid input', () => {
	const input = { total: "nonsense" };

	expect(() => generateListById(input)).toThrow(TypeError);
})

test('generateListById with no matching ids returns empty array', () => {
	const inputList = [
		{
			id: "0",
		},
		{
			id: "1",
		},
		{
			id: "2",
		},
		{
			id: "3",
		}
	];

	const idList = ["-1", "5", "10"];

	const actual = generateListById(inputList, idList);

	expect(actual).toEqual([]);
})

test('generateListById correctly returns matching ids', () => {
	const inputList = [
		{
			id: "a"
		},
		{
			id: "0"
		},
		{
			id: "-1"
		},
		{
			id: "."
		},
		{
			id: "test-id-5"
		}
	];

	const idList = ["-1", ".", "test-id-5", "!!!"];

	const expected = [{ id: "-1" }, { id: "." }, { id: "test-id-5" }];

	const actual = generateListById(inputList, idList);

	expect(actual).toEqual(expected);
})