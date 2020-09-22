import { reorderByFavorite } from "../../../app/locale-list-tools";

test('reorderByFavorite throws error with invalid input', () => {
	const input = [undefined, 1, "hello"];

	const makingAMistake = () => {
		reorderByFavorite(input);
	}

	expect(makingAMistake).toThrow(TypeError);
});

test('reorderByFavorite with valid input', () => {
	const input = [
		{
			id: "1",
			city: "a",
			favorited: false,
		},
		{
			id: "2",
			city: "b",
			favorited: true,
		},
		{
			id: "3",
			city: "A",
			favorited: true,
		},
		{
			id: "4",
			city: "z",
			favorited: true,
		},
		{
			id: "5",
			city: "z",
			favorited: false,
		}
	];

	const expected = [
		{
			id: "3",
			city: "A",
			favorited: true,
		},
		{
			id: "2",
			city: "b",
			favorited: true,
		},
		{
			id: "4",
			city: "z",
			favorited: true,
		},
		{
			id: "1",
			city: "a",
			favorited: false,
		},
		{
			id: "5",
			city: "z",
			favorited: false,
		}
	];

	const actual = reorderByFavorite(input);

	expect(actual).toEqual(expected);
});