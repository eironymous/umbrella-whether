import React from "react";
import styled from "styled-components";
import { findKey, has, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Online, Offline } from "react-detect-offline";
import { Grid, Cell } from "./grid-items";
import SearchField from "../components/search-field";
import { updateRoute } from "../state/router-slice";
import { selectLocales, setLocales, mergeLocales } from "../state/locales-slice";
import { selectUnits, setUnits } from "../state/app-settings-slice";
import { parseResults } from "../app/manage-query-results";
import { fetchWeather, fetchUpdates } from "../app/fetch-weather-for-locale";
import { getLocaleByCity } from "../app/locale-list-tools";
import Tooltip from "../components/tooltip";
import * as CONSTANTS from "../app/constants";

const { isArray } = Array;

const Header = styled(Grid)`
	width: 100%;
	padding-left: 2em;
	background-color: #4A4E69;
	grid-gap: 10px;
	height: 60px;
`;

const HeaderCell = styled(Cell)`
	line-height: 60px;
	font-size: 1em;
`;

const ScaleButton = styled.div`
	position: relative;
	right: -90%;
	top: 50%;
	transform: translateY(-50%);

	text-align: center;
	font-weight: 800;
	line-height: 40px;
	opacity: 0.7;
	cursor: pointer;
	border: 2px solid rgba(255, 255, 255, 0.7);
	border-radius: 10px;

	width: 40px;
	height: 40px;
	user-select: none;

	:hover {
		opacity: 1;
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

/**
 * Processes search strings.
 * Makes a few assumptions:
 * 	- That the first search term is a city/location name
 * 	- That any subsequent search terms are separated from the first by a comma.
 * 
 * @param {String} val 
 */
const processSearchTerms = (val) => {
	const values = val.trim().split(",");

	let searchString = "";

	if (isArray(values) && values.length > 1) {
		searchString = values[0];

		values.forEach((value) => {
			//Check to see if the current value is a state or country for which a code is available
			const current = findKey(CONSTANTS.COUNTRY_CODES, (item) => item.localeCompare(value.trim()) === 0) || get(CONSTANTS.STATE_CODES, value.trim());

			const alreadyCode = has(CONSTANTS.COUNTRY_CODES, value.trim());

			if (current !== undefined) {
				searchString = `${searchString},${current}`;
			} else if (alreadyCode) {
				searchString = `${searchString},${value}`;
			}
		});
	} else {
		searchString = val;
	}

	return searchString;
}

export default () => {
	const dispatch = useDispatch();
	const allLocales = useSelector(selectLocales);
	const searchRef = React.useRef();
	const scale = useSelector(selectUnits);

	const [ responseReceived, setResponseReceived ] = React.useState(false);
	const [ city, setCity ] = React.useState("");
	const [ tooltip, setTooltip ] = React.useState({
		show: false,
		x: 0,
		y: 0,
	});

	//Once the new city has been added to the list, or upon receipt of an error, redirect
	React.useEffect(() => {
		if (responseReceived) {
			let newLocale = {};

			try {
				newLocale = getLocaleByCity(allLocales.locales, city);
			} catch (err) {
				console.log(err);
				//Redirect to error page
			} finally {
				if (newLocale !== undefined) {
					dispatch(updateRoute(`details-${newLocale.id}`));
				} else {
					//Redirect to error page
				}
			}
		}

	}, [allLocales, responseReceived, dispatch, city]);

	const handleUnitChange = async () => {
		if (scale.localeCompare(CONSTANTS.METRIC_SCALE) === 0) {
			dispatch(setUnits(CONSTANTS.FAHRENHEIT_SCALE));

			if (allLocales.locales.length) {
				const copy = [...allLocales.locales];
				const newList = await fetchUpdates(copy, CONSTANTS.FAHRENHEIT_SCALE);
				const parsed = [];

				newList.forEach((result) => {
					parsed.push(parseResults(result, CONSTANTS.FAHRENHEIT_SCALE));
				});

				dispatch(mergeLocales(parsed));
			}
		} else {
			dispatch(setUnits(CONSTANTS.METRIC_SCALE));

			if(allLocales.locales.length) {
				const copy = [...allLocales.locales];

				const newList = await fetchUpdates(copy, CONSTANTS.METRIC_SCALE);
				const parsed = [];

				newList.forEach((result) => {
					parsed.push(parseResults(result, CONSTANTS.METRIC_SCALE));
				});

				dispatch(mergeLocales(parsed));
			}
		}
	}

	const handleSubmit = async (val) => {
		//Process input
		const searchString = processSearchTerms(val);

		const getWeather = async () => {
			const result = await fetchWeather(searchString);
			return parseResults(result, scale);
		}
		
		const response = await getWeather();

		if (response === undefined) {
			if (searchRef.current) {
				setTooltip({
					show: true,
					x: searchRef.current.getBoundingClientRect().right - 100,
					y: searchRef.current.getBoundingClientRect().bottom
				});

				setTimeout(() => setTooltip({
					...tooltip,
					show: false
				}), 5000);
			}
			return;
		}

		setCity(response.city);
		setResponseReceived(true);

		if (allLocales.locales.length) {
			dispatch(mergeLocales([response]));
		} else {
			dispatch(setLocales([response]));
		}
	};

	const handleSubmitWhenOffline = () => {
		if (searchRef.current) {
			setTooltip({
				show: true,
				x: searchRef.current.getBoundingClientRect().right - 100,
				y: searchRef.current.getBoundingClientRect().bottom
			});

			setTimeout(() => setTooltip({
				...tooltip,
				show: false
			}), 5000);
		}
	}

	return(
		<Header rows="60px" columns="0fr 0fr 1fr">
			<Online>
				<Tooltip
					show={tooltip.show}
					x={tooltip.x}
					y={tooltip.y}
					text="Your search returned no results! :( Please try again."
				/>
			</Online>
			<Offline>
				<Tooltip
					show={tooltip.show}
					x={tooltip.x}
					y={tooltip.y}
					text="Search function is not available when you're offline! :( Check your network connection and try again."
				/>
			</Offline>
			<HeaderCell>
				Search:
			</HeaderCell>
			<Cell col="2">
				<Online>
					<SearchField onSubmit={handleSubmit} searchRef={searchRef}  />
				</Online>
				<Offline>
					<SearchField onSubmit={handleSubmitWhenOffline} searchRef={searchRef} />
				</Offline>
			</Cell>
			<HeaderCell col="3">
				<Online>
					<ScaleButton onClick={handleUnitChange}>
						{scale.localeCompare(CONSTANTS.METRIC_SCALE) === 0 ? "°C" : "°F"}
					</ScaleButton>
				</Online>
			</HeaderCell>
		</Header>
	)
}