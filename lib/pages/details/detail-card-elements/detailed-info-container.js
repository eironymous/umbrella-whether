"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _reactRedux = require("react-redux");

var _gridItems = require("../../../layout/grid-items");

var _localesSlice = require("../../../state/locales-slice");

var _tooltip = _interopRequireDefault(require("../../../components/tooltip"));

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

var InfoLabel = _styledComponents.default.div.withConfig({
  displayName: "detailed-info-container__InfoLabel",
  componentId: "sc-1e6wi9o-0"
})(["letter-spacing:1px;text-align:right;"]);

var InfoText = _styledComponents.default.div.withConfig({
  displayName: "detailed-info-container__InfoText",
  componentId: "sc-1e6wi9o-1"
})(["font-weight:600;text-align:left;"]);

var HeartIconContainer = _styledComponents.default.div.withConfig({
  displayName: "detailed-info-container__HeartIconContainer",
  componentId: "sc-1e6wi9o-2"
})(["position:relative;right:0;font-size:2em;cursor:pointer;"]);
/**
 * Displays more detailed information about the current weather.
 * @param {*} param0 
 */


var DetailedInfoContainer = function DetailedInfoContainer(_ref) {
  var locale = _ref.locale,
      time = _ref.time,
      units = _ref.units;
  var dispatch = (0, _reactRedux.useDispatch)();
  var allLocales = (0, _reactRedux.useSelector)(_localesSlice.selectLocales);

  var _React$useState = _react.default.useState({
    show: false,
    x: 0,
    y: 0
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tooltip = _React$useState2[0],
      setTooltip = _React$useState2[1];

  var showTooltip = function showTooltip(evt) {
    setTooltip({
      show: true,
      x: evt.target.getBoundingClientRect().left,
      y: evt.target.getBoundingClientRect().top - 20
    });
  };

  var hideTooltip = function hideTooltip() {
    setTooltip(_objectSpread(_objectSpread({}, tooltip), {}, {
      show: false
    }));
  };

  return <_gridItems.Grid columns="6fr 6fr 1fr" rows="repeat(9, min-content)" gridGap="10px">
			<_tooltip.default text={locale.favorited ? "Remove favorite" : "Add favorite"} show={tooltip.show} x={tooltip.x} y={tooltip.y} />
			<_gridItems.Cell>
				<InfoLabel>
					Local Time:
				</InfoLabel>
			</_gridItems.Cell>
			<_gridItems.Cell col="2">
				<InfoText>
					{time}
				</InfoText>
			</_gridItems.Cell>
			<_gridItems.Cell row="1/span 2" col="3">
				<HeartIconContainer>
					{locale.favorited && <_reactFontawesome.FontAwesomeIcon icon="heart" onClick={function () {
          return dispatch((0, _localesSlice.setFavorite)({
            id: locale.id,
            favorite: false,
            allLocales: allLocales.locales
          }));
        }} onMouseOver={showTooltip} onMouseOut={hideTooltip} />}
					{!locale.favorited && <_reactFontawesome.FontAwesomeIcon icon={["far", "heart"]} onClick={function () {
          return dispatch((0, _localesSlice.setFavorite)({
            id: locale.id,
            favorite: true,
            allLocales: allLocales.locales
          }));
        }} onMouseOver={showTooltip} onMouseOut={hideTooltip} />}
				</HeartIconContainer>
			</_gridItems.Cell>
			<_gridItems.Cell row="2">
				<InfoLabel>
					Current Weather:
				</InfoLabel>
			</_gridItems.Cell>
			<_gridItems.Cell row="2" col="2">
				<InfoText>
					{locale.descriptions.map(function (desc, idx) {
          return <_react.default.Fragment key={"".concat(desc, "-").concat(idx)}>{desc}</_react.default.Fragment>;
        })}
				</InfoText>
			</_gridItems.Cell>
			<_gridItems.Cell row="3">
				<InfoLabel>
					Wind:
				</InfoLabel>
			</_gridItems.Cell>
			<_gridItems.Cell row="3" col="2">
				<InfoText>
					{"".concat(locale.windDirection || 0, ", ").concat(locale.windSpeed, " ").concat(units.windSpeed)}
				</InfoText>
			</_gridItems.Cell>
			<_gridItems.Cell row="4">
				<InfoLabel>
					Pressure:
				</InfoLabel>
			</_gridItems.Cell>
			<_gridItems.Cell row="4" col="2">
				<InfoText>
					{"".concat(locale.pressure || 0, " ").concat(units.pressure)}
				</InfoText>
			</_gridItems.Cell>
			<_gridItems.Cell row="5">
				<InfoLabel>
					Precipitation:
				</InfoLabel>
			</_gridItems.Cell>
			<_gridItems.Cell row="5" col="2">
				<InfoText>
					{"".concat(locale.precipitation || 0, " ").concat(units.precip)}
				</InfoText>
			</_gridItems.Cell>
			<_gridItems.Cell row="6">
				<InfoLabel>
					Humidity:
				</InfoLabel>
			</_gridItems.Cell>
			<_gridItems.Cell row="6" col="2">
				<InfoText>
					{"".concat(locale.humidity || 0, "%")}
				</InfoText>
			</_gridItems.Cell>
			<_gridItems.Cell row="7">
				<InfoLabel>
					Cloud Cover:
				</InfoLabel>
			</_gridItems.Cell>
			<_gridItems.Cell row="7" col="2">
				<InfoText>
					{"".concat(locale.cloudCover || 0, "%")}
				</InfoText>
			</_gridItems.Cell>
			<_gridItems.Cell row="8">
				<InfoLabel>
					UV Index:
				</InfoLabel>
			</_gridItems.Cell>
			<_gridItems.Cell row="8" col="2">
				<InfoText>
					{locale.uvIndex || 0}
				</InfoText>
			</_gridItems.Cell>
			<_gridItems.Cell row="9">
				<InfoLabel>
					Visibility:
				</InfoLabel>
			</_gridItems.Cell>
			<_gridItems.Cell row="9" col="2">
				<InfoText>
					{"".concat(locale.visibility || 0, " ").concat(units.visibility)}
				</InfoText>
			</_gridItems.Cell>
		</_gridItems.Grid>;
};

var _default = DetailedInfoContainer;
exports.default = _default;