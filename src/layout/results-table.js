import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setFavorite } from "../state/locales-slice";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Grid, Cell } from "./grid-items";
import Card from "./card";
import { FAHRENHEIT_SCALE, METRIC_SCALE, SCIENTIFIC_SCALE } from "../app/constants";
import { reorderByFavorite } from "../app/locale-list-tools";


const ListEntryCard = styled(Card)`
	position: relative;
	background-color: #4A4E69;
	height: auto;
	text-overflow: ellipsis;
	white-space: nowrap; 
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

	return (
		<Cell row={row}>
			<ListEntryCard>
				<Grid columns="1fr 4fr 4fr 6fr" rows="1em">
					<Cell>
						<Icon icon={["far", "eye"]} />
					</Cell>
					<CityCell col="2">
						{`${entry.city} - ${entry.country}`}
					</CityCell>
					<Cell col="3">
						{`${entry.temperature} °${units} at ${entry.observationTime} UTC`}
					</Cell>
					<Cell col="4">
						{entry.favorited &&
							<Icon icon="heart" onClick={() => dispatch(setFavorite({ id: entry.id, favorite: false, allLocales: items }))}/>
						}
						{!entry.favorited &&
							<Icon icon={["far", "heart"]} onClick={() => dispatch(setFavorite({ id: entry.id, favorite: true, allLocales: items }))} />
						}
					</Cell>
					<Cell col="5">
						<Icon icon="minus-circle" />
					</Cell>
				</Grid>
			</ListEntryCard>
		</Cell>
	)
};

const Table = ({
	items
}) => {
	const [ list, setList ] = React.useState(items);

	React.useEffect(() => {
		const favsFirst = reorderByFavorite(items);
		setList(favsFirst);
	}, [items]);

	if (items === undefined || !items.length) return null;

	return(
		<Grid columns="1fr" rows={`repeat(${list.length}, 3em)`} gridGap="10px">
			{list.map((entry, idx) => {
				return (<ListEntry entry={entry} key={`weather-list-entry-${entry.id}:${idx}`} row={idx + 1} items={items} />);
			})}
		</Grid>
	)
}

export default Table;