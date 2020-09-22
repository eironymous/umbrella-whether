"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TooltipContainer = _styledComponents.default.div.withConfig({
  displayName: "tooltip__TooltipContainer",
  componentId: "nmncrg-0"
})(["position:fixed;top:", "px;left:", "px;z-index:100;font-weight:300;text-align:left;text-align:start;display:inline-block;margin-bottom:5px;user-select:none;"], function (p) {
  return p.y ? p.y : 0;
}, function (p) {
  return p.x ? p.x : 0;
});

var TooltipLabel = _styledComponents.default.div.withConfig({
  displayName: "tooltip__TooltipLabel",
  componentId: "nmncrg-1"
})(["max-width:200px;padding:3px 8px;color:rgb(255,255,255);background-color:rgba(0,0,0,0.5);border-radius:4px;position:fixed;"]);

var Tooltip = function Tooltip(_ref) {
  var x = _ref.x,
      y = _ref.y,
      show = _ref.show,
      text = _ref.text;
  return <>
			{show && <TooltipContainer x={x} y={y}>
					<TooltipLabel>{text}</TooltipLabel>
				</TooltipContainer>}
		</>;
};

var _default = Tooltip;
exports.default = _default;