"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _gridItems = require("./grid-items");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _routerSlice = require("../state/router-slice");

var _reactRedux = require("react-redux");

var _lodash = require("lodash");

var _tooltip = _interopRequireDefault(require("../components/tooltip"));

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

var Nav = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "nav-list__Nav",
  componentId: "s4qnac-0"
})(["grid-gap:0;width:", ";transition-property:width;transition:0.5s;"], function (p) {
  return p.width ? p.width : "initial";
});
var NavItem = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "nav-list__NavItem",
  componentId: "s4qnac-1"
})(["cursor:pointer;color:rgb(255,255,255);transition-property:width;transition-duration:0.5s;background-color:", ";width:90%;margin-left:10%;border-radius:18px 0 0 18px;height:100%;opacity:0.7;:hover{opacity:1;}"], function (p) {
  return p.active ? "rgba(255, 255, 255, 0.2)" : "transparent";
});
var NavText = (0, _styledComponents.default)(_gridItems.Cell).withConfig({
  displayName: "nav-list__NavText",
  componentId: "s4qnac-2"
})(["line-height:2.75em;font-size:0.75em;font-weight:600;text-align:right;width:100%;padding-right:1em;"]);

var Header = _styledComponents.default.div.withConfig({
  displayName: "nav-list__Header",
  componentId: "s4qnac-3"
})(["display:flex;justify-content:space-between;align-items:center;cursor:pointer;height:100%;width:", ";.logo-icon{position:relative;transform:scale(150%);margin-left:0.5em;}"], function (p) {
  return p.width ? p.width : "initial";
});

var HeaderCell = (0, _styledComponents.default)(_gridItems.Cell).withConfig({
  displayName: "nav-list__HeaderCell",
  componentId: "s4qnac-4"
})([""]);

var Logo = function Logo() {
  return <svg height="1em" width="80%">
			<defs>
				<linearGradient id="logo-gradient" x1="0%" x2="100%">
					<stop offset="0%" style={{
          stopColor: "#e3ffe7",
          stopOpacity: 1
        }} />
					<stop offset="100%" style={{
          stopColor: "#d9e7ff",
          stopOpacity: 1
        }} />
				</linearGradient>
			</defs>
			<text x="10" y="15" style={{
      fill: "url(#logo-gradient)"
    }} fontSize="1.1em" fontWeight="800">Umbrella Whether</text>
		</svg>;
};

var NavEntry = function NavEntry(_ref) {
  var navOpen = _ref.navOpen,
      icon = _ref.icon,
      text = _ref.text,
      active = _ref.active,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? _lodash.noop : _ref$onClick;
  return <NavItem active={active} onClick={onClick} columns="4fr 1fr 2fr">
			<_gridItems.Cell></_gridItems.Cell>
			<NavText col="2">
				{icon && <_reactFontawesome.FontAwesomeIcon icon={icon} />}
			</NavText>
			<NavText col="3">
				{navOpen && <span>{text}</span>}
			</NavText>
		</NavItem>;
};

var _default = function _default(_ref2) {
  var activeRoute = _ref2.activeRoute,
      allRoutes = _ref2.allRoutes,
      _ref2$toggleNavWidth = _ref2.toggleNavWidth,
      toggleNavWidth = _ref2$toggleNavWidth === void 0 ? _lodash.noop : _ref2$toggleNavWidth,
      _ref2$navOpen = _ref2.navOpen,
      navOpen = _ref2$navOpen === void 0 ? true : _ref2$navOpen,
      width = _ref2.width;
  var dispatch = (0, _reactRedux.useDispatch)();

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
      x: evt.target.getBoundingClientRect().right,
      y: evt.target.getBoundingClientRect().top
    });
  };

  var hideTooltip = function hideTooltip() {
    setTooltip(_objectSpread(_objectSpread({}, tooltip), {}, {
      show: false
    }));
  }; //Prevents tooltip from lingering when position of trigger element changes


  _react.default.useEffect(function () {
    var hideTooltip = function hideTooltip() {
      setTooltip({
        show: false
      });
    };

    hideTooltip();
  }, [navOpen]);

  return <Nav columns="1fr" rows="60px 2em 2em 2em 2em" width={width}>
			<_tooltip.default show={tooltip.show} x={tooltip.x} y={tooltip.y} text={navOpen ? "Collapse" : "Expand"} />
			<HeaderCell onClick={toggleNavWidth}>
				<Header navOpen={navOpen} width={width}>
					<_reactFontawesome.FontAwesomeIcon icon="umbrella" className="logo-icon" />
					{navOpen && <Logo />}
					{navOpen && <span onMouseOver={function (evt) {
          evt.stopPropagation();
          showTooltip(evt);
        }} onMouseOut={hideTooltip}>{"<"}</span>}
					{!navOpen && <span onMouseOver={function (evt) {
          evt.stopPropagation();
          showTooltip(evt);
        }} onMouseOut={hideTooltip}>{">"}</span>}
				</Header>
			</HeaderCell>
			<_gridItems.Cell row="2">
				<NavEntry active={activeRoute === allRoutes.home || /^details/.test(activeRoute)} onClick={function () {
        return dispatch((0, _routerSlice.updateRoute)(allRoutes.home));
      }} navOpen={navOpen} text="Home" icon="home" />
			</_gridItems.Cell>
			<_gridItems.Cell row="3">
				<NavEntry active={activeRoute === allRoutes.help} navOpen={navOpen} text="Help" icon="question-circle" />
			</_gridItems.Cell>
			<_gridItems.Cell row="4">
				<NavEntry active={activeRoute === allRoutes.about} navOpen={navOpen} text="About" icon="info-circle" />
			</_gridItems.Cell>
		</Nav>;
};

exports.default = _default;