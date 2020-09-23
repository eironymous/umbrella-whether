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
				updated.body = newDistinct[idx].body;
				updated.timeStamp = newDistinct[idx].timeStamp;

				output.push(updated);
				copiedNotes.push(entry.id);
			}
		});
	}

	//Remove any ids already copied to output array from newDistinct
	pullAllWith(newDistinct, copiedNotes, (a, b) => isEqual(a.id, b));
	const concatenated = concat(output, newDistinct);

	return concatenated;
}

/**
 * Sorts the given list in ascending order by timestamp field
 * @param {[]} list 
 */
export const sortByDate = (list) => {
	return sortListByDate(list, 0, list.length - 1);
}

/**
 * Retrieves a single note from a list based on the note's id
 * @param {[]} list 
 * @param {String} id 
 */
export const getNoteById = (list, id) => {
	if (!isArray(list)) {
		throw TypeError("First parameter must be an array.");
	}

	for (let i = 0; i < list.length; i++) {
		if (list[i].id.localeCompare(id) === 0) {
			return list[i];
		}
	}

	return undefined;
}

/**
 * Selects any notes associated with the given locale id from a list.
 * @param {[]} list 
 * @param {String} id
 */
export const getNotesByLocale = (list, id) => {
	if (!isArray(list)) {
		throw TypeError("First parameter must be an array.");
	}

	//Copy the input list
	const output = [...list];

	//Remove all entries that don't match the given id
	pullAllWith(output, id, (o) => o.localeId.localeCompare(id) !== 0)

	if (list.length === output.length) {
		//No matches were found, return empty list
		return [];
	}

	return output;
}

/// HELPER FUNCTIONS ///

/**
 * Selects a pivot at the rough halfway point of a list and partitions that list,
 * plus swaps relevant elements.
 * @param {} list - A list of note items
 * @param {*} left - The currently-selected left index
 * @param {*} right - The currently-selected right index
 */
const partition = (list, left, right) => {
	if (!list || !list.length) {
		throw TypeError("Array parameter must not be empty or undefined.");
	}

	let pivot = list[Math.floor((right + left) / 2)];
	let i = left;
	let j = right;

	while (i <= j) {
		while (list[i].timeStamp - pivot.timeStamp > 0) {
			i++;
		}
		while (list[j].timeStamp - pivot.timeStamp < 0) {
			j--;
		}

		if (i <= j) {
			swap(list, i, j);
			i++;
			j--;
		}
	}

	return i;
}

/**
 * Swaps two elements in a list
 * @param {[]} items - The list of items
 * @param {integer} left - The index of the first element
 * @param {integer} right - The index of the second element
 */
const swap = (items, left, right) => {
	let temp = items[left];
	items[left] = items[right];
	items[right] = temp;
}

/**
 * Quicksort list by the id value.
 * @param {[]} items - The list of note items
 * @param {integer} left - The starting leftmost index
 * @param {integer} right - The starting rightmost index
 */
const sortListByDate = (items, left, right) => {
	if (!items || !items.length) {
		throw TypeError("Array parameter must not be empty or undefined.");
	}

	let idx = undefined;

	if (items.length > 1) {
		idx = partition(items, left, right);

		//If there are more elements on the left,
		if (left < idx - 1) {
			//Select that segment
			sortListByDate(items, left, idx - 1);
		}

		//Else if there are more elements on the right,
		if (idx < right) {
			//Use that segment
			sortListByDate(items, idx, right);
		}
	}

	//If only one item is in the list, return the list as-is
	return items;
}