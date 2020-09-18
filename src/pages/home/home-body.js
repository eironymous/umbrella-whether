import React from "react";
import styled from "styled-components";
import { Grid, Cell } from "../../layout/grid-items";
import { WeatherItem, CurrentWeatherItem } from "../../app/weather-item";
import Card from "../../layout/card";
import { FAHRENHEIT_SCALE, METRIC_SCALE, SCIENTIFIC_SCALE } from "../../app/constants";

const Body = styled(Grid)`
	padding: 2em;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	min-width: 500px;
`;

const ListCell = styled(Cell)`
	overflow-y: auto;

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
const ListEntry = ({ entry, row }) => {
	if (entry === undefined || !(entry instanceof WeatherItem)) return null;

	const units = getUnits(entry.currentWeather.scale);
	console.log("entry:", entry);
	
	return(
		<Cell row={row}>
			<ListEntryCard>
				<Grid columns="1fr 4fr 4fr 6fr" rows="1em">
					<Cell>

					</Cell>
					<Cell col="2">
						{`${entry.city} - ${entry.country}`}
					</Cell>
					<Cell col="3">
						{`${entry.currentWeather.temperature} °${units} at ${entry.currentWeather.observationTime}`}
					</Cell>
					<Cell col="4">

					</Cell>
				</Grid>
			</ListEntryCard>
		</Cell>
	)
}

const HomeList = ({
	items = [],
	loaded
}) => {
	console.log("items:", items, "items length:",);
	const [ list, setList ] = React.useState(items);

	const updateList = () => {
		let newList = [];

		if (items.length) {
			items.forEach((item) => {
				console.log("item: ", item);
				newList.push(item);
			});

			setList(newList);
		}
	}

	React.useEffect(() => {
		updateList();
	}, [items]);

	if (!items) return null;

	return(
		<Body rows="2em 80vh" columns="1fr">
			<Cell>
				Some Text Here:
			</Cell>
			<ListCell row="2">
				{loaded && 
					<Grid columns="1fr" rows={`repeat(${list.length}, 3em)`} gridGap="10px">
						{list.map((entry, idx) => {
							return(<ListEntry entry={entry} key={`weather-list-entry-${entry.id}:${idx}`} row={idx + 1} />);
						})}
					</Grid>
				}
				{!loaded &&
					<span>Please wait while we poke our heads outside...</span>
				}
			</ListCell>
		</Body>
	)
}

export default HomeList;