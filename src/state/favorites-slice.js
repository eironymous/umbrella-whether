import { createSlice } from "@reduxjs/toolkit";

/**
 * favoritesSlice stores state information related to the current user's favorite locations.
 * This should store ONLY the id# of the given location.
 */
export const favoritesSlice = createSlice({
	name: "favorites",
	initialState: {
		favorites: [1]
	},
	//Users may:
	reducers: {
		//Add a favorite, or
		addFavorite: (state, {payload}) => {
			const list = state.favorites;
			list.push(payload);
			state.favorites = list;
		},
		//Remove a favorite
		removeFavorite: (state, {payload}) => {
			const list = state.favorites.filter((fav) => fav !== payload);
			state.favorites = list;
		},
	}
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectAllFavorites = state => state.favorites.favorites;

export default favoritesSlice.reducer;