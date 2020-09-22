"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _gridItems = require("../../layout/grid-items");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parent = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "empty-state__Parent",
  componentId: "cp4zny-0"
})(["min-width:700px;position:relative;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);height:min-content;"]);

var IconContainer = _styledComponents.default.div.withConfig({
  displayName: "empty-state__IconContainer",
  componentId: "cp4zny-1"
})(["position:relative;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);font-size:4em;"]);

var TextContainer = _styledComponents.default.div.withConfig({
  displayName: "empty-state__TextContainer",
  componentId: "cp4zny-2"
})(["position:relative;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);font-size:2em;letter-spacing:2px;font-weight:800;"]);

var EmptyState = function EmptyState() {
  return <Parent rows="min-content min-content" columns="1fr">
			<_gridItems.Cell>
				<IconContainer>
					<_reactFontawesome.FontAwesomeIcon icon="surprise" />
				</IconContainer>
			</_gridItems.Cell>
			<_gridItems.Cell row="2">
				<TextContainer>
					There's nothing here yet! Try searching for a city to add it to your homepage.
				</TextContainer>
			</_gridItems.Cell>
		</Parent>;
};

var _default = EmptyState;
exports.default = _default;