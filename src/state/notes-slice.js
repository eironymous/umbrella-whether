import { createSlice } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import { mergeNoteLists, sortByDate, getNoteById, getNotesByLocale } from "../app/note-list-tools";

/**
 * A note should consist of:
 * 	- id: an unique ID
 * 	- body: a body consisting of a text of maximum 460 characters
 * 	- localeId: the id of an associated locale
 * 	- timeStamp: the time and date of submission or latest edit
 */
export const notesSlice = createSlice({
	name: "notes",
	initialState: {
		notes: []
	},
	reducers: {
		//Overwrite the full list of notes
		setNotes: (state, {payload}) => {
			const sorted = payload.length ? sortByDate(payload) : payload;
			state.notes = sorted;
		},
		//Merge one list with that already in state
		mergeNotes: (state, {payload}) => {
			const allNotes = [...state.notes];

			if (allNotes.length === 0) {
				state.notes = payload;
			} else {
				const merged = mergeNoteLists(allNotes, payload);
				const sorted = sortByDate(merged);
				state.notes = sorted;
			}
		},
		//Delete the note with the given id
		deleteById: (state, {payload}) => {
			const allNotes = [...state.notes];

			const idx = findIndex(allNotes, (item) => item.id === payload);

			if (idx !== -1) {
				const newList = allNotes.filter((_item, i) => i !== idx);
				state.notes = newList;
			}
		},
		//Delete the notes associated with the given locale
		deleteByLocale: (state, {payload}) => {
			const allNotes = [...state.notes];

			const newList = allNotes.filter((item) => item.localeId.localeCompare(payload) !== 0);

			state.notes = newList;
		}
	}
});

export const { setNotes, mergeNotes, deleteById, deleteByLocale } = notesSlice.actions;

export const selectNotes = state => state.notes.notes;
export const selectNoteById = (state, id) => getNoteById(state.notes.notes, id);
export const selectNotesByLocale = (state, localeId) => getNotesByLocale(state.notes.notes, localeId);

export default notesSlice.reducer;