import { reorderByFavorite } from "../../../app/locale-list-tools";

test('reorderByFavorite throws error with invalid input', () => {
	const input = [undefined, 1, "hello"];

	const makingAMistake = () => {
		reorderByFavorite(input);
	}

	expect(makingAMistake).toThrow(TypeError);
});