import { createSlice } from "@reduxjs/toolkit";

export const localesSlice = createSlice({
	name: "locales",
	initialState: {
		locales: []
	},
	reducers: {
		//Add a new locale
		addLocale: (state, {payload}) => {
			const list = state.locales;
			list.push(payload);
			//Sort to ensure locations appear in alphabetical order
			const sorted = sortListByCity(list, 0, list.length - 1);
			state.locales = sorted;
		},
		//Add multiple new locales
		addLocales: (state, {payload}) => {
			const list = state.locales;
			payload.forEach((item) => {
				list.push(item);
			});
			const sorted = sortListByCity(list, 0, list.length - 1);
			state.locales = sorted;
		}
	}
});

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

	let pivot = list[Math.floor((right + left) / 2)],
	i = left;
	j = right;

	while (i <= j) {
		while (items[i].city.localeCompare(pivot.city) <= 0) {
			i++;
		}
		while (items[j].city.localeCompare(pivot.city) >= 0) {
			j--;
		}

		if (i <= j) {
			swap(items, i, j);
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

	if(items.length > 1) {
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

export const { addLocale, addLocales } = localesSlice.actions;

export const selectLocales = state => state.locales;

export default localesSlice.reducer;