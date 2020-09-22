"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _routerSlice = require("../state/router-slice");

var _notesSlice = require("../state/notes-slice");

var _localesSlice = require("../state/locales-slice");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _gridItems = require("./grid-items");

var _card = _interopRequireDefault(require("./card"));

var _constants = require("../app/constants");

var _tooltip = _interopRequireDefault(require("../components/tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ListEntryCard = (0, _styledComponents.default)(_card.default).withConfig({
  displayName: "results-table__ListEntryCard",
  componentId: "fhdjc2-0"
})(["position:relative;background-color:#4A4E69;height:auto;text-align:left;user-select:none;width:98%;min-width:700px;"]);
var CityCell = (0, _styledComponents.default)(_gridItems.Cell).withConfig({
  displayName: "results-table__CityCell",
  componentId: "fhdjc2-1"
})(["font-weight:600;opacity:0.7;cursor:pointer;:hover{opacity:1;}overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
var TempCell = (0, _styledComponents.default)(_gridItems.Cell).withConfig({
  displayName: "results-table__TempCell",
  componentId: "fhdjc2-2"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left;padding-left:1em;letter-spacing:1px;"]);
/**
 * Parses the unit marker associated with a weatherstack request and returns a relevant temperature unit.
 * 
 * @param {String} scale - The scale marker associated with a request to weatherstack.
 */

var getUnits = function getUnits(scale) {
  switch (true) {
    case scale === _constants.FAHRENHEIT_SCALE:
      return "F";

    case scale === _constants.METRIC_SCALE:
      return "C";

    case scale === _constants.SCIENTIFIC_SCALE:
      return "K";

    default:
      return "C";
  }
};
/**
 * Defines a single list entry in a table of weather results.
 * Takes a WeatherEntryItem and a row number. 
 */


var ListEntry = function ListEntry(_ref) {
  var entry = _ref.entry,
      row = _ref.row,
      items = _ref.items,
      state = _ref.state,
      setState = _ref.setState;
  var dispatch = (0, _reactRedux.useDispatch)();
  if (entry === undefined) return null;
  var units = getUnits(entry.scale);
  var time = entry.localTime ? entry.localTime.split(" ")[1] : "Unknown Time";

  var onDeleteEntry = function onDeleteEntry() {
    //Delete the entry...
    dispatch((0, _localesSlice.deleteById)({
      id: entry.id,
      allLocales: items
    })); //...and any associated notes

    dispatch((0, _notesSlice.deleteByLocale)(entry.id));
  };

  var showHeartTooltip = function showHeartTooltip(evt) {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      activeHeartTooltip: {
        id: entry.id,
        x: evt.target.getBoundingClientRect().right,
        y: evt.target.getBoundingClientRect().top - 20
      }
    }));
  };

  var showDeleteTooltip = function showDeleteTooltip(evt) {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      activeDeleteTooltip: {
        id: entry.id,
        x: evt.target.getBoundingClientRect().right,
        y: evt.target.getBoundingClientRect().top - 20
      }
    }));
  };

  var showEyeTooltip = function showEyeTooltip(evt) {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      activeEyeTooltip: {
        id: entry.id,
        x: evt.target.getBoundingClientRect().right,
        y: evt.target.getBoundingClientRect().top - 20
      }
    }));
  };

  var hideAllTooltips = function hideAllTooltips() {
    setState({
      activeHeartTooltip: _objectSpread(_objectSpread({}, state.activeHeartTooltip), {}, {
        id: -1
      }),
      activeEyeTooltip: _objectSpread(_objectSpread({}, state.activeEyeTooltip), {}, {
        id: -1
      }),
      activeDeleteTooltip: _objectSpread(_objectSpread({}, state.activeDeleteTooltip), {}, {
        id: -1
      })
    });
  };

  return <>
		<_tooltip.default show={entry.id.localeCompare(state.activeHeartTooltip.id) === 0} text={entry.favorited ? "Remove favorite" : "Add favorite"} x={state.activeHeartTooltip.x} y={state.activeHeartTooltip.y} />
			<_tooltip.default show={entry.id.localeCompare(state.activeEyeTooltip.id) === 0} text={"View details"} x={state.activeEyeTooltip.x} y={state.activeEyeTooltip.y} />
			<_tooltip.default show={entry.id.localeCompare(state.activeDeleteTooltip.id) === 0} text={"Delete"} x={state.activeDeleteTooltip.x} y={state.activeDeleteTooltip.y} />
		<_gridItems.Cell row={row}>
			<ListEntryCard>
				<_gridItems.Grid columns="1fr 4fr 4fr 6fr" rows="1.2em">
					<CityCell onClick={function () {
            return dispatch((0, _routerSlice.updateRoute)("details-".concat(entry.id)));
          }}>
						<_reactFontawesome.FontAwesomeIcon icon={["far", "eye"]} onMouseOver={showEyeTooltip} onMouseOut={hideAllTooltips} />
					</CityCell>
					<CityCell col="2" onClick={function () {
            return dispatch((0, _routerSlice.updateRoute)("details-".concat(entry.id)));
          }}>
							<span onMouseOver={showEyeTooltip} onMouseOut={hideAllTooltips}>{"".concat(entry.city, " - ").concat(entry.country)}</span>
					</CityCell>
					<TempCell col="3">
							<strong>{"".concat(entry.temperature, " \xB0").concat(units)}</strong> {"at"} <strong>{time}</strong> {"UTC ".concat(entry.utcOffset)}
					</TempCell>
					<CityCell col="4">
						{entry.favorited && <_reactFontawesome.FontAwesomeIcon icon="heart" onMouseOver={showHeartTooltip} onMouseOut={hideAllTooltips} onClick={function () {
              return dispatch((0, _localesSlice.setFavorite)({
                id: entry.id,
                favorite: false,
                allLocales: items
              }));
            }} />}
						{!entry.favorited && <_reactFontawesome.FontAwesomeIcon icon={["far", "heart"]} onMouseOver={showHeartTooltip} onMouseOut={hideAllTooltips} onClick={function () {
              return dispatch((0, _localesSlice.setFavorite)({
                id: entry.id,
                favorite: true,
                allLocales: items
              }));
            }} />}
					</CityCell>
					<CityCell col="5">
						<_reactFontawesome.FontAwesomeIcon icon="minus-circle" onMouseOver={showDeleteTooltip} onMouseOut={hideAllTooltips} onClick={onDeleteEntry} style={{
              cursor: "pointer"
            }} />
					</CityCell>
				</_gridItems.Grid>
			</ListEntryCard>
		</_gridItems.Cell>
		</>;
};

var Table = function Table(_ref2) {
  var items = _ref2.items;

  var _React$useState = _react.default.useState({
    activeHeartTooltip: {
      id: -1,
      x: 0,
      y: 0
    },
    activeEyeTooltip: {
      id: -1,
      x: 0,
      y: 0
    },
    activeDeleteTooltip: {
      id: -1,
      x: 0,
      y: 0
    }
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  if (items === undefined || !items.length) return null;
  return <_gridItems.Grid columns="1fr" rows={"repeat(".concat(items.length, ", 3em)")} gridGap="10px">
			{items.map(function (entry, idx) {
      return <ListEntry entry={entry} key={"weather-list-entry-".concat(entry.id, ":").concat(idx)} row={idx + 1} items={items} state={state} setState={setState} />;
    })}
		</_gridItems.Grid>;
};

var _default = Table;
exports.default = _default;