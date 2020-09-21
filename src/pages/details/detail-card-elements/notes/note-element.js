import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { noop } from "lodash";
import { Grid, Cell } from "../../../../layout/grid-items";
import Tooltip from "../../../../components/tooltip";

const ParentGrid = styled(Grid)`
	transition-property: width;
	transition-duration: 0.5s;
	border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

const NoteDisplay = styled.div`
	width: 100%;
	height: min-content;
	color: rgb(255, 255, 255);
	overflow: hidden;
	padding-top: .75em;
	text-align: justify;
	text-justify: auto;
	transition-property: width;
	transition-duration: 0.5s;
`;

const TimestampDisplay = styled.div`
	line-height: 1.25em;
	font-weight: 200;
	text-align: justify;
	text-justify: auto;
	font-size: 0.75em;
`;

const Button = styled.div`
	text-align: right;
	opacity: 0.7;
	line-height: 1.25em;
	font-size: 1.25em;
	cursor: pointer;

	:hover {
		opacity: 1;
	}
`;

const NoteModule = ({
	note,
	handleEditClicked = noop,
	handleDeleteClicked = noop,
}) => {
	const [ tooltip, setTooltip ] = React.useState({
		id: -1,
		x: 0,
		y: 0,
	});

	const showDeleteTooltip = (evt) => {
		setTooltip({
			id: 0,
			x: evt.target.getBoundingClientRect().left,
			y: evt.target.getBoundingClientRect().top - 20
		});
	}

	const showEditTooltip = (evt) => {
		setTooltip({
			id: 1,
			x: evt.target.getBoundingClientRect().left,
			y: evt.target.getBoundingClientRect().top - 20
		});
	}

	const hideTooltips = () => {
		setTooltip({
			...tooltip,
			id: -1
		});
	}

	if (note === undefined) return null;

	return (
		<ParentGrid rows="min-content 2em" columns="1fr 1fr 1fr">
			<Tooltip
				show={tooltip.id === 0}
				text="Delete Note"
				x={tooltip.x}
				y={tooltip.y}
			/>
			<Tooltip
				show={tooltip.id === 1}
				text="Edit Note"
				x={tooltip.x}
				y={tooltip.y}
			/>
			<Cell col="1/span 3">
				<NoteDisplay>
					{note.body}
				</NoteDisplay>
			</Cell>
			<Cell row="2">
				<TimestampDisplay>
					{note.timeStamp}
				</TimestampDisplay>
			</Cell>
			<Cell row="2" col="2">
				<Button>
					<Icon 
						icon="edit"
						onMouseOver={showEditTooltip}
						onMouseOut={hideTooltips}
						onClick={handleEditClicked}
					/>
				</Button>
			</Cell>
			<Cell row="2" col="3">
				<Button>
					<Icon
						icon="trash"
						onClick={handleDeleteClicked}
						onMouseOver={showDeleteTooltip}
						onMouseOut={hideTooltips}
					/>
				</Button>
			</Cell>
		</ParentGrid>
	)
}

export default NoteModule;