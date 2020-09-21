import { createSlice } from "@reduxjs/toolkit";
import * as CONSTANTS from "../app/constants";

export const appSettingsSlice = createSlice({
	name: "settings",
	initialState: {
		units: CONSTANTS.METRIC_SCALE,
		firstVisit: true,
	},
	reducers: {
		setUnits: (state, {payload}) => {
			state.units = payload;
		},
		setFirstVisit: (state, {payload}) => {
			state.firstVisit = payload;
		}
	}
});

export const { setUnits, setFirstVisit } = appSettingsSlice.actions;
export const selectUnits = state => state.settings.units;
export const selectFirstVisit = state => state.settings.firstVisit;

export default appSettingsSlice.reducer;