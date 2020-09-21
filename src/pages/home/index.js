import React from "react";
import { Offline, Online } from "react-detect-offline";
import Layout from "../../layout/navbar-layout";
import Table from "./home-body";
import { parseResults } from "../../app/manage-query-results";
import { fetchList } from "../../app/fetch-weather-for-locale";
import { setLocales, mergeLocales, selectLocales } from "../../state/locales-slice";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherItem } from "../../app/weather-item";
import EmptyState from "./empty-state";

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

			if (storedLocales.locales.length) {
				dispatch(mergeLocales(newList));
			} else {
				dispatch(setLocales(newList));
			}

			setLoaded(true);
		}

		//getWeatherList();
		setLoaded(true);
		
	}, [storedLocales.locales.length, dispatch]);

	if (storedLocales.locales === undefined || storedLocales.locales.length === 0) {
		return <EmptyState />
	}

	return (
		<Table items={storedLocales.locales } loaded={loaded} />
	)
}

const OfflineBody = () => {
	const storedLocales = useSelector(selectLocales);

	if (storedLocales.locales === undefined || storedLocales.locales.length === 0) {
		return <EmptyState />
	}

	return (
		<Table items={storedLocales.locales} />
	)
}

export default ({ activeRoute, allRoutes }) => {
	return(
		<>
			<Online>
				<Layout 
					Main={Body}
					activeRoute={activeRoute}
					allRoutes={allRoutes}
				/>
			</Online>
			<Offline>
				<Layout 
					Main={OfflineBody}
					activeRoute={activeRoute}
					allRoutes={allRoutes}
				/>
			</Offline>
		</>
	)
}