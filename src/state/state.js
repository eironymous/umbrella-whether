import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import routerReducer from "./router-slice";
import favoritesReducer from "./favorites-slice";
import { throttle } from "lodash";
import { saveState, loadState } from "./persistence/save-load";

const store =  configureStore({
	reducer: {
		router: routerReducer,
		favorites: favoritesReducer,
		
	},
	preloadedState: loadState()
});

//Persist the current state tree to storage at most every 5 seconds
store.subscribe(throttle(
	() => saveState(store.getState(), 5000)
));

export default store;