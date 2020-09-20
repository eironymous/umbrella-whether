import {
	findIndex,
	concat,
	isEqual,
	differenceWith,
	intersectionWith,
	pullAllWith,
	isEmpty
} from "lodash";

const { isArray } = Array;

/**
 * Used to merge arrays of notes. Each note should have:
 * 	- an id,
 *  - a body,
 *  - a city name
 * @param {[]} oldList 
 * @param {[]} newList 
 */
export const mergeNoteLists = (oldList, newList) => {
	//Copy input arrays
	const oldCopy = oldList.slice();
	const newCopy = newList.slice();

	//Extract any exactly-matching values
	const output = intersectionWith(oldCopy, newCopy, isEqual);

	//Pull distinct values from each array
	const oldDistinct = differenceWith(oldCopy, newCopy, isEqual);
	const newDistinct = differenceWith(newCopy, oldCopy, isEqual);

	//Initialize variable to store ids of any notes with updated values
	const copiedNotes = [];

	if (!isEmpty(oldDistinct)) {
		oldDistinct.forEach((entry) => {
			const idx = findIndex(newDistinct, o => 
				o.id.localeCompare(entry.id) === 0	
			);

			//If no match has been found for the current entry,
			if (idx === -1) {
				//Push entry without changes
				output.push({...entry});
			} else {
				//Else copy all values to new object and update where relevant
				const updated = {...entry};

				output.push(updated);
				copiedNotes.push(entry.id);
			}
		});
	}

	//Remove any ids already copied to output array from newDistinct
	pullAllWith(newDistinct, copiedNotes, (a, b) => isEqual(a.id, b));
	const concatenated = concat(output, newDifference);

	return concatenated;
}