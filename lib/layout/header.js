"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _reactDetectOffline = require("react-detect-offline");

var _gridItems = require("./grid-items");

var _searchField = _interopRequireDefault(require("../components/search-field"));

var _routerSlice = require("../state/router-slice");

var _localesSlice = require("../state/locales-slice");

var _appSettingsSlice = require("../state/app-settings-slice");

var _manageQueryResults = require("../app/manage-query-results");

var _fetchWeatherForLocale = require("../app/fetch-weather-for-locale");

var _localeListTools = require("../app/locale-list-tools");

var _tooltip = _interopRequireDefault(require("../components/tooltip"));

var CONSTANTS = _interopRequireWildcard(require("../app/constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Header = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "header__Header",
  componentId: "sc-1hqh4v0-0"
})(["width:100%;padding-left:2em;background-color:#4A4E69;grid-gap:10px;height:60px;"]);
var HeaderCell = (0, _styledComponents.default)(_gridItems.Cell).withConfig({
  displayName: "header__HeaderCell",
  componentId: "sc-1hqh4v0-1"
})(["line-height:60px;font-size:1em;"]);

var ScaleButton = _styledComponents.default.div.withConfig({
  displayName: "header__ScaleButton",
  componentId: "sc-1hqh4v0-2"
})(["position:relative;right:-90%;top:50%;transform:translateY(-50%);text-align:center;font-weight:800;line-height:40px;opacity:0.7;cursor:pointer;border:2px solid rgba(255,255,255,0.7);border-radius:10px;width:40px;height:40px;user-select:none;:hover{opacity:1;background-color:rgba(255,255,255,0.1);}"]);

var _default = function _default() {
  var dispatch = (0, _reactRedux.useDispatch)();
  var allLocales = (0, _reactRedux.useSelector)(_localesSlice.selectLocales);

  var searchRef = _react.default.useRef();

  var scale = (0, _reactRedux.useSelector)(_appSettingsSlice.selectUnits);

  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      responseReceived = _React$useState2[0],
      setResponseReceived = _React$useState2[1];

  var _React$useState3 = _react.default.useState(""),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      city = _React$useState4[0],
      setCity = _React$useState4[1];

  var _React$useState5 = _react.default.useState({
    show: false,
    x: 0,
    y: 0
  }),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      tooltip = _React$useState6[0],
      setTooltip = _React$useState6[1]; //Once the new city has been added to the list, or upon receipt of an error, redirect


  _react.default.useEffect(function () {
    if (responseReceived) {
      var newLocale = {};

      try {
        newLocale = (0, _localeListTools.getLocaleByCity)(allLocales.locales, city);
      } catch (err) {
        console.log(err); //Redirect to error page
      } finally {
        if (newLocale !== undefined) {
          dispatch((0, _routerSlice.updateRoute)("details-".concat(newLocale.id)));
        } else {//Redirect to error page
        }
      }
    }
  }, [allLocales, responseReceived, dispatch, city]);

  var handleUnitChange = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var copy, newList, parsed, _copy, _newList, _parsed;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(scale.localeCompare(CONSTANTS.METRIC_SCALE) === 0)) {
                _context.next = 12;
                break;
              }

              dispatch((0, _appSettingsSlice.setUnits)(CONSTANTS.FAHRENHEIT_SCALE));

              if (!allLocales.locales.length) {
                _context.next = 10;
                break;
              }

              copy = _toConsumableArray(allLocales.locales);
              _context.next = 6;
              return (0, _fetchWeatherForLocale.fetchUpdates)(copy, CONSTANTS.FAHRENHEIT_SCALE);

            case 6:
              newList = _context.sent;
              parsed = [];
              newList.forEach(function (result) {
                parsed.push((0, _manageQueryResults.parseResults)(result));
              });
              dispatch((0, _localesSlice.mergeLocales)(parsed));

            case 10:
              _context.next = 21;
              break;

            case 12:
              dispatch((0, _appSettingsSlice.setUnits)(CONSTANTS.METRIC_SCALE));

              if (!allLocales.locales.length) {
                _context.next = 21;
                break;
              }

              _copy = _toConsumableArray(allLocales.locales);
              _context.next = 17;
              return (0, _fetchWeatherForLocale.fetchUpdates)(_copy, CONSTANTS.METRIC_SCALE);

            case 17:
              _newList = _context.sent;
              _parsed = [];

              _newList.forEach(function (result) {
                _parsed.push((0, _manageQueryResults.parseResults)(result));
              });

              dispatch((0, _localesSlice.mergeLocales)(_parsed));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleUnitChange() {
      return _ref.apply(this, arguments);
    };
  }();

  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(val) {
      var getWeather, response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              getWeather = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  var result;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return (0, _fetchWeatherForLocale.fetchWeather)(val);

                        case 2:
                          result = _context2.sent;
                          return _context2.abrupt("return", (0, _manageQueryResults.parseResults)(result));

                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function getWeather() {
                  return _ref3.apply(this, arguments);
                };
              }();

              _context3.next = 3;
              return getWeather(val);

            case 3:
              response = _context3.sent;

              if (!(response.success === false)) {
                _context3.next = 7;
                break;
              }

              if (searchRef.current) {
                setTooltip({
                  show: true,
                  x: searchRef.current.getBoundingClientRect().right - 100,
                  y: searchRef.current.getBoundingClientRect().bottom
                });
                setTimeout(function () {
                  return setTooltip(_objectSpread(_objectSpread({}, tooltip), {}, {
                    show: false
                  }));
                }, 5000);
              }

              return _context3.abrupt("return");

            case 7:
              setCity(response.city);
              setResponseReceived(true);

              if (allLocales.locales.length) {
                dispatch((0, _localesSlice.mergeLocales)([response]));
              } else {
                dispatch((0, _localesSlice.setLocales)([response]));
              }

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleSubmitWhenOffline = function handleSubmitWhenOffline() {
    if (searchRef.current) {
      setTooltip({
        show: true,
        x: searchRef.current.getBoundingClientRect().right - 100,
        y: searchRef.current.getBoundingClientRect().bottom
      });
      setTimeout(function () {
        return setTooltip(_objectSpread(_objectSpread({}, tooltip), {}, {
          show: false
        }));
      }, 5000);
    }
  };

  return <Header rows="60px" columns="0fr 0fr 1fr">
			<_reactDetectOffline.Online>
				<_tooltip.default show={tooltip.show} x={tooltip.x} y={tooltip.y} text="Your search returned no results! :( Please try again." />
			</_reactDetectOffline.Online>
			<_reactDetectOffline.Offline>
				<_tooltip.default show={tooltip.show} x={tooltip.x} y={tooltip.y} text="Search function is not available when you're offline! :( Check your network connection and try again." />
			</_reactDetectOffline.Offline>
			<HeaderCell>
				Search:
			</HeaderCell>
			<_gridItems.Cell col="2">
				<_reactDetectOffline.Online>
					<_searchField.default onSubmit={handleSubmit} searchRef={searchRef} />
				</_reactDetectOffline.Online>
				<_reactDetectOffline.Offline>
					<_searchField.default onSubmit={handleSubmitWhenOffline} searchRef={searchRef} />
				</_reactDetectOffline.Offline>
			</_gridItems.Cell>
			<HeaderCell col="3">
				<ScaleButton onClick={handleUnitChange}>
					{scale.localeCompare(CONSTANTS.METRIC_SCALE) === 0 ? "°C" : "°F"}
				</ScaleButton>
			</HeaderCell>
		</Header>;
};

exports.default = _default;