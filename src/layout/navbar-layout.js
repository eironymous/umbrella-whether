import React from "react";
import styled from "styled-components";
import { Grid, Cell } from "./grid-items";
import Navbar from "./nav-list";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { setNavOpen, selectNavOpen } from "../state/app-settings-slice";

const NavbarLayout = styled.div`
	position: relative;
	height: 100%;
	min-height: 600px;
	display: flex;
`;

const NavCell = styled.div`
	position: relative;
	overflow: hidden;
	width: ${p => p.width ? p.width : "initial"};
	transition-property: width;
	transition-duration: 0.5s;
	background-color: #4A4E69;
	user-select: none;
	z-index: 10;
	min-height: 600px;
`;

const Body = styled.div`
	transition-property: width;
	transition-duration: 0.5s;
	width: ${p => p.navWidth ? `calc(100% - ${p.navWidth})` : "100%"};
	overflow: visible;
`;

const BodyContents = styled(Grid)`
	transition-property: width;
	transition-duration: 0.5s;
	overflow: auto;
	width: 100%;
	height: 100%;
`;

export default ({
	Main,
	activeRoute,
	allRoutes,
}) => {
	const dispatch = useDispatch();
	const navbarExpanded = useSelector(selectNavOpen);

	const toggleNavbar = () => {
		dispatch(setNavOpen(!navbarExpanded));
	}

	const navWidth = navbarExpanded ? "225px" : "70px";

	if (Main === undefined) return null;

	return(
		<NavbarLayout
			rows="100vh"
		>
			<NavCell width={navWidth}>
				<Navbar
					activeRoute={activeRoute}
					allRoutes={allRoutes}
					toggleNavWidth={toggleNavbar}
					navOpen={navbarExpanded}
					width={navWidth}
				/>
			</NavCell>
			<Body navWidth={navWidth} col="2">
				<BodyContents rows="10vh 90vh" columns="1fr">
					<Cell>
						<Header />
					</Cell>
					<Cell row="2">
						<Main />
					</Cell>
				</BodyContents>
			</Body>
		</NavbarLayout>
	)
}