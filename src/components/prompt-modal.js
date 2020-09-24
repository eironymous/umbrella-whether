import React from "react";
import styled from "styled-components";
import Card from "../layout/card";
import { Grid, Cell } from "../layout/grid-items";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"

const ConfirmButton = styled(Grid)`
	background-color: rgba(255, 255, 255, 0.7);
	color: #4A4E69;
	grid-template-rows: min-content;
	grid-template-columns: 1fr 4fr;
	border-radius: 18px;

	:hover {
		background-color: rgb(255, 255, 255);
	}
`;

const CancelButton = styled(Grid)`
	grid-template-rows: min-content;
	grid-template-columns: 1fr 4fr;
	border-radius: 18px;
	color: rgba(255, 255, 255, 0.7);
	border: 1px solid rgba(255, 255, 0.7);

	:hover {
		color: rgb(255, 255, 255);
		border-color: rgb(255, 255, 255);
	}

`;

const Parent = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.1);
	z-index: 300;
`;

const Prompt = styled(Card)`
	position: fixed;
	z-index: 30;
	top: 50%;
	right: 50%;
	transform: translateX(-50%) translateY(-50%);
	background-color: #4A4E69;
	width: 300px;
	height: 300px;
`;

const PromptCell = styled(Cell)`
	border-bottom: 1px solid rgba(255, 255, 255, 0.6);
`;

const PromptModal = ({
	header,
	text,
	onConfirm,
	onCancel
}) => {
	return (
		<Parent>
			<Prompt>
				<Grid rows="3em min-content 4em" columns="1fr 1fr">
					<PromptCell col="1/span 2">
						<h2 className="header-text">{header}</h2>
					</PromptCell>
					<PromptCell row="2" col="1/span 2" className="body-text">
						{text}
					</PromptCell>
					<Cell row="3" col="1">
						<ConfirmButton>
							<ConfirmButton onClick={onConfirm}>
								<Cell>
									<Icon icon="check" />
								</Cell>
								<Cell col="2">
									Confirm
								</Cell>
							</ConfirmButton>
						</ConfirmButton>
					</Cell>
					<Cell row="3" col="2">
						<CancelButton onClick={onCancel}>
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