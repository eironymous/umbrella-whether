import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../layout/navbar-layout";
import { selectLocaleById } from "../../state/locales-slice";
import DetailsCard from "./detail-card";

const Body = ({ locale }) => {
	return(
		<DetailsCard locale={locale} />
	)
};

const Details = ({ id, activeRoute, allRoutes }) => {
	const locale = useSelector((state) => selectLocaleById(state, id));

	return (
		<Layout
			Main={() => <Body locale={locale} />}
			activeRoute={activeRoute}
			allRoutes={allRoutes}
		/>
	);
};

export default Details;