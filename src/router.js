import React from "react";
import { useSelector } from "react-redux";
import { selectActive, selectAllRoutes } from "./state/router-slice";
import Home from "./pages/home/index";
import Details from "./pages/details/index";
import About from "./pages/about/index";

export default () => {
	const currentRoute = useSelector(selectActive);
	const allRoutes = useSelector(selectAllRoutes);

	switch (true) {
		case (currentRoute === allRoutes.home):
			return <Home activeRoute={currentRoute} allRoutes={allRoutes} />;
		case /^details/.test(currentRoute): {
			//Split the route into route + id
			const portions = currentRoute.split(/-(.+)/);
			//Isolate the id from the route pattern
			const id = portions[1];
			//Use the id to fetch the correct details
			return <Details activeRoute={currentRoute} allRoutes={allRoutes} id={id} />;
		}
		case (currentRoute === allRoutes.about):
			return <About activeRoute={currentRoute} allRoutes={allRoutes} />
		default: return <Home activeRoute={currentRoute} allRoutes={allRoutes} />;
	}
}