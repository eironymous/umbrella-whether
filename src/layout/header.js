import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Online, Offline } from "react-detect-offline";
import { Grid, Cell } from "./grid-items";
import SearchField from "../components/search-field";
import { updateRoute } from "../state/router-slice";
import { selectLocales, setLocales, mergeLocales } from "../state/locales-slice";
import { parseResults } from "../app/manage-query-results";
import { fetchWeather } from "../app/fetch-weather-for-locale";
import { getLocaleByCity } from "../app/locale-list-tools";

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

export default () => {
	const dispatch = useDispatch();
	const allLocales = useSelector(selectLocales);

	const [ responseReceived, setResponseReceived ] = React.useState(false);
	const [ city, setCity ] = React.useState("");

	//Once the new city has been added to the list, or upon receipt of an error, redirect
	React.useEffect(() => {
		if (responseReceived) {
			let newLocale = {};

			try {
				newLocale = getLocaleByCity(allLocales.locales, city);
				console.log(allLocales, city);
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

	const handleSubmit = async (val) => {
		const getWeather = async () => {
			const result = await fetchWeather(val);
			console.log(result);
			return parseResults(result);
		}
		
		const response = await getWeather(val);

		if (response.error) {
			//Redirect to error page
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

	}

	return(
		<Header rows="60px" columns="0fr 0fr 1fr">
			<HeaderCell>
				Search:
			</HeaderCell>
			<Cell col="2">
				<Online>
					<SearchField onSubmit={handleSubmit} />
				</Online>
				<Offline>
					<SearchField onSubmit={handleSubmitWhenOffline} />
				</Offline>
			</Cell>
			<Cell col="3">
				
			</Cell>
		</Header>
	)
}