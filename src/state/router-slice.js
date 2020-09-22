import { createSlice } from "@reduxjs/toolkit";

/**
 * routerSlice stores state information related to the current active route as well as all available routes.
 */
export const routerSlice = createSlice({
	name: "router",
	initialState: {
		active: "home",
		allRoutes: {
			home: "home",
			details: "details-",
		}
	},
	reducers: {
		updateRoute: (state, { payload }) => {
			state.active = payload;
		}
	}
});

export const { updateRoute } = routerSlice.actions;

export const selectActive = state => state.router.active;
export const selectAllRoutes = state => state.router.allRoutes;

export default routerSlice.reducer;