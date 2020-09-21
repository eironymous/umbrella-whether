import React from "react";
import { Offline, Online } from "react-detect-offline";
import Layout from "../../layout/navbar-layout";
import Table from "./home-body";
import { parseResults } from "../../app/manage-query-results";
import { fetchList, fetchUpdates } from "../../app/fetch-weather-for-locale";
import { setLocales, mergeLocales, selectLocales } from "../../state/locales-slice";
import { setNotes } from "../../state/notes-slice";
import { selectFirstVisit, selectUnits, setFirstVisit } from "../../state/app-settings-slice";
import { useDispatch, useSelector } from "react-redux";
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
	"Sao Paulo",
	"Shanghai",
	"Tokyo"
];

const Body = () => {
	const dispatch = useDispatch();
	const [ loaded, setLoaded ] = React.useState(false);

	const storedLocales = useSelector(selectLocales);
	const firstVisit = useSelector(selectFirstVisit);
	const units = useSelector(selectUnits);

	React.useEffect(() => {
		const getWeatherList = async () => {
			let result = [];

			//If first visit, use default query list, else update existing list
			if (firstVisit) {
				result = await fetchList(defaultQueries, units);
				dispatch(setFirstVisit(false));
			} else if (!firstVisit && storedLocales.locales.length) {
				result = await fetchUpdates(storedLocales.locales, units);
			}

			//Generate and populate list of fresh results
			const newList = [];

			if (result.length) {
				result.forEach((res) => newList.push(parseResults(res)));
			}

			if (storedLocales.locales.length) {
				dispatch(mergeLocales(newList));
			} else {
				dispatch(setLocales(newList));
				//Clear out notes, just in case
				dispatch(setNotes([]));
			}

			setLoaded(true);
		}

		getWeatherList();
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