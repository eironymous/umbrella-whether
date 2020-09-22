import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectNotesByLocale, mergeNotes, deleteById } from "../../../../state/notes-slice";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Grid, Cell } from "../../../../layout/grid-items";
import NoteInput from "../../../../components/note-input";
import NoteModule from "./note-element";
import { uniqueId } from "lodash";

const NoteEntryGrid = styled(Grid)`
	min-width: 700px;
	text-align: left;
	overflow: visible;
	grid-column-gap: 60px;
	transition-property: width;
	transition-duration: 0.5s;
`;

const HeaderCell = styled(Cell)`
	font-weight: 800;
	opacity: 0.7;
	cursor: pointer;
	overflow-x: hidden;
	overflow-y: visible;
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
	min-height: 20em;
	padding-right: 1.5em;
	transition-property: width;
	transition-duration: 0.5s;

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
	const timeStamp = Date();

	const [ showNewNoteField, setShowNewNoteField ] = React.useState(false);
	const [ editActive, setEditActive ] = React.useState("-1");

	const dispatch = useDispatch();
	const notes = useSelector((state) => selectNotesByLocale(state, locale.id));

	const handleNewNoteSubmitted = (id, body) => {
		const newNote = {
			id,
			body,
			localeId: locale.id,
			timeStamp,
		}

		dispatch(mergeNotes([ newNote ]));
	}

	const handleEditSubmitted = (id, body) => {
		const edited = {
			id,
			body,
			localeId: locale.id,
			timeStamp
		}

		dispatch(mergeNotes([ edited ]));
	}

	const handleNoteDeleted = (id) => {
		dispatch(deleteById(id));
	}

	return (
		<NoteEntryGrid
			rows="3em auto"
			columns={showNewNoteField ? "500px 1fr" : "200px 1fr"}
			gridGap="20px"
		>
			<HeaderCell>
				<Grid rows="auto" gridGap="10px" columns="min-content min-content" onClick={() => setShowNewNoteField(!showNewNoteField)}>
					<Cell>
						Add New Note
					</Cell>
					<Cell col="2">
						<Icon icon="sticky-note" />
					</Cell>
				</Grid>
			</HeaderCell>
			<Cell row="2">
				{showNewNoteField &&
					<NoteInput
						id={uniqueId(`note-${timeStamp}-`)}
						onCancel={() => setShowNewNoteField(false)}
						onSubmit={handleNewNoteSubmitted}
					/>
				}
			</Cell>
			<NotesCell col="2">
				{notes.length !== 0 && 
					<Grid rows={`repeat(${notes.length}, calc(min-content + .25em))`}>
						{notes.map((note, idx) => 
							<React.Fragment key={`${note.id}-${idx}`}>
								{editActive.localeCompare(note.id) === 0 &&
									<NoteInput
										id={note.id}
										text={note.body}
										onCancel={() => setEditActive("-1")}
										onSubmit={handleEditSubmitted}
									/>
								}
								{editActive.localeCompare(note.id) !== 0 &&
									<NoteModule
										note={note}
										handleEditClicked={() => setEditActive(note.id)}
										handleDeleteClicked={() => handleNoteDeleted(note.id)}
									/>
								}
							</React.Fragment>
						)}
					</Grid>
				}
			</NotesCell>
		</NoteEntryGrid>
	)
}

export default NotesContainer;