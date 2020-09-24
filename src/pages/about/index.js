import React from "react";
import styled from "styled-components";
import Layout from "../../layout/navbar-layout";
import { Grid, Cell } from "../../layout/grid-items";
import Card from "../../layout/card";

const Parent = styled(Grid)`
	padding: 2em;
	position: relative;
	min-width: 700px;
	overflow: visible;
	min-height: 60vh;
`;

const StyledCard = styled(Card)`
	padding: 2.5em;
	overflow-y: auto;
	overflow-x: hidden;
	background: #4A4E69;
	text-align: left;

	width: 100%;
	height: 100%;

	::-webkit-scrollbar {
		width: 4px;
	}

	::-webkit-scrollbar-track {
		opacity: 0;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #22223B;
	}

	scrollbar-color: #22223B;
	scrollbar-width: 4px;	
`;

const HeaderText = styled.div`
	font-size: 2em;
	font-weight: 800;
`;

const BodyText = styled.div`
	letter-spacing: 1px;
	font-weight: 300;

	a:link {
		color: rgba(255, 255, 255, 0.7);
	}

	a:visited {
		color: rgba(255, 255, 255, 0.4);
	}

	a:hover {
		color: rgb(255, 255, 255);
	}
`;

const Body = () => {
	return (
		<Parent>
			<StyledCard>
				<Grid rows="3em auto">
					<Cell>
						<HeaderText className="header-text">
							About Umbrella Whether:
						</HeaderText>
					</Cell>
					<Cell row="2">
						<BodyText>
							Umbrella Whether is a simple weather-tracking app created using React and <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>'s current weather API.<br/><br/>

							All icons used in the app are courtesy <a href="https://fontawesome.com/license/free" target="_blank" rel="noopener noreferrer">Font Awesome</a>.
						</BodyText>
					</Cell>
				</Grid>
			</StyledCard>
		</Parent>
	)
}

const About = ({ activeRoute, allRoutes }) => {
	return (
		<Layout
			Main={() => <Body />}
			activeRoute={activeRoute}
			allRoutes = {allRoutes}
		/>
	)
}

export default About;