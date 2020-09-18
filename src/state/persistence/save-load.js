/**
 * Persists the current state tree to local storage.
 * @param {obj} state 
 */
export const saveState = (state) => {
	try {
		const serialized = JSON.stringify(state);
		localStorage.setItem('umbrella-whether-state', serialized);
	} catch (err) {
		console.log(err);
		throw err;
	}
};

/**
 * Loads stored state from localstorage.
 */
export const loadState = () => {
	try {
		const serialized = localStorage.getItem('umbrella-whether-state');

		//If nothing is found, return undefined
		if (serialized === null) {
			return undefined;
		}

		return JSON.parse(serialized);
	} catch (err) {
		console.log(err);
		return undefined;
	}
}