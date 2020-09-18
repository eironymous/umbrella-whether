import { configureStore } from "@reduxjs/toolkit";
import routerReducer from "./router-slice";
import localesReducer from "./locales-slice";
import { throttle } from "lodash";
import { saveState, loadState } from "./persistence/save-load";

const store =  configureStore({
	reducer: {
		router: routerReducer,
		locales: localesReducer,
	},
	preloadedState: loadState()
});

//Persist the current state tree to storage at most every 5 seconds
store.subscribe(throttle(
	() => saveState(store.getState(), 5000)
));

export default store;