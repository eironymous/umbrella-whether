"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectNotesByLocale = exports.selectNoteById = exports.selectNotes = exports.deleteByLocale = exports.deleteById = exports.mergeNotes = exports.setNotes = exports.notesSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _lodash = require("lodash");

var _noteListTools = require("../app/note-list-tools");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * A note should consist of:
 * 	- id: an unique ID
 * 	- body: a body consisting of a text of maximum 460 characters
 * 	- localeId: the id of an associated locale
 * 	- timeStamp: the time and date of submission or latest edit
 */
var notesSlice = (0, _toolkit.createSlice)({
  name: "notes",
  initialState: {
    notes: []
  },
  reducers: {
    //Overwrite the full list of notes
    setNotes: function setNotes(state, _ref) {
      var payload = _ref.payload;
      var sorted = payload.length ? (0, _noteListTools.sortById)(payload) : payload;
      state.notes = sorted;
    },
    //Merge one list with that already in state
    mergeNotes: function mergeNotes(state, _ref2) {
      var payload = _ref2.payload;

      var allNotes = _toConsumableArray(state.notes);

      if (allNotes.length === 0) {
        state.notes = payload;
      } else {
        var merged = (0, _noteListTools.mergeNoteLists)(allNotes, payload);
        var sorted = (0, _noteListTools.sortById)(merged);
        state.notes = sorted;
      }
    },
    //Delete the note with the given id
    deleteById: function deleteById(state, _ref3) {
      var payload = _ref3.payload;

      var allNotes = _toConsumableArray(state.notes);

      var idx = (0, _lodash.findIndex)(allNotes, function (item) {
        return item.id === payload;
      });

      if (idx !== -1) {
        var newList = allNotes.filter(function (_item, i) {
          return i !== idx;
        });
        state.notes = newList;
      }
    },
    //Delete the notes associated with the given locale
    deleteByLocale: function deleteByLocale(state, _ref4) {
      var payload = _ref4.payload;

      var allNotes = _toConsumableArray(state.notes);

      var newList = allNotes.filter(function (item) {
        return item.localeId.localeCompare(payload) !== 0;
      });
      state.notes = newList;
    }
  }
});
exports.notesSlice = notesSlice;
var _notesSlice$actions = notesSlice.actions,
    setNotes = _notesSlice$actions.setNotes,
    mergeNotes = _notesSlice$actions.mergeNotes,
    deleteById = _notesSlice$actions.deleteById,
    deleteByLocale = _notesSlice$actions.deleteByLocale;
exports.deleteByLocale = deleteByLocale;
exports.deleteById = deleteById;
exports.mergeNotes = mergeNotes;
exports.setNotes = setNotes;

var selectNotes = function selectNotes(state) {
  return state.notes.notes;
};

exports.selectNotes = selectNotes;

var selectNoteById = function selectNoteById(state, id) {
  return (0, _noteListTools.getNoteById)(state.notes.notes, id);
};

exports.selectNoteById = selectNoteById;

var selectNotesByLocale = function selectNotesByLocale(state, localeId) {
  return (0, _noteListTools.getNotesByLocale)(state.notes.notes, localeId);
};

exports.selectNotesByLocale = selectNotesByLocale;
var _default = notesSlice.reducer;
exports.default = _default;