"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _gridItems = require("../../layout/grid-items");

var _card = _interopRequireDefault(require("../../layout/card"));

var CONSTANTS = _interopRequireWildcard(require("../../app/constants"));

var _mainInfoContainer = _interopRequireDefault(require("./detail-card-elements/main-info-container"));

var _detailedInfoContainer = _interopRequireDefault(require("./detail-card-elements/detailed-info-container"));

var _noteContainer = _interopRequireDefault(require("./detail-card-elements/notes/note-container"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parent = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "detail-card__Parent",
  componentId: "jqd7x5-0"
})(["padding:2em;position:relative;min-width:700px;overflow:visible;min-height:60vh;"]);
var StyledCard = (0, _styledComponents.default)(_card.default).withConfig({
  displayName: "detail-card__StyledCard",
  componentId: "jqd7x5-1"
})(["padding:2.5em;overflow-y:auto;background:#4A4E69;width:100%;height:100%;::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{opacity:0;}::-webkit-scrollbar-thumb{border-radius:10px;background:#4A4E69;}scrollbar-color:#4A4E69;scrollbar-width:4px;"]);

var Divider = _styledComponents.default.hr.withConfig({
  displayName: "detail-card__Divider",
  componentId: "jqd7x5-2"
})(["width:100%;position:relative;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);border:1px solid rgba(255,255,255,0.5);margin:0;padding:0;"]);

var getUnits = function getUnits(scale) {
  switch (true) {
    case scale.localeCompare(CONSTANTS.METRIC_SCALE) === 0:
      return CONSTANTS.METRIC_UNITS;

    case scale.localeCompare(CONSTANTS.FAHRENHEIT_SCALE) === 0:
      return CONSTANTS.FAHRENHEIT_UNITS;

    case scale.localeCompare(CONSTANTS.SCIENTIFIC_SCALE) === 0:
      return CONSTANTS.SCIENTIFIC_UNITS;

    default:
      return CONSTANTS.METRIC_UNITS;
  }
};
/**
 * Displays the weather details for a specific location.
 * 
 * @param {*} param0 
 */


var DetailsCard = function DetailsCard(_ref) {
  var locale = _ref.locale;
  var time = locale.localTime.split(" ")[1];
  var units = getUnits(locale.scale);
  if (locale === undefined) return null;
  return <Parent>
			<_gridItems.Cell>
				<StyledCard>
					<_gridItems.Grid rows="19em 1em 20em" columns="minmax(360px, 510px) minmax(160px, 1fr) minmax(160px, 1fr)">
						<_gridItems.Cell>
							<_mainInfoContainer.default locale={locale} time={time} units={units} />
						</_gridItems.Cell>
						<_gridItems.Cell col="2/span 2">
							<_detailedInfoContainer.default locale={locale} units={units} time={time} />
						</_gridItems.Cell>
						<_gridItems.Cell row="2" col="1/span 3">
							<Divider />
						</_gridItems.Cell>
						<_gridItems.Cell row="3" col="1/span 3">
							<_noteContainer.default locale={locale} />
						</_gridItems.Cell>
					</_gridItems.Grid>
				</StyledCard>
			</_gridItems.Cell>
		</Parent>;
};

var _default = DetailsCard;
exports.default = _default;