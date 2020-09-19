import { findIndex, concat, differenceWith, intersectionWith, isEqual, isEmpty, pullAllWith } from "lodash";

/**
 * Merges two lists of WeatherItems, ensuring no duplicate entries are added
 * @param {WeatherItem[]} oldList
 * @param {WeatherItem[]} newList
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
				output.push(entry);
			} else {
				//Else copy all relevant values to new object...
				const updatedEntry = { ...entry };
				updatedEntry.city = newList[idx].city;
				updatedEntry.country = newList[idx].country;
				//...omitting favorited field if appropriate
				updatedEntry.favorited = omitFavorites ? entry.favorited : newList[idx].favorited;
				updatedEntry.localTime = newList[idx].localTime;
				updatedEntry.observationTime = newList[idx].observationTime;
				updatedEntry.temperature = newList[idx].temperature;
				updatedEntry.scale = newList[idx].scale;
				updatedEntry.iconUrl = newList[idx].iconUrl;
				updatedEntry.descriptions = newList[idx].descriptions;
				updatedEntry.windDirection = newList[idx].windDirection;
				updatedEntry.windSpeed = newList[idx].windSpeed;
				updatedEntry.pressure = newList[idx].pressure;
				updatedEntry.precipitation = newList[idx].precipitation;
				updatedEntry.humidity = newList[idx].humidity;
				updatedEntry.cloudCover = newList[idx].cloudCover;
				updatedEntry.feelsLike = newList[idx].feelsLike;
				updatedEntry.uvIndex = newList[idx].uvIndex;
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
 * @param {WeatherItem[]} list 
 */
export const sortLocaleList = (list) => {
	return sortListByCity(list, 0, list.length - 1);
}

/**
 * Takes a list of WeatherItems and extracts only those found in a list of ids.
 * @param {WeatherItem[]} weatherItemList
 * @param {String} idList 
 */
export const generateListById = (weatherItemList, idList) => {
	const output = [];

	weatherItemList.forEach((item) => {
		const idx = findIndex(idList, (id) => {
			let matches = (id.localeCompare(item.id) === 0) ? true : false;
			return matches;
		});

		if (idx !== -1) {
			output.push(item);
		}
	});

	return output;
}

/**
 * Reorders a list of weatherItems to place all favourites at the front, still in alphabetical order.
 * @param {WeatherItem[]} list 
 */
export const reorderByFavorite = (list) => {
	const sorted = sortListByCity(list, 0, list.length - 1);

	const fav = [];
	const normal = [];

	sorted.forEach((item) => {
		if (item.favorite) {
			fav.push(item);
		} else {
			normal.push(item);
		}
	});

	return concat(fav, normal);
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
		throw "Attempting to sort empty list.";
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
		throw "locales-slice.js: Attempting to sort empty or undefined list.";
	}

	let index = undefined;

	if (items.length > 1) {
		index = partition(items, left, right);

		//If there are more elements on the left,
		if (left < index - 1) {
			//Select that segment
			sortListByCity(items, left, index - 1);
		}

		//Otherwise if there are more elements on the right,
		if (index < right) {
			//Use that segment
			sortListByCity(items, index, right);
		}
	}

	return items;
}