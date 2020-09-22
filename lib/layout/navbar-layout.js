"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _gridItems = require("./grid-items");

var _navList = _interopRequireDefault(require("./nav-list"));

var _header = _interopRequireDefault(require("./header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var NavbarLayout = _styledComponents.default.div.withConfig({
  displayName: "navbar-layout__NavbarLayout",
  componentId: "sc-1gy9in4-0"
})(["position:relative;height:100%;min-height:600px;display:flex;"]);

var NavCell = _styledComponents.default.div.withConfig({
  displayName: "navbar-layout__NavCell",
  componentId: "sc-1gy9in4-1"
})(["position:relative;overflow:hidden;width:", ";transition-property:width;transition-duration:0.5s;background-color:#4A4E69;user-select:none;z-index:10;min-height:600px;"], function (p) {
  return p.width ? p.width : "initial";
});

var Body = _styledComponents.default.div.withConfig({
  displayName: "navbar-layout__Body",
  componentId: "sc-1gy9in4-2"
})(["transition-property:width;transition-duration:0.5s;width:", ";overflow:visible;"], function (p) {
  return p.navWidth ? "calc(100% - ".concat(p.navWidth, ")") : "100%";
});

var BodyContents = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "navbar-layout__BodyContents",
  componentId: "sc-1gy9in4-3"
})(["transition-property:width;transition-duration:0.5s;overflow:auto;width:100%;height:100%;"]);

var _default = function _default(_ref) {
  var Main = _ref.Main,
      activeRoute = _ref.activeRoute,
      allRoutes = _ref.allRoutes;

  var _React$useState = _react.default.useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      navbarExpanded = _React$useState2[0],
      setNavbarExpanded = _React$useState2[1];

  var toggleNavbar = function toggleNavbar() {
    setNavbarExpanded(!navbarExpanded);
  };

  var navWidth = navbarExpanded ? "225px" : "70px";
  if (Main === undefined) return null;
  return <NavbarLayout rows="100vh">
			<NavCell width={navWidth}>
				<_navList.default activeRoute={activeRoute} allRoutes={allRoutes} toggleNavWidth={toggleNavbar} navOpen={navbarExpanded} width={navWidth} />
			</NavCell>
			<Body navWidth={navWidth} col="2">
				<BodyContents rows="10vh 90vh" columns="1fr">
					<_gridItems.Cell>
						<_header.default />
					</_gridItems.Cell>
					<_gridItems.Cell row="2">
						<Main />
					</_gridItems.Cell>
				</BodyContents>
			</Body>
		</NavbarLayout>;
};

exports.default = _default;