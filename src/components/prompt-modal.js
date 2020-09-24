import React from "react";
import styled from "styled-components";
import Card from "../layout/card";
import { Grid, Cell } from "../layout/grid-items";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"

const ConfirmButton = styled(Grid)`
	background: rgba(255, 255, 255, 0.7);
	color: #4A4E69;
	grid-template-rows: min-content;
	grid-template-columns: 1fr 4fr;
	border-radius: 18px;
	border-color: rgba(255, 255, 255, 0.7);
	height: min-content;
	width: min-content;
	padding: 1em;
	cursor: pointer;
	grid-gap: 10px;

	position: relative;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);

	:hover {
		background: rgb(255, 255, 255);
	}
`;

const CancelButton = styled(Grid)`
	grid-template-rows: min-content;
	grid-template-columns: 1fr 4fr;
	border-radius: 18px;
	color: rgba(255, 255, 255, 0.7);
	border: 1px solid rgba(255, 255, 255, 0.7);
	height: min-content;
	width: min-content;
	padding: 1em;
	cursor: pointer;
	grid-gap: 10px;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);

	:hover {
		color: rgb(255, 255, 255);
		border-color: rgb(255, 255, 255);
	}
`;

const Parent = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	width: 100vw;
	height: 100vh;
	z-index: 300;
	visibility: ${p => p.visible ? "visible": "hidden"};
`;

const Prompt = styled(Card)`
	position: fixed;
	z-index: 30;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	background-color: #4A4E69;
	width: 400px;
	height: 300px;
`;

const PromptCell = styled(Cell)`
	border-bottom: 1px solid rgba(255, 255, 255, 0.6);
	padding: 1em;
`;

const PromptModal = ({
	header,
	text,
	onConfirm,
	onCancel,
	visible,
}) => {
	return (
		<Parent visible={visible}>
			<Prompt>
				<Grid rows="min-content min-content auto" columns="1fr 1fr">
					<PromptCell col="1/span 2">
						<h2>{header}</h2>
					</PromptCell>
					<PromptCell row="2" col="1/span 2" className="body-text">
						{text}
					</PromptCell>
					<Cell row="3" col="1">
						<ConfirmButton className="confirm-button" onClick={onConfirm}>
							<Cell>
								<Icon icon="check" />
							</Cell>
							<Cell col="2">
								Confirm
							</Cell>
						</ConfirmButton>
					</Cell>
					<Cell style={{padding: "1em"}} row="3" col="2">
						<CancelButton className="cancel-button" onClick={onCancel}>
							<Cell>
								<Icon icon="times" />
							</Cell>
							<Cell col="2">
								Cancel
							</Cell>
						</CancelButton>
					</Cell>
				</Grid>
			</Prompt>
		</Parent>
	)
}

export default PromptModal;