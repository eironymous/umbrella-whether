import React from "react";
import { Offline, Online } from "react-detect-offline";
import Layout from "../../layout/navbar-layout";
import Table from "./home-body";
import { parseResults } from "../../app/manage-query-results";
import { fetchList, fetchUpdates, getWeatherByCoordinates } from "../../app/fetch-weather-for-locale";
import { setLocales, mergeLocales, selectLocales, selectLocaleByCity } from "../../state/locales-slice";
import { setNotes } from "../../state/notes-slice";
import { updateRoute } from "../../state/router-slice";
import { selectFirstVisit, selectUnits, setUnits, setFirstVisit } from "../../state/app-settings-slice";
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
	const [ geolocation, setGeolocation ] = React.useState(undefined);

	const storedLocales = useSelector(selectLocales);
	const firstVisit = useSelector(selectFirstVisit);
	const units = useSelector(selectUnits);

	const queryPermissions = () => {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			console.log(result)
			if (result.state === "granted") {
				setGeolocation(result.state);
			} else if (result.state === "prompt") {
				setGeolocation(result.state);
			} else {
				setGeolocation(result.state);
			}

			result.onchange = () => {
				setGeolocation(result.state);
			}
		})
	};

	const getWeatherByGeolocation = async (location) => {

		try {
			const lat = location.coords.latitude;
			const long = location.coords.longitude;

			const result = await getWeatherByCoordinates(lat, long, units);
			const parsed = parseResults(result, units);
			await dispatch(mergeLocales([ parsed ]));

			//If the city already exists in the store, use the extant id for the redirect
			let match = undefined;
			
			for (let i = 0; i < storedLocales.locales.length; i++) {
				if (storedLocales.locales[i].city.localeCompare(parsed.city) === 0) {
					match = storedLocales.locales[i];
				}
			}

			dispatch(updateRoute(`details-${match !== undefined ? match.id : parsed.id}`));
		} catch (error) {
			console.log(error);
		}
	}

	React.useEffect(() => {
		if (firstVisit && geolocation !== undefined) {
			if (geolocation === "granted") {
				navigator.geolocation.getCurrentPosition(getWeatherByGeolocation, (error) => console.log(error));
			} else if (geolocation === "prompt") {
				navigator.geolocation.getCurrentPosition(getWeatherByGeolocation, (error) => console.log(error));
			}
		}
	}, [geolocation]);

	React.useEffect(() => {
		const getWeatherList = async () => {
			let result = [];

			if (firstVisit) {
				queryPermissions();
			}

			//If first visit, use default query list, else update existing list
			try {
				if (firstVisit) {
					result = await fetchList(defaultQueries, units);
					dispatch(setFirstVisit(false));
				} else if (!firstVisit && storedLocales.locales.length) {
					result = await fetchUpdates(storedLocales.locales, units);
				}
			} catch (error) {
				console.log(error);
			}

			//Generate and populate list of fresh results
			const newList = [];

			if (result.length) {
				result.forEach((res) => newList.push(parseResults(res, units)));
			}

			if (storedLocales.locales.length) {
				//Merge the new results with the existing ones
				dispatch(mergeLocales(newList));
			} else {
				dispatch(setLocales(newList));
				//Clear out notes, just in case
				dispatch(setNotes([]));
			}

			setLoaded(true);
		}

		getWeatherList();
		
	}, []);

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