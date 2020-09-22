"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _gridItems = require("../layout/grid-items");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var InputContainer = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "search-field__InputContainer",
  componentId: "sc-15i6gq1-0"
})(["grid-gap:0;width:100%;height:100%;"]);

var SearchBar = _styledComponents.default.input.attrs({
  type: "text"
}).withConfig({
  displayName: "search-field__SearchBar",
  componentId: "sc-15i6gq1-1"
})(["position:relative;top:50%;transform:translateY(-60%);background-color:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.7);border-right:none;border-radius:18px 0px 0px 18px;padding:0.25em;padding-left:1em;top:50%;transform:translateY(-50%);height:21px;color:rgb(255,255,255);"]);

var SearchButton = _styledComponents.default.div.withConfig({
  displayName: "search-field__SearchButton",
  componentId: "sc-15i6gq1-2"
})(["border:2px solid rgba(255,255,255,0.7);border-radius:0px 18px 18px 0px;position:relative;top:50%;transform:translateY(-50%);height:20px;padding:0.25em;padding-right:.5em;background-color:rgba(255,255,255,0.1);cursor:pointer;.search-icon{top:50%;transform:translateY(-50%);position:relative;}"]);

var _default = function _default(_ref) {
  var onSubmit = _ref.onSubmit,
      searchRef = _ref.searchRef;

  var _React$useState = _react.default.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      text = _React$useState2[0],
      setText = _React$useState2[1];

  var handleInput = function handleInput(evt) {
    setText(evt.target.value);
  };

  var handleKeyUp = function handleKeyUp(_ref2) {
    var key = _ref2.key;

    if (key === "Enter") {
      if (text.length !== 0) {
        onSubmit(text);
      }
    }
  };

  return <InputContainer columns="6fr 1fr">
			<_gridItems.Cell>
				<SearchBar placeholder="New York, New York" onInput={handleInput} onKeyUp={handleKeyUp} onSubmit={function () {
        return onSubmit(text);
      }} ref={searchRef} />
			</_gridItems.Cell>
			<_gridItems.Cell col="2">
				<SearchButton>
					<_reactFontawesome.FontAwesomeIcon icon="search" className="search-icon" onClick={function () {
          return onSubmit(text);
        }} />
				</SearchButton>
			</_gridItems.Cell>
		</InputContainer>;
};

exports.default = _default;