"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _notesSlice = require("../../../../state/notes-slice");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _gridItems = require("../../../../layout/grid-items");

var _noteInput = _interopRequireDefault(require("../../../../components/note-input"));

var _noteElement = _interopRequireDefault(require("./note-element"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var NoteEntryGrid = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "note-container__NoteEntryGrid",
  componentId: "sc-1oi3omv-0"
})(["min-width:700px;text-align:left;overflow:visible;grid-column-gap:60px;transition-property:width;transition-duration:0.5s;"]);
var HeaderCell = (0, _styledComponents.default)(_gridItems.Cell).withConfig({
  displayName: "note-container__HeaderCell",
  componentId: "sc-1oi3omv-1"
})(["font-weight:800;opacity:0.7;cursor:pointer;overflow-x:hidden;overflow-y:visible;text-overflow:ellipsis;white-space:nowrap;letter-spacing:1px;line-height:3em;:hover{opacity:1;}"]);
var NotesCell = (0, _styledComponents.default)(_gridItems.Cell).withConfig({
  displayName: "note-container__NotesCell",
  componentId: "sc-1oi3omv-2"
})(["font-weight:300;overflow:hidden;overflow-y:auto;min-height:20em;padding-right:1.5em;transition-property:width;transition-duration:0.5s;::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{opacity:0;}::-webkit-scrollbar-thumb{border-radius:10px;background:#22223B;}scrollbar-color:#22223B;scrollbar-width:4px;"]);

var NotesContainer = function NotesContainer(_ref) {
  var locale = _ref.locale;
  var timeStamp = Date();

  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showNewNoteField = _React$useState2[0],
      setShowNewNoteField = _React$useState2[1];

  var _React$useState3 = _react.default.useState("-1"),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      editActive = _React$useState4[0],
      setEditActive = _React$useState4[1];

  var dispatch = (0, _reactRedux.useDispatch)();
  var notes = (0, _reactRedux.useSelector)(function (state) {
    return (0, _notesSlice.selectNotesByLocale)(state, locale.id);
  });

  var handleNewNoteSubmitted = function handleNewNoteSubmitted(id, body) {
    var newNote = {
      id: id,
      body: body,
      localeId: locale.id,
      timeStamp: timeStamp
    };
    dispatch((0, _notesSlice.mergeNotes)([newNote]));
  };

  var handleEditSubmitted = function handleEditSubmitted(id, body) {
    var edited = {
      id: id,
      body: body,
      localeId: locale.id,
      timeStamp: timeStamp
    };
    dispatch((0, _notesSlice.mergeNotes)([edited]));
  };

  var handleNoteDeleted = function handleNoteDeleted(id) {
    dispatch((0, _notesSlice.deleteById)(id));
  };

  return <NoteEntryGrid rows="3em auto" columns={showNewNoteField ? "500px 1fr" : "200px 1fr"} gridGap="20px">
			<HeaderCell>
				<_gridItems.Grid rows="auto" gridGap="10px" columns="min-content min-content" onClick={function () {
        return setShowNewNoteField(!showNewNoteField);
      }}>
					<_gridItems.Cell>
						Add New Note
					</_gridItems.Cell>
					<_gridItems.Cell col="2">
						<_reactFontawesome.FontAwesomeIcon icon="sticky-note" />
					</_gridItems.Cell>
				</_gridItems.Grid>
			</HeaderCell>
			<_gridItems.Cell row="2">
				{showNewNoteField && <_noteInput.default id={(0, _lodash.uniqueId)("note-".concat(timeStamp, "-"))} onCancel={function () {
        return setShowNewNoteField(false);
      }} onSubmit={handleNewNoteSubmitted} />}
			</_gridItems.Cell>
			<NotesCell col="2">
				{notes.length !== 0 && <_gridItems.Grid rows={"repeat(".concat(notes.length, ", calc(min-content + .25em))")}>
						{notes.map(function (note, idx) {
          return <_react.default.Fragment key={"".concat(note.id, "-").concat(idx)}>
								{editActive.localeCompare(note.id) === 0 && <_noteInput.default id={note.id} text={note.body} onCancel={function () {
              return setEditActive("-1");
            }} onSubmit={handleEditSubmitted} />}
								{editActive.localeCompare(note.id) !== 0 && <_noteElement.default note={note} handleEditClicked={function () {
              return setEditActive(note.id);
            }} handleDeleteClicked={function () {
              return handleNoteDeleted(note.id);
            }} />}
							</_react.default.Fragment>;
        })}
					</_gridItems.Grid>}
			</NotesCell>
		</NoteEntryGrid>;
};

var _default = NotesContainer;
exports.default = _default;