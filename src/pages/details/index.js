import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../layout/navbar-layout";
import { selectLocaleById } from "../../state/locales-slice";
import { updateRoute } from "../../state/router-slice";
import DetailsCard from "./detail-card";

const Body = ({ locale }) => {
	return(
		<DetailsCard locale={locale} />
	)
};

const Details = ({ id, activeRoute, allRoutes }) => {
	const dispatch = useDispatch();
	const locale = useSelector((state) => selectLocaleById(state, id));

	if (locale === undefined) {
		//Redirect to error page
		dispatch(updateRoute(-1));
	}

	return (
		<Layout
			Main={() => <Body locale={locale} />}
			activeRoute={activeRoute}
			allRoutes={allRoutes}
		/>
	);
};

export default Details;