import React from "react";
import styled from "styled-components";
import Layout from "../../layout/navbar-layout";
import { Grid, Cell } from "../../layout/grid-items";

const Body = () => {
	return (
		<>
		</>
	)
};

const ErrorPage = ({ allRoutes, currentRoute }) => {
	return (
		<Layout
			Main={<Body />}
			allRoutes={allRoutes}
			currentRoute={currentRoute}
		/>
	)
}

export default ErrorPage;