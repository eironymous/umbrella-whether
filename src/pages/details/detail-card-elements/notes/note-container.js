import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectNotesByLocale, mergeNotes, deleteById } from "../../../../state/notes-slice";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Grid, Cell } from "../../../../layout/grid-items";
import Tooltip from "../../../../components/tooltip";

const NoteEntryGrid = styled(Grid)`
	min-width: 700px;
	text-align: left;
`;

const HeaderCell = styled(Cell)`
	font-weight: 800;
	opacity: 0.7;
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	letter-spacing: 1px;
	line-height: 3em;

	:hover {
		opacity: 1;
	}
`;

const NotesCell = styled(Cell)`
	font-weight: 300;
	overflow: hidden;
	overflow-y: auto;

	::-webkit-scrollbar {
		width: 4px;
	}

	::-webkit-scrollbar-track {
		opacity: 0;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #22223B;
	}

	scrollbar-color: #22223B;
	scrollbar-width: 4px;
`;

const NotesContainer = ({
	locale
}) => {
	const [ tooltip, setTooltip ] = React.useState({
		show: false,
		x: 0,
		y: 0,
	});

	const [ showNewNoteField, setShowNewNoteField ] = React.useState(false);

	const dispatch = useDispatch();
	const notes = useSelector((state) => selectNotesByLocale(state, locale.id));

	return (
		<NoteEntryGrid
			rows="3em auto"
			columns="1fr 1fr"
		>
			<HeaderCell>
				<Grid rows="auto" columns="1fr 1.5fr" onClick={() => setShowNewNoteField(!showNewNoteField)}>
					<Cell>
						Add New Note
					</Cell>
					<Cell col="2">
						<Icon icon="sticky-note" />
					</Cell>
				</Grid>
			</HeaderCell>
			<Cell row="2">
				
			</Cell>
			<NotesCell col="2">
			</NotesCell>
		</NoteEntryGrid>
	)
}

export default NotesContainer;