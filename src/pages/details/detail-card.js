import React from "react";
import styled from "styled-components";
import { Grid, Cell } from "../../layout/grid-items";
import Card from "../../layout/card";
import { getIconForKeyword } from "./icon-selector";
import * as CONSTANTS from "../../app/constants";

const Parent = styled(Grid)`
	padding: 2em;
	position: relative;
	min-width: 700px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
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
		background: #4A4E69;
	}

	scrollbar-color: #4A4E69;
	scrollbar-width: 4px;
`;

const LocationNameText = styled.div`
	font-weight: 800;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	letter-spacing: 1px;
	max-width: 100%;
	box-sizing: border-box;
	text-align: left;
`;

const IconCell = styled(Cell)`
	font-size: 4em;
	text-align: center;

	.weather-icon {
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
`;

const TemperatureText = styled.div`
	font-size: 5em;
	text-align: center;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
`;

const Divider = styled.hr`
	width: 100%;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	border: 1px solid rgba(255, 255, 255, 0.5);
`;

const InfoLabel = styled.div`
	letter-spacing: 1px;
	text-align: right;
`;

const InfoText = styled.div`
	font-weight: 600;
	text-align: left;
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

const MainInfoContainer = ({
	locale,
	time,
	units
}) => {
	
	return (
		<Grid
			rows="6em 6em 2em"
			columns="1fr 3fr"
			gridGap="16px"
		>
			<IconCell row="1/span 2">
				{getIconForKeyword(locale.descriptions[0], time)}
			</IconCell>
			<Cell row="3" col="1/span 2">
				<LocationNameText>
					{`${locale.city}, ${locale.country}`}
				</LocationNameText>
			</Cell>
			<Cell row="1" col="2">
				<TemperatureText>
					{`${locale.temperature} ${units.temperature}`}
				</TemperatureText>
			</Cell>
			<Cell row="2" col="2">
				{`/ feels like ${locale.feelsLike} ${units.temperature}`}
			</Cell>
		</Grid>
	)
}

const DetailsInfoContainer = ({
	locale,
	time,
	units
}) => {
	return (
		<Grid columns="1fr 1fr" rows="repeat(9, min-content)"  gridGap="10px">
			<Cell>
				<InfoLabel>
					Local Time:
				</InfoLabel>
			</Cell>
			<Cell col="2">
				<InfoText>
					{time}
				</InfoText>
			</Cell>
			<Cell row="2">
				<InfoLabel>
					Current Weather:
				</InfoLabel>
			</Cell>
			<Cell row="2" col="2">
				<InfoText>
					{locale.descriptions.map((desc, idx) => 
						<React.Fragment key={`${desc}-${idx}`}>{desc}</React.Fragment>
					)}
				</InfoText>
			</Cell>
			<Cell row="3">
				<InfoLabel>
					Wind:
				</InfoLabel>
			</Cell>
			<Cell row="3" col="2">
				<InfoText>
					{`${locale.windDirection}, ${locale.windSpeed} ${units.windSpeed}`}
				</InfoText>
			</Cell>
			<Cell row="4">
				<InfoLabel>
					Pressure:
				</InfoLabel>
			</Cell>
			<Cell row="4" col="2">
				<InfoText>
					{`${locale.pressure} ${units.pressure}`}
				</InfoText>
			</Cell>
			<Cell row="5">
				<InfoLabel>
					Precipitation:
				</InfoLabel>
			</Cell>
			<Cell row="5" col="2">
				<InfoText>
					{`${locale.precipitation} ${units.precip}`}
				</InfoText>
			</Cell>
			<Cell row="6">
				<InfoLabel>
					Humidity:
				</InfoLabel>
			</Cell>
			<Cell row="6" col="2">
				<InfoText>
					{`${locale.humidity}%`}
				</InfoText>
			</Cell>
			<Cell row="7">
				<InfoLabel>
					Cloud Cover:
				</InfoLabel>
			</Cell>
			<Cell row="7" col="2">
				<InfoText>
					{`${locale.cloudCover}%`}
				</InfoText>
			</Cell>
			<Cell row="8">
				<InfoLabel>
					UV Index:
				</InfoLabel>
			</Cell>
			<Cell row="8" col="2">
				<InfoText>
					{locale.uvIndex}
				</InfoText>
			</Cell>
			<Cell row="9">
				<InfoLabel>
					Visibility:
				</InfoLabel>
			</Cell>
			<Cell row="9" col="2">
				<InfoText>
					{`${locale.visibility} ${units.visibility}`}
				</InfoText>
			</Cell>
		</Grid>
	)
}

/**
 * Displays the weather details for a specific location.
 * 
 * @param {*} param0 
 */
const DetailsCard = ({
	locale
}) => {
	const time = locale.localTime.split(" ")[1];
	const units = getUnits(locale.scale);

	if (locale === undefined) return null;

	return (
		<Parent>
			<Cell>
				<StyledCard>
					<Grid
						rows="16em .5em 10em"
						columns="minmax(360px, 1fr) minmax(160px, 1fr) minmax(160px, 1fr)"
					>
						<Cell>
							<MainInfoContainer locale={locale} time={time} units={units} />
						</Cell>
						<Cell col="2/span 2">
							<DetailsInfoContainer locale={locale} units={units} time={time} />
						</Cell>
						<Cell row="2" col="1/span 3">
							<Divider />
						</Cell>
					</Grid>
				</StyledCard>
			</Cell>
		</Parent>
	)
}

export default DetailsCard;