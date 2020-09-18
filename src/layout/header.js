import React from "react";
import styled from "styled-components";
import { noop }from "lodash";
import { Grid, Cell } from "./grid-items";
import SearchField from "../components/search-field";

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

export default ({
	onSubmit = noop,
}) => {
	const onInput = noop;

	return(
		<Header rows="60px" columns="0fr 0fr 1fr">
			<HeaderCell>
				Search:
			</HeaderCell>
			<Cell col="2">
				<SearchField />
			</Cell>
			<Cell col="3">
				
			</Cell>
		</Header>
	)
}