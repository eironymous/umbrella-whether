import { createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import { mergeLists, sortLocaleList } from "../app/locale-list-tools";

export const localesSlice = createSlice({
	name: "locales",
	initialState: {
		locales: []
	},
	reducers: {
		//Overwrite the list of locales
		setLocales: (state, {payload}) => {
			const sorted = sortLocaleList(payload);
			state.locales = sorted;
		},
		//Merge a list of locales with the extant list
		mergeLocales: (state, {payload}) => {
			const allLocales = [...state.locales];
			const merged = mergeLists(allLocales, payload);
			const sorted = sortLocaleList(merged);
			state.locales = sorted;
		},
		//Set favorite
		setFavorite: (state, {payload}) => {
			const allLocales = payload.allLocales;
			console.log(allLocales, payload);

			//Find the index of the locale in question
			const idx = findIndex(allLocales, (item) => item.id === payload.id);
			
			if (idx !== -1) {
				const item = {...allLocales[idx]};
				item.favorited = payload.favorite;

				console.log(item);
				const merged = mergeLists(allLocales, [item]);
				const sorted = sortLocaleList(merged);
				console.log("sorted:", sorted);

				state.locales = sorted;
			}
		}
	}
});

export const { setLocales, mergeLocales, setFavorite } = localesSlice.actions;

export const selectLocales = state => state.locales;

export default localesSlice.reducer;