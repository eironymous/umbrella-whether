import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateRoute } from "../state/router-slice";
import { deleteByLocale } from "../state/notes-slice";
import { setFavorite, deleteById } from "../state/locales-slice";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Grid, Cell } from "./grid-items";
import Card from "./card";
import { FAHRENHEIT_SCALE, METRIC_SCALE, SCIENTIFIC_SCALE } from "../app/constants";
import Tooltip from "../components/tooltip";

const ListEntryCard = styled(Card)`
	position: relative;
	background-color: #4A4E69;
	height: auto;
	text-align: left;
	user-select: none;
	width: 98%;
	min-width: 700px;
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
	letter-spacing: 1px;
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
const ListEntry = ({ entry, row, items, state, setState }) => {
	const dispatch = useDispatch();

	if (entry === undefined) return null;

	const units = getUnits(entry.scale);
	const time = entry.localTime ? entry.localTime.split(" ")[1] : "Unknown Time";

	const onDeleteEntry = () => {
		//Delete the entry...
		dispatch(deleteById({ id: entry.id, allLocales: items }));
		//...and any associated notes
		dispatch((state) => deleteByLocale(state, entry.id));
	};

	const showHeartTooltip = (evt) => {
		setState({
			...state,
			activeHeartTooltip: {
				id: entry.id,
				x: evt.target.getBoundingClientRect().right,
				y: evt.target.getBoundingClientRect().top - 20
			}
		});
	};

	const showDeleteTooltip = (evt) => {
		setState({
			...state,
			activeDeleteTooltip: {
				id: entry.id,
				x: evt.target.getBoundingClientRect().right,
				y: evt.target.getBoundingClientRect().top - 20
			}
		});
	};

	const showEyeTooltip = (evt) => {
		setState({
			...state,
			activeEyeTooltip: {
				id: entry.id,
				x: evt.target.getBoundingClientRect().right,
				y: evt.target.getBoundingClientRect().top - 20
			}
		});
	};

	const hideAllTooltips = () => {
		setState({
			activeHeartTooltip: {
				...state.activeHeartTooltip,
				id: -1
			},
			activeEyeTooltip: {
				...state.activeEyeTooltip,
				id: -1
			},
			activeDeleteTooltip: {
				...state.activeDeleteTooltip,
				id: -1
			}
		});
	};

	return (
		<>
		<Tooltip 
				show={entry.id.localeCompare(state.activeHeartTooltip.id) === 0} 
				text={entry.favorited ? "Remove favorite" : "Add favorite"}
				x={state.activeHeartTooltip.x}
				y={state.activeHeartTooltip.y}
			/>
			<Tooltip
				show={entry.id.localeCompare(state.activeEyeTooltip.id) === 0}
				text={"View details"}
				x={state.activeEyeTooltip.x}
				y={state.activeEyeTooltip.y}
			/>
			<Tooltip
				show={entry.id.localeCompare(state.activeDeleteTooltip.id) === 0}
				text={"Delete"}
				x={state.activeDeleteTooltip.x}
				y={state.activeDeleteTooltip.y}
			/>
		<Cell row={row}>
			<ListEntryCard>
				<Grid columns="1fr 4fr 4fr 6fr" rows="1.2em">
					<CityCell onClick={() => dispatch(updateRoute(`details-${entry.id}`))}>
						<Icon 
							icon={["far", "eye"]}
							onMouseOver={showEyeTooltip}
							onMouseOut={hideAllTooltips}
						/>
					</CityCell>
					<CityCell col="2" onClick={() => dispatch(updateRoute(`details-${entry.id}`))}>
							<span onMouseOver={showEyeTooltip} onMouseOut={hideAllTooltips}>{`${entry.city} - ${entry.country}`}</span>
					</CityCell>
					<TempCell col="3">
							<strong>{`${entry.temperature} °${units}`}</strong> {`at`} <strong>{time}</strong> {`UTC ${entry.utcOffset}`}
					</TempCell>
					<CityCell col="4">
						{entry.favorited &&
							<Icon 
								icon="heart" 
								onMouseOver={showHeartTooltip}
								onMouseOut={hideAllTooltips}
								onClick={() => dispatch(setFavorite({ id: entry.id, favorite: false, allLocales: items }))}
							/>
						}
						{!entry.favorited &&
							<Icon 
								icon={["far", "heart"]} 
								onMouseOver={showHeartTooltip}
								onMouseOut={hideAllTooltips}
								onClick={() => dispatch(setFavorite({ id: entry.id, favorite: true, allLocales: items }))} 
							/>
						}
					</CityCell>
					<CityCell col="5">
						<Icon 
							icon="minus-circle" 
							onMouseOver={showDeleteTooltip}
							onMouseOut={hideAllTooltips}
							onClick={onDeleteEntry} 
							style={{ cursor: "pointer" }}
						/>
					</CityCell>
				</Grid>
			</ListEntryCard>
		</Cell>
		</>
	)
};

const Table = ({
	items,
}) => {
	const [ state, setState ] = React.useState({
		activeHeartTooltip: {
			id: -1,
			x: 0,
			y: 0,
		},
		activeEyeTooltip: {
			id: -1,
			x: 0,
			y: 0,
		},
		activeDeleteTooltip: {
			id: -1,
			x: 0,
			y: 0,
		}
	});

	if (items === undefined || !items.length) return null;

	return(
		<Grid columns="1fr" rows={`repeat(${items.length}, 3em)`} gridGap="10px">
			{items.map((entry, idx) => {
				return (<ListEntry entry={entry} key={`weather-list-entry-${entry.id}:${idx}`} row={idx + 1} items={items} state={state} setState={setState} />);
			})}
		</Grid>
	)
}

export default Table;