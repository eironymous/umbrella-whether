import React from "react";
import { Offline, Online } from "react-detect-offline";
import Layout from "../../layout/navbar-layout";
import { Grid, Cell } from "../../layout/grid-items";
import Table from "./home-body";
import { parseResults } from "../../app/manage-query-results";
import { fetchWeather, fetchList } from "../../app/fetch-weather-for-locale";

import { WeatherItem, CurrentWeatherItem } from "../../app/weather-item";

const defaultQueries = [
	"Beijing",
	"Buenos Aires",
	"Cairo",
	"Chongqing",
	"Delhi",
	"Dhaka",
	"Istanbul",
	"Karachi",
	"Mexico City",
	"Mumbai",
	"New York",
	"Osaka",
	"Sao Paolo",
	"Shanghai",
	"Tokyo"
];

const queryList = "Beijing";

const testDetails = new CurrentWeatherItem(
	"12:14 PM",
	13,
	"m",
	"https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
	["Sunny"],
	0,
	"N",
	0,
	90,
	0,
	13,
	4,
	16
);

const testWeatherItem = new WeatherItem(
	1,
	"New York",
	"United States of America",
	"2019-09-07 08:14",
	testDetails
);

const Body = () => {
	const [ list, setList ] = React.useState([]);
	const [ loaded, setLoaded ] = React.useState(false);

	React.useEffect(() => {
		const getWeatherList = async () => {
			const result = await fetchList(defaultQueries);
			const newList = [];
			result.forEach((res) => newList.push(parseResults(res)));
			setList(newList);
			setLoaded(true);
		}

		getWeatherList();
		
	}, []);

	return (
		<>
			{(Online) &&
				<Table items={list} loaded={loaded} />
			}
		</>
	)
}

export default ({ activeRoute, allRoutes }) => {
	return(
		<Layout 
			Main={Body}
			activeRoute={activeRoute}
			allRoutes={allRoutes}
		/>
	)
}