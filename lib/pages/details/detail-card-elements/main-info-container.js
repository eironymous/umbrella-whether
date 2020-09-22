"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _gridItems = require("../../../layout/grid-items");

var _iconSelector = require("../icon-selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocationNameText = _styledComponents.default.div.withConfig({
  displayName: "main-info-container__LocationNameText",
  componentId: "c9c5uu-0"
})(["font-weight:800;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;letter-spacing:3px;max-width:100%;box-sizing:border-box;text-align:left;font-size:2em;"]);

var IconCell = (0, _styledComponents.default)(_gridItems.Cell).withConfig({
  displayName: "main-info-container__IconCell",
  componentId: "c9c5uu-1"
})(["font-size:8em;text-align:center;.weather-icon{position:relative;top:50%;transform:translateY(-50%);}"]);

var TemperatureText = _styledComponents.default.div.withConfig({
  displayName: "main-info-container__TemperatureText",
  componentId: "c9c5uu-2"
})(["font-size:5em;text-align:center;position:relative;top:50%;transform:translateY(-50%);letter-spacing:2px;"]);

var FeelsLikeText = _styledComponents.default.div.withConfig({
  displayName: "main-info-container__FeelsLikeText",
  componentId: "c9c5uu-3"
})(["position:relative;letter-spacing:1px;font-weight:200;"]);
/**
 * Displays the primary information about the current weather
 * @param {*} param0 
 */


var MainInfoContainer = function MainInfoContainer(_ref) {
  var locale = _ref.locale,
      time = _ref.time,
      units = _ref.units;
  return <_gridItems.Grid rows="2em 2em 8em 2em" columns="1fr 3fr" gridGap="16px">
			<_gridItems.Cell row="1" col="1/span 2">
				<LocationNameText>
					{"".concat(locale.city, ",")}
				</LocationNameText>
			</_gridItems.Cell>
			<_gridItems.Cell row="2" col="1/span 2">
				<LocationNameText>
					{locale.country}
				</LocationNameText>
			</_gridItems.Cell>
			<IconCell row="3/span 2">
				{(0, _iconSelector.getIconForKeyword)(locale.descriptions[0], time)}
			</IconCell>
			<_gridItems.Cell row="3" col="2">
				<TemperatureText>
					{"".concat(locale.temperature, " ").concat(units.temperature)}
				</TemperatureText>
			</_gridItems.Cell>
			<_gridItems.Cell row="4" col="2">
				<FeelsLikeText>
					{"/ feels like ".concat(locale.feelsLike, " ").concat(units.temperature)}
				</FeelsLikeText>
			</_gridItems.Cell>
		</_gridItems.Grid>;
};

var _default = MainInfoContainer;
exports.default = _default;