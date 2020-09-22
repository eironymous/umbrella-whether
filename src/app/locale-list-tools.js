import { 
	findIndex, 
	concat, 
	differenceWith, 
	intersectionWith, 
	isEqual, 
	isEmpty, 
	pullAllWith,
} from "lodash";

/**
 * Merges two lists of WeatherItems, ensuring no duplicate entries are added
 * @param {[]} oldList
 * @param {[]} newList
 * @param {boolean} omitFavorites - prevents merging of favorites, used when merging newly-fetched data into existing store
 */
export const mergeLists = (oldList, newList, omitFavorites = false) => {
	//Copy input arrays
	const oldCopy = oldList.slice();
	const newCopy = newList.slice();

	//Begin by extracting exactly matching values and adding to the output array
	const output = intersectionWith(oldCopy, newCopy, isEqual);

	//Pull distinct values from both arrays
	const oldDifference = differenceWith(oldCopy, newCopy, isEqual);
	const newDifference = differenceWith(newCopy, oldCopy, isEqual);

	//Store the names of any cities with updated entries
	const copiedCities = [];

	//Compare the resulting arrays
	if (!isEmpty(oldDifference)) {
		oldDifference.forEach((entry) => {
			const idx = findIndex(newDifference, (o) => {
				return o.city.localeCompare(entry.city) === 0;
			});

			//If a matching index is not found, push the entry without changes
			if (idx === -1) {
				output.push({...entry});
			} else {
				//Else copy all relevant values to new object...
				const updatedEntry = { ...entry };
				updatedEntry.city = newList[idx].city;
				updatedEntry.country = newList[idx].country;
				//...omitting favorited field if appropriate
				updatedEntry.favorited = omitFavorites ? entry.favorited : newList[idx].favorited;
				updatedEntry.observationTime = newList[idx].observationTime;
				updatedEntry.utcOffset = newList[idx].utcOffset;
				updatedEntry.temperature = newList[idx].temperature;
				updatedEntry.scale = newList[idx].scale;
				updatedEntry.descriptions = newList[idx].descriptions;
				updatedEntry.windDirection = newList[idx].windDirection;
				updatedEntry.windSpeed = newList[idx].windSpeed;
				updatedEntry.pressure = newList[idx].pressure;
				updatedEntry.rain = newList[idx].rain;
				updatedEntry.snow = newList[idx].snow;
				updatedEntry.humidity = newList[idx].humidity;
				updatedEntry.cloudCover = newList[idx].cloudCover;
				updatedEntry.feelsLike = newList[idx].feelsLike;
				updatedEntry.visibility = newList[idx].visibility;

				//Add the updated entry to the output array
				output.push(updatedEntry);
				//Store the city name for faster checking against remaining values in new list
				copiedCities.push(entry.city);
			}
		});
	}

	//Remove any cities already in output array
	pullAllWith(newDifference, copiedCities, (a, b) => { return isEqual(a.city, b); });
	const concatenated = concat(output, newDifference);

	return concatenated;
}

/**
 * Takes a list of WeatherItems and sorts that list alphabetically by city name
 * @param {[]} list 
 */
export const sortLocaleList = (list) => {
	return sortListByCity(list, 0, list.length - 1);
}

/**
 * Takes a list of WeatherItems and extracts only those found in a list of ids.
 * @param {[]} weatherItemList
 * @param {String} idList 
 */
export const generateListById = (weatherItemList, idList) => {
	//If weatherItemList is not an array or is an object without an id field, throw error
	if (!isArray(weatherItemList) && weatherItemList.id === undefined) {
		throw TypeError("First parameter must be an array.");
	}

	//If only one entry and it exists in the list, return that entry
	if (!isArray(weatherItemList) || weatherItemList.length === 1) {
		if (weatherItemList.id !== undefined && idList.includes(weatherItemList.id)) {
			return [weatherItemList];
		}
	}

	return intersectionWith(weatherItemList, idList, (a, b) => isEqual(a.id, b));
}

/**
 * Reorders a list of weatherItems to place all favourites at the front, still in alphabetical order.
 * @param {[]} list 
 */
export const reorderByFavorite = (list) => {
	const sorted = sortListByCity(list, 0, list.length - 1);

	const fav = [];
	const normal = [];

	sorted.forEach((item) => {
		if (item.favorited) {
			fav.push(item);
		} else {
			normal.push(item);
		}
	});

	return concat(fav, normal);
}

/**
 * Takes a list of weatherItems and removes the entry with the provided id, if it exists.
 * @param {[]} list 
 * @param {String} id 
 */
export const removeById = (list, id) => {
	if(!isArray(list)) {
		throw TypeError("First parameter must be an array.");
	}

	const copy = list.slice();

	pullAllWith(copy, id, (a, b) => a.id.localeCompare(b) === 0);

	return copy;
}

/**
 * Selects the weatherItem associated with a given id
 * @param {[]} list 
 * @param {String} id 
 */
export const getLocaleById = (list, id) => {
	if(!isArray(list)) {
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
 * Selects a weatherItem associated with a given city name
 * @param {[]} list 
 * @param {String} city 
 */
export const getLocaleByCity = (list, city) => {
	if (!isArray(list)) {
		throw TypeError("First parameter must be an array.");
	}

	for (let i = 0; i < list.length; i++) {
		if (list[i].city.localeCompare(city) === 0) {
			return list[i];
		}
	}

	return undefined;
}

///////////// HELPER FUNCTIONS ////////////

/**
 * Selects a pivot at the rough halfway point of a list and partitions that list,
 * plus swaps relevant elements to sort.
 * @param {[]} list - A list of WeatherItems (see /src/app/weather-item.js). 
 * @param {integer} left - The currently-selected left index
 * @param {integer} right - The currently-selected right index
 */
const partition = (list, left, right) => {
	if (!list || !list.length) {
		throw TypeError("Array parameter must not be empty or undefined.");
	}

	let pivot = list[Math.floor((right + left) / 2)];
	let i = left;
	let j = right;

	while (i <= j) {
		while (list[i].city.localeCompare(pivot.city) < 0) {
			i++;
		}
		while (list[j].city.localeCompare(pivot.city) > 0) {
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
 * @param {[]} items - A list of items 
 * @param {integer} left - The index of the first element 
 * @param {integer} right - The index of the second element
 */
const swap = (items, left, right) => {
	let temp = items[left];
	items[left] = items[right];
	items[right] = temp;
}

/**
 * Quicksort list by the name of the city, returns
 * the list in increasing alphabetical order.
 * @param {[]} items - A list of WeatherItems (see /src/app/weather-item.js) -- either the full list or a subset
 * @param {integer} left - The starting leftmost index
 * @param {integer} right - The starting rightmost index
 */
const sortListByCity = (items, left, right) => {
	if (!items || !items.length) {
		//Safety error check in case I've beefed something
		throw TypeError("Array parameter must not be empty or undefined.");
	}

	let idx = undefined;

	if (items.length > 1) {
		idx = partition(items, left, right);

		//If there are more elements on the left,
		if (left < idx - 1) {
			//Select that segment
			sortListByCity(items, left, idx - 1);
		}

		//Otherwise if there are more elements on the right,
		if (idx < right) {
			//Use that segment
			sortListByCity(items, idx, right);
		}
	}

	//If only one item is in the list, return the list as-is
	return items;
}

const { isArray } = Array;