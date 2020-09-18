import { createSlice } from "@reduxjs/toolkit";

export const localesSlice = createSlice({
	name: "locales",
	initialState: {
		locales: []
	},
	reducers: {
		//Update the list of locales
		setLocales: (state, {payload}) => {
			state.locales = payload;
		}
	}
});

export const { setLocales } = localesSlice.actions;

export const selectLocales = state => state.locales;

export default localesSlice.reducer;