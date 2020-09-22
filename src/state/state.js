import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "./router-slice";
import localesReducer from "./locales-slice";
import notesReducer from "./notes-slice";
import appSettingsReducer from "./app-settings-slice";
import { throttle } from "lodash";
import { saveState, loadState } from "./persistence/save-load";

const store =  configureStore({
	reducer: {
		router: routerReducer,
		locales: localesReducer,
		notes: notesReducer,
		settings: appSettingsReducer,
	},
	preloadedState: loadState()
});

//Persist the current state tree to storage at most every 10 seconds
store.subscribe(throttle(
	() => saveState(store.getState(), 10000)
));

export default store;