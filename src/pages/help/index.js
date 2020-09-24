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

const SectionHeader = styled.span`
	letter-spacing: 1px;
	font-weight: 500;
`;

const Body = () => {
	return (
		<Parent>
			<StyledCard>
				<Grid rows="3em auto">
					<Cell>
						<HeaderText className="header-text">
							Help
						</HeaderText>
					</Cell>
					<Cell row="2">
						<BodyText>
							<SectionHeader>
								Umbrella Whether: <br/><br/>
							</SectionHeader>
								At the top of any given page on Umbrella Whether, there will appear: <br/>
									<ul>
										<li>A search bar. You can search for weather by city using this bar. For more specificity, you can enter a comma-separated city and country, or city and US state. If the location in question is found, you will be brought to its page and the location will be added to your home screen list for later.</li>
										<li>A Celsius/Fahrenheit button which can be used to switch between units as desired. This function is only available when online.</li>
									</ul>
							<SectionHeader>
								Home Page: <br/> <br/>
							</SectionHeader>

								From the home page, the list of stored locations can be maintained. You can delete entries from the list, or click on the eye icon or the location name to view more detailed information about the current weather status. Clicking the heart icon will add the location to your favorites, which will move it to the top of the list.
								<br/><br/>
								Please note that deleting entries from the location list will also delete any associated notes.
								<br/><br/>

							<SectionHeader>
								Details Page: <br/><br/>
							</SectionHeader>

							On clicking the eye icon or name of a given location, you will be brought to a page displaying more detailed information on the current weather status. Also on this page, you may click 'Add a Note' to add a new note, after which it will appear on that details page for this and any future viewings, providing local storage is not cleared. <br/><br/>

							Existing notes may be edited using the pen/edit button or deleted using the trash can button.
						</BodyText>
					</Cell>
				</Grid>
			</StyledCard>
		</Parent>
	)
}

const Help = ({ activeRoute, allRoutes }) => {
	return (
		<Layout
			Main={Body}
			activeRoute={activeRoute}
			allRoutes={allRoutes}
		/>
	)
}

export default Help;