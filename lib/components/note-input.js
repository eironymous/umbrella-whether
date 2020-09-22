"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _gridItems = require("../layout/grid-items");

var _tooltip = _interopRequireDefault(require("./tooltip"));

var _lodash = require("lodash");

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

var NewNoteInput = _styledComponents.default.textarea.withConfig({
  displayName: "note-input__NewNoteInput",
  componentId: "x9b4dn-0"
})(["width:100%;height:100%;color:rgb(255,255,255);background-color:transparent;border:2px solid ", ";border-radius:12px;padding:1em;box-sizing:border-box;::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{opacity:0;}::-webkit-scrollbar-thumb{border-radius:10px;background:#22223B;}scrollbar-color:#22223B;scrollbar-width:4px;"], function (p) {
  return p.error ? "rgba(255, 0, 0, 0.3)" : "#22223B";
});

var Button = _styledComponents.default.div.withConfig({
  displayName: "note-input__Button",
  componentId: "x9b4dn-1"
})(["cursor:pointer;opacity:0.7;text-align:", ";line-height:5em;font-size:1.2em;box-sizing:border-box;:hover{opacity:1;}"], function (p) {
  return p.submit ? "right" : "left";
});

var CharTracker = _styledComponents.default.div.withConfig({
  displayName: "note-input__CharTracker",
  componentId: "x9b4dn-2"
})(["font-weight:200;letter-spacing:1px;text-align:left;line-height:5em;box-sizing:border-box;font-size:1.2em;"]);

var NoteInput = function NoteInput(_ref) {
  var id = _ref.id,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? "" : _ref$text,
      _ref$onSubmit = _ref.onSubmit,
      onSubmit = _ref$onSubmit === void 0 ? _lodash.noop : _ref$onSubmit,
      _ref$onCancel = _ref.onCancel,
      onCancel = _ref$onCancel === void 0 ? _lodash.noop : _ref$onCancel;

  var _React$useState = _react.default.useState(text),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _React$useState3 = _react.default.useState({
    id: -1,
    x: 0,
    y: 0
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      tooltip = _React$useState4[0],
      setTooltip = _React$useState4[1];

  var _React$useState5 = _react.default.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      error = _React$useState6[0],
      setError = _React$useState6[1];

  var textFieldRef = _react.default.useRef();

  _react.default.useEffect(function () {
    setValue(text);
  }, [text]);

  _react.default.useEffect(function () {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, []);

  var hideTooltips = function hideTooltips() {
    setTooltip(_objectSpread(_objectSpread({}, tooltip), {}, {
      id: -1
    }));
  };

  var showSubmitTooltip = function showSubmitTooltip(evt) {
    setTooltip({
      id: 0,
      x: evt.target.getBoundingClientRect().right,
      y: evt.target.getBoundingClientRect().top - 20
    });
  };

  var showCancelTooltip = function showCancelTooltip(evt) {
    setTooltip({
      id: 1,
      x: evt.target.getBoundingClientRect().right,
      y: evt.target.getBoundingClientRect().top - 20
    });
  };

  var handleSubmit = function handleSubmit() {
    if (error) {
      return;
    }

    onSubmit(id, value);
    onCancel();
  };

  var handleCancel = function handleCancel() {
    setValue(text);
    onCancel();
  };

  var handleKeyUp = function handleKeyUp(_ref2) {
    var key = _ref2.key;

    switch (true) {
      case key === "Enter":
        {
          if (error) {
            break;
          }

          handleSubmit();
          return;
        }

      case key === "Escape":
        {
          handleCancel();
          return;
        }

      default:
        {
          return;
        }
    }
  };

  var handleInput = function handleInput(_ref3) {
    var target = _ref3.target;

    if (target.value.length === 0) {
      setValue(target.value);
      setError(true);
    } else {
      setValue(target.value);
      setError(false);
    }
  };

  return <_gridItems.Grid rows="10em 5em" columns="1fr 1fr 1fr">
			<_tooltip.default show={tooltip.id === 0} x={tooltip.x} y={tooltip.y} text="Submit" />
			<_tooltip.default show={tooltip.id === 1} x={tooltip.x} y={tooltip.y} text="Abandon Changes" />
			<_gridItems.Cell col="1/span 3">
				<NewNoteInput maxLength="460" onKeyUp={handleKeyUp} error={error} value={value} onChange={handleInput} ref={textFieldRef} placeholder={error ? "This field can't be empty! :(" : "Enter your note here and press the send button or hit Enter to submit. :)"} />
			</_gridItems.Cell>
			<_gridItems.Cell row="2" col="1">
				<Button onClick={handleCancel} submit={false}>
					<_reactFontawesome.FontAwesomeIcon icon="trash" onMouseOver={showCancelTooltip} onMouseOut={hideTooltips} />
				</Button>
			</_gridItems.Cell>
			<_gridItems.Cell row="2" col="2">
				<CharTracker>
					{"".concat(value.length, "/460")}
				</CharTracker>
			</_gridItems.Cell>
			<_gridItems.Cell row="2" col="3">
				<Button onClick={handleSubmit} submit={true}>
					<_reactFontawesome.FontAwesomeIcon icon="paper-plane" onMouseOver={showSubmitTooltip} onMouseOut={hideTooltips} />
				</Button>
			</_gridItems.Cell>
		</_gridItems.Grid>;
};

var _default = NoteInput;
exports.default = _default;