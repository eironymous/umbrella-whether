import { createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import { mergeLists, sortLocaleList, getLocaleById , getLocaleByCity } from "../app/locale-list-tools";

export const localesSlice = createSlice({
	name: "locales",
	initialState: {
		locales: []
	},
	reducers: {
		//Overwrite the list of locales
		setLocales: (state, {payload}) => {
			const sorted = payload.length ? sortLocaleList(payload) : payload;
			state.locales = sorted;
		},
		//Merge a list of locales with the extant list
		mergeLocales: (state, {payload}) => {
			const allLocales = [...state.locales];
			if (allLocales.length === 0) {
				state.locales = [payload];
			} else {
				const merged = mergeLists(allLocales, payload, true);
				const sorted = sortLocaleList(merged);
				state.locales = sorted;
			}
		},
		//Set favorite
		setFavorite: (state, {payload}) => {
			const allLocales = [...state.locales];

			//Find the index of the locale in question
			const idx = findIndex(allLocales, (item) => item.id === payload.id);
			
			if (idx !== -1) {
				const item = {...allLocales[idx]};
				item.favorited = payload.favorite;

				const merged = mergeLists(allLocales, [item]);
				const sorted = sortLocaleList(merged);

				state.locales = sorted;
			}
		},
		//Delete by id
		deleteById: (state, {payload}) => {
			const allLocales = [...state.locales];

			//Find the index of the locale in question
			const idx = findIndex(allLocales, (item) => item.id === payload);

			if (idx !== -1) {
				const newList = allLocales.filter((_item, i) => i !== idx);
				state.locales = newList;
			}
		}
	}
});

export const { setLocales, mergeLocales, setFavorite, deleteById } = localesSlice.actions;

export const selectLocales = state => state.locales;
export const selectLocaleById = (state, id) => getLocaleById(state.locales.locales, id);
export const selectLocaleByCity = (state, city) => getLocaleByCity(state.locales.locales, city);

export default localesSlice.reducer;