import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Grid, Cell } from "../../layout/grid-items";

const Parent = styled(Grid)`
	min-width: 700px;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	height: min-content;
`;

const IconContainer = styled.div`
	position: relative;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	font-size: 4em;
`;

const TextContainer = styled.div`
	position: relative;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	font-size: 2em;
	letter-spacing: 2px;
	font-weight: 800;
`;

const HiddenHeader = styled.h1`
	overflow: hidden;
	position: fixed;
	height: 0px;
	width: 0px;
	opacity: 0;
`;

const EmptyState = () => {
	return (
		<>
		<HiddenHeader>home</HiddenHeader>
		<Parent rows="min-content min-content" columns="1fr">
			<Cell>
				<IconContainer>
					<Icon icon="surprise" />
				</IconContainer>
			</Cell>
			<Cell row="2">
				<TextContainer>
					There's nothing here yet! Try searching for a city to add it to your homepage.
				</TextContainer>
			</Cell>
		</Parent>
		</>
	)
};

export default EmptyState;