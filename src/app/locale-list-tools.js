import { findIndex, concat } from "lodash";

/**
 * Merges two lists of WeatherItems, ensuring no duplicate entries are added
 * @param {WeatherItem[]} oldList
 * @param {WeatherItem[]} newList
 */
export const mergeLists = (oldList, newList) => {
	const output = [];

	//Iterate over new list
	newList.forEach((entry) => {
		//Check if old list contains the current city
		const idx = findIndex(oldList, (o) =>  { 
			let matches =  (o.id.localeCompare(entry.id) === 0) ? true : false; 
			return matches;
		});

		//If the entry doesn't already exist, add it to the list
		if (idx === -1) {
			output.push(entry);
		} else {
			//Otherwise update the relevant fields and push the merged entry
			const oldEntry = {...oldList[idx]};
			oldEntry.country = entry.country;
			oldEntry.localTime = entry.localTime;
			oldEntry.observationTime = entry.observationTime;
			oldEntry.temperature = entry.temperature;
			oldEntry.scale = entry.scale;
			oldEntry.iconUrl = entry.iconUrl;
			oldEntry.descriptions = entry.descriptions;
			oldEntry.windSpeed = entry.windSpeed;
			oldEntry.pressure = entry.pressure;
			oldEntry.precipitation = entry.precipitation;
			oldEntry.humidity = entry.humidity;
			oldEntry.cloudCover = entry.cloudCover;
			oldEntry.feelsLike = entry.feelsLike;
			oldEntry.uvIndex = entry.uvIndex;
			oldEntry.visibility = entry.visibility;

			output.push(oldEntry);
		}	
	});

	return output;
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