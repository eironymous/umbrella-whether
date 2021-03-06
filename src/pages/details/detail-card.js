import React from "react";
import styled from "styled-components";
import { Grid, Cell } from "../../layout/grid-items";
import Card from "../../layout/card";
import * as CONSTANTS from "../../app/constants";
import MainInfoContainer from "./detail-card-elements/main-info-container";
import DetailedInfoContainer from "./detail-card-elements/detailed-info-container";
import NotesContainer from "./detail-card-elements/notes/note-container";

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
	background: #4A4E69;

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



const Divider = styled.hr`
	width: 100%;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	border: 1px solid rgba(255, 255, 255, 0.5);
	margin: 0;
	padding: 0;
`;

const HiddenHeader = styled.h1`
	overflow: hidden;
	position: fixed;
	height: 0px;
	width: 0px;
	opacity: 0;
`;

const getUnits = (scale) => {
	switch (true) {
		case scale.localeCompare(CONSTANTS.METRIC_SCALE) === 0:
			return CONSTANTS.METRIC_UNITS;
		case scale.localeCompare(CONSTANTS.FAHRENHEIT_SCALE) === 0:
			return CONSTANTS.FAHRENHEIT_UNITS;
		case scale.localeCompare(CONSTANTS.SCIENTIFIC_SCALE) === 0:
			return CONSTANTS.SCIENTIFIC_UNITS;
		default: return CONSTANTS.METRIC_UNITS;
	}
}



/**
 * Displays the weather details for a specific location.
 * 
 * @param {*} param0 
 */
const DetailsCard = ({
	locale
}) => {

	if (locale === undefined) return null;

	const units = getUnits(locale.scale);

	return (
		<Parent>
			<Cell>
				<StyledCard>
					<Grid
						rows="19em 1em 20em"
						columns="minmax(360px, 510px) minmax(160px, 1fr) minmax(160px, 1fr)"
					>
						<Cell>
							<HiddenHeader>detail-card</HiddenHeader>
							<MainInfoContainer locale={locale} time={locale.observationTime} units={units} />
						</Cell>
						<Cell col="2/span 2">
							<DetailedInfoContainer locale={locale} units={units} time={locale.observationTime} />
						</Cell>
						<Cell row="2" col="1/span 3">
							<Divider />
						</Cell>
						<Cell row="3" col="1/span 3">
							<NotesContainer locale={locale} />
						</Cell>
					</Grid>
				</StyledCard>
			</Cell>
		</Parent>
	)
}

export default DetailsCard;