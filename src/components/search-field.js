import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Grid, Cell } from "../layout/grid-items";

const InputContainer = styled(Grid)`
	grid-gap: 0;
	width: 100%;
	height: 100%;
`;

const SearchBar = styled.input.attrs({ type: "text" })`
	position: relative;
	top: 50%;
	transform: translateY(-60%);
	background-color: rgba(255, 255, 255, 0.1);
	border: 2px solid rgba(255, 255, 255, 0.7);
	border-right: none;
	border-radius: 18px 0px 0px 18px;
	padding: 0.25em;
	padding-left: 1em;
	top: 50%;
	transform: translateY(-50%);
	height: 21px;
	color: rgb(255, 255, 255);
`;

const SearchButton = styled.div`
	border: 2px solid rgba(255, 255, 255, 0.7);
	border-radius: 0px 18px 18px 0px;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
	height: 20px;
	padding: 0.25em;
	padding-right: .5em;
	background-color: rgba(255, 255, 255, 0.1);
	cursor: pointer;

	.search-icon {
		top: 50%;
		transform: translateY(-50%);
		position: relative;
	}
`;

export default ({
	onSubmit,
}) => {
	const [ text, setText ] = React.useState("");

	const handleInput = (evt) => {
		setText(evt.target.value);
	}

	const handleKeyUp = ({ key }) => {
		if (key === "Enter") {
			console.log(text);
		 	onSubmit(text);
		}
	}

	return(
		<InputContainer columns="6fr 1fr">
			<Cell>
				<SearchBar
					placeholder="New York, New York"
					onInput={handleInput}
					onKeyUp={handleKeyUp}
					onSubmit={() => onSubmit(text)}
				/>
			</Cell>
			<Cell col="2">
				<SearchButton>
					<Icon icon="search" className="search-icon" onClick={() => onSubmit(text)} />
				</SearchButton>
			</Cell>
		</InputContainer>
	)
}