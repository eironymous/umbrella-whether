"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _lodash = require("lodash");

var _gridItems = require("../../../../layout/grid-items");

var _tooltip = _interopRequireDefault(require("../../../../components/tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ParentGrid = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "note-element__ParentGrid",
  componentId: "sc-1awboty-0"
})(["transition-property:width;transition-duration:0.5s;border-bottom:1px solid rgba(255,255,255,0.5);"]);

var NoteDisplay = _styledComponents.default.div.withConfig({
  displayName: "note-element__NoteDisplay",
  componentId: "sc-1awboty-1"
})(["width:100%;height:min-content;color:rgb(255,255,255);overflow:hidden;padding-top:.75em;text-align:justify;text-justify:auto;transition-property:width;transition-duration:0.5s;"]);

var TimestampDisplay = _styledComponents.default.div.withConfig({
  displayName: "note-element__TimestampDisplay",
  componentId: "sc-1awboty-2"
})(["line-height:1.25em;font-weight:200;text-align:justify;text-justify:auto;font-size:0.75em;"]);

var Button = _styledComponents.default.div.withConfig({
  displayName: "note-element__Button",
  componentId: "sc-1awboty-3"
})(["text-align:right;opacity:0.7;line-height:1.25em;font-size:1.25em;cursor:pointer;:hover{opacity:1;}"]);

var NoteModule = function NoteModule(_ref) {
  var note = _ref.note,
      _ref$handleEditClicke = _ref.handleEditClicked,
      handleEditClicked = _ref$handleEditClicke === void 0 ? _lodash.noop : _ref$handleEditClicke,
      _ref$handleDeleteClic = _ref.handleDeleteClicked,
      handleDeleteClicked = _ref$handleDeleteClic === void 0 ? _lodash.noop : _ref$handleDeleteClic;

  var _React$useState = _react.default.useState({
    id: -1,
    x: 0,
    y: 0
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tooltip = _React$useState2[0],
      setTooltip = _React$useState2[1];

  var showDeleteTooltip = function showDeleteTooltip(evt) {
    setTooltip({
      id: 0,
      x: evt.target.getBoundingClientRect().left,
      y: evt.target.getBoundingClientRect().top - 20
    });
  };

  var showEditTooltip = function showEditTooltip(evt) {
    setTooltip({
      id: 1,
      x: evt.target.getBoundingClientRect().left,
      y: evt.target.getBoundingClientRect().top - 20
    });
  };

  var hideTooltips = function hideTooltips() {
    setTooltip(_objectSpread(_objectSpread({}, tooltip), {}, {
      id: -1
    }));
  };

  if (note === undefined) return null;
  return <ParentGrid rows="min-content 2em" columns="1fr 1fr 1fr">
			<_tooltip.default show={tooltip.id === 0} text="Delete Note" x={tooltip.x} y={tooltip.y} />
			<_tooltip.default show={tooltip.id === 1} text="Edit Note" x={tooltip.x} y={tooltip.y} />
			<_gridItems.Cell col="1/span 3">
				<NoteDisplay>
					{note.body}
				</NoteDisplay>
			</_gridItems.Cell>
			<_gridItems.Cell row="2">
				<TimestampDisplay>
					{note.timeStamp}
				</TimestampDisplay>
			</_gridItems.Cell>
			<_gridItems.Cell row="2" col="2">
				<Button>
					<_reactFontawesome.FontAwesomeIcon icon="edit" onMouseOver={showEditTooltip} onMouseOut={hideTooltips} onClick={handleEditClicked} />
				</Button>
			</_gridItems.Cell>
			<_gridItems.Cell row="2" col="3">
				<Button>
					<_reactFontawesome.FontAwesomeIcon icon="trash" onClick={handleDeleteClicked} onMouseOver={showDeleteTooltip} onMouseOut={hideTooltips} />
				</Button>
			</_gridItems.Cell>
		</ParentGrid>;
};

var _default = NoteModule;
exports.default = _default;