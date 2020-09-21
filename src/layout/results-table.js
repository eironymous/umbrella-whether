import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateRoute } from "../state/router-slice";
import { setFavorite, deleteById } from "../state/locales-slice";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Grid, Cell } from "./grid-items";
import Card from "./card";
import { FAHRENHEIT_SCALE, METRIC_SCALE, SCIENTIFIC_SCALE } from "../app/constants";


const ListEntryCard = styled(Card)`
	position: relative;
	background-color: #4A4E69;
	height: auto;
	text-align: left;
	user-select: none;
	width: 90%;
	left: 50%;
	transform: translateX(-50%);
`;

const CityCell = styled(Cell)`
	font-weight: 600;
	opacity: 0.7;
	cursor: pointer;
	:hover {
		opacity: 1;
	}
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const TempCell = styled(Cell)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: left;
	padding-left: 1em;
`;

/**
 * Parses the unit marker associated with a weatherstack request and returns a relevant temperature unit.
 * 
 * @param {String} scale - The scale marker associated with a request to weatherstack.
 */
const getUnits = (scale) => {
	switch (true) {
		case scale === FAHRENHEIT_SCALE:
			return "F";
		case scale === METRIC_SCALE:
			return "C";
		case scale === SCIENTIFIC_SCALE:
			return "K";
		default:
			return "C";
	}
}

/**
 * Defines a single list entry in a table of weather results.
 * Takes a WeatherEntryItem and a row number. 
 */
const ListEntry = ({ entry, row, items }) => {
	const dispatch = useDispatch();

	if (entry === undefined) return null;

	const units = getUnits(entry.scale);
	const time = entry.localTime ? entry.localTime.split(" ")[1] : "Unknown Time";

	return (
		<Cell row={row}>
			<ListEntryCard>
				<Grid columns="1fr 4fr 4fr 6fr" rows="1.2em">
					<CityCell onClick={() => dispatch(updateRoute(`details-${entry.id}`))}>
						<Icon icon={["far", "eye"]} />
					</CityCell>
					<CityCell col="2" onClick={() => dispatch(updateRoute(`details-${entry.id}`))}>
						<span>{`${entry.city} - ${entry.country}`}</span>
					</CityCell>
					<TempCell col="3">
						{`${entry.temperature} °${units} at ${time} UTC ${entry.utcOffset}`}
					</TempCell>
					<Cell col="4">
						{entry.favorited &&
							<Icon icon="heart" onClick={() => dispatch(setFavorite({ id: entry.id, favorite: false, allLocales: items }))}/>
						}
						{!entry.favorited &&
							<Icon icon={["far", "heart"]} onClick={() => dispatch(setFavorite({ id: entry.id, favorite: true, allLocales: items }))} />
						}
					</Cell>
					<Cell col="5">
						<Icon 
							icon="minus-circle" 
							onClick={() => dispatch(deleteById({ id: entry.id, allLocales: items }))} 
							style={{ cursor: "pointer" }}
						/>
					</Cell>
				</Grid>
			</ListEntryCard>
		</Cell>
	)
};

const Table = ({
	items,
}) => {

	if (items === undefined || !items.length) return null;

	return(
		<Grid columns="1fr" rows={`repeat(${items.length}, 3em)`} gridGap="10px">
			{items.map((entry, idx) => {
				return (<ListEntry entry={entry} key={`weather-list-entry-${entry.id}:${idx}`} row={idx + 1} items={items} />);
			})}
		</Grid>
	)
}

export default Table;