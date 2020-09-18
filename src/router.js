import React from "react";
import { useSelector } from "react-redux";
import { selectActive, selectAllRoutes } from "./state/router-slice";
import Home from "./pages/home/index";

export default () => {
	const currentRoute = useSelector(selectActive);
	const allRoutes = useSelector(selectAllRoutes);

	switch (true) {
		case (currentRoute === allRoutes.home):
			return <Home activeRoute={currentRoute} allRoutes={allRoutes} />;
		default: return <Home activeRoute={currentRoute} allRoutes={allRoutes} />;
	}
}