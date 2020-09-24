import React from "react";
import styled from "styled-components";
import { get } from "lodash";
import { Grid, Cell } from "../../../layout/grid-items";
import { getIconForKeyword } from "../icon-selector";
import { COUNTRY_CODES } from "../../../app/constants";

const LocationNameText = styled.div`
	font-weight: 800;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	letter-spacing: 3px;
	max-width: 100%;
	box-sizing: border-box;
	text-align: left;
	font-size: 2em;
`;

const IconCell = styled(Cell)`
	font-size: 8em;
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
	letter-spacing: 2px;
`;

const FeelsLikeText = styled.div`
	position: relative;
	letter-spacing: 1px;
	font-weight: 200;
`;

/**
 * Displays the primary information about the current weather
 * @param {*} param0 
 */
const MainInfoContainer = ({
	locale,
	time,
	units
}) => {
	return (
		<Grid
			rows="2em 2em 8em 2em"
			columns="1fr 3fr"
			gridGap="16px"
		>
			<Cell row="1" col="1/span 2">
				<LocationNameText className="city-text">
					{`${locale.city},`}
				</LocationNameText>
			</Cell>
			<Cell row="2" col="1/span 2">
				<LocationNameText className="country-text">
					{get(COUNTRY_CODES, locale.country)}
				</LocationNameText>
			</Cell>
			<IconCell row="3/span 2">
				{getIconForKeyword(locale.descriptions[0], time)}
			</IconCell>
			<Cell row="3" col="2">
				<TemperatureText className="temperature-text">
					{`${locale.temperature} ${units.temperature}`}
				</TemperatureText>
			</Cell>
			<Cell row="4" col="2">
				<FeelsLikeText className="feels-like-text">
					{`/ feels like ${locale.feelsLike} ${units.temperature}`}
				</FeelsLikeText>
			</Cell>
		</Grid>
	)
};

export default MainInfoContainer;