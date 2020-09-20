import React from "react";
import { Offline, Online } from "react-detect-offline";
import Layout from "../../layout/navbar-layout";
import Table from "./home-body";
import { parseResults } from "../../app/manage-query-results";
import { fetchList } from "../../app/fetch-weather-for-locale";
import { setLocales, mergeLocales, selectLocales } from "../../state/locales-slice";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherItem } from "../../app/weather-item";

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

const testWeatherItem = getWeatherItem(
	1,
	false,
	"New York",
	"United States of America",
	"2019-09-07 08:14",
	"12:14 PM",
	13,
	"m",
	"https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
	["Sunny"],
	0,
	"N",
	0,
	0,
	90,
	0,
	13,
	4,
	16
);

const Body = () => {
	const dispatch = useDispatch();
	const [ loaded, setLoaded ] = React.useState(false);

	const storedLocales = useSelector(selectLocales);

	React.useEffect(() => {
		const getWeatherList = async () => {
			const result = await fetchList(defaultQueries);

			//Generate and populate list of fresh results
			const newList = [];
			result.forEach((res) => newList.push(parseResults(res)));

			dispatch(mergeLocales(newList));

			setLoaded(true);
		}

		//getWeatherList();
		setLoaded(true);
		
	}, []);

	return (
		<>
			{(Online) &&
				<Table items={storedLocales.locales || testWeatherItem} loaded={loaded} />
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