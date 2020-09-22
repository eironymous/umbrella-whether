import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Cell } from "../../../layout/grid-items";
import { setFavorite, selectLocales } from "../../../state/locales-slice";
import Tooltip from "../../../components/tooltip";

const InfoLabel = styled.div`
	letter-spacing: 1px;
	text-align: right;
`;

const InfoText = styled.div`
	font-weight: 600;
	text-align: left;
`;

const HeartIconContainer = styled.div`
	position: relative;
	right: 0;
	font-size: 2em;
	cursor: pointer;
`;

/**
 * Displays more detailed information about the current weather.
 * @param {*} param0 
 */
const DetailedInfoContainer = ({
	locale,
	time,
	units
}) => {
	const dispatch = useDispatch();
	const allLocales = useSelector(selectLocales);

	const [ tooltip, setTooltip ] = React.useState({
		show: false,
		x: 0,
		y: 0,
	});

	const showTooltip = (evt) => {
		setTooltip({
			show: true,
			x: evt.target.getBoundingClientRect().left,
			y: evt.target.getBoundingClientRect().top - 20
		});
	};

	const hideTooltip = () => {
		setTooltip({
			...tooltip,
			show: false,
		});
	};

	return (
		<Grid columns="6fr 6fr 1fr" rows="repeat(9, min-content)" gridGap="10px">
			<Tooltip
				text={locale.favorited ? "Remove favorite" : "Add favorite"}
				show={tooltip.show}
				x={tooltip.x}
				y={tooltip.y}
			/>
			<Cell>
				<InfoLabel>
					Local Time:
				</InfoLabel>
			</Cell>
			<Cell col="2">
				<InfoText>
					{time}
				</InfoText>
			</Cell>
			<Cell row="1/span 2" col="3">
				<HeartIconContainer>
					{locale.favorited &&
						<Icon
							icon="heart" 
							onClick={() => dispatch(setFavorite({ id: locale.id, favorite: false, allLocales: allLocales.locales }))} 
							onMouseOver={showTooltip}
							onMouseOut={hideTooltip}
						/>
					}
					{!locale.favorited &&
						<Icon 
							icon={["far", "heart"]} 
							onClick={() => dispatch(setFavorite({ id: locale.id, favorite: true, allLocales: allLocales.locales }))} 
							onMouseOver={showTooltip}
							onMouseOut={hideTooltip}
						/>
					}
				</HeartIconContainer>
			</Cell>
			<Cell row="2">
				<InfoLabel>
					Current Weather:
				</InfoLabel>
			</Cell>
			<Cell row="2" col="2">
				<InfoText>
					{locale.descriptions.map((desc, idx) =>
						<React.Fragment key={`${desc}-${idx}`}>{desc}</React.Fragment>
					)}
				</InfoText>
			</Cell>
			<Cell row="3">
				<InfoLabel>
					Wind:
				</InfoLabel>
			</Cell>
			<Cell row="3" col="2">
				<InfoText>
					{`${locale.windDirection || 0}, ${locale.windSpeed} ${units.windSpeed}`}
				</InfoText>
			</Cell>
			<Cell row="4">
				<InfoLabel>
					Pressure:
				</InfoLabel>
			</Cell>
			<Cell row="4" col="2">
				<InfoText>
					{`${locale.pressure || 0} ${units.pressure}`}
				</InfoText>
			</Cell>
			<Cell row="5">
				<InfoLabel>
					Precipitation:
				</InfoLabel>
			</Cell>
			<Cell row="5" col="2">
				<InfoText>
					{`${locale.precipitation || 0} ${units.precip}`}
				</InfoText>
			</Cell>
			<Cell row="6">
				<InfoLabel>
					Humidity:
				</InfoLabel>
			</Cell>
			<Cell row="6" col="2">
				<InfoText>
					{`${locale.humidity || 0}%`}
				</InfoText>
			</Cell>
			<Cell row="7">
				<InfoLabel>
					Cloud Cover:
				</InfoLabel>
			</Cell>
			<Cell row="7" col="2">
				<InfoText>
					{`${locale.cloudCover || 0}%`}
				</InfoText>
			</Cell>
			<Cell row="8">
				<InfoLabel>
					UV Index:
				</InfoLabel>
			</Cell>
			<Cell row="8" col="2">
				<InfoText>
					{locale.uvIndex || 0}
				</InfoText>
			</Cell>
			<Cell row="9">
				<InfoLabel>
					Visibility:
				</InfoLabel>
			</Cell>
			<Cell row="9" col="2">
				<InfoText>
					{`${locale.visibility || 0} ${units.visibility}`}
				</InfoText>
			</Cell>
		</Grid>
	)
}

export default DetailedInfoContainer;