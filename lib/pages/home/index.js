"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDetectOffline = require("react-detect-offline");

var _navbarLayout = _interopRequireDefault(require("../../layout/navbar-layout"));

var _homeBody = _interopRequireDefault(require("./home-body"));

var _manageQueryResults = require("../../app/manage-query-results");

var _fetchWeatherForLocale = require("../../app/fetch-weather-for-locale");

var _localesSlice = require("../../state/locales-slice");

var _notesSlice = require("../../state/notes-slice");

var _appSettingsSlice = require("../../state/app-settings-slice");

var _reactRedux = require("react-redux");

var _emptyState = _interopRequireDefault(require("./empty-state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultQueries = ["Beijing", "Buenos Aires", "Cairo", "Chongqing", "Delhi", "Dhaka", "Istanbul", "Karachi", "Mexico City", "Mumbai", "New York", "Osaka", "Sao Paulo", "Shanghai", "Tokyo"];

var Body = function Body() {
  var dispatch = (0, _reactRedux.useDispatch)();

  var _React$useState = _react.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loaded = _React$useState2[0],
      setLoaded = _React$useState2[1];

  var storedLocales = (0, _reactRedux.useSelector)(_localesSlice.selectLocales);
  var firstVisit = (0, _reactRedux.useSelector)(_appSettingsSlice.selectFirstVisit);
  var units = (0, _reactRedux.useSelector)(_appSettingsSlice.selectUnits);

  _react.default.useEffect(function () {
    var getWeatherList = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result, newList;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = []; //If first visit, use default query list, else update existing list

                if (!firstVisit) {
                  _context.next = 8;
                  break;
                }

                _context.next = 4;
                return (0, _fetchWeatherForLocale.fetchList)(defaultQueries, units);

              case 4:
                result = _context.sent;
                dispatch((0, _appSettingsSlice.setFirstVisit)(false));
                _context.next = 12;
                break;

              case 8:
                if (!(!firstVisit && storedLocales.locales.length)) {
                  _context.next = 12;
                  break;
                }

                _context.next = 11;
                return (0, _fetchWeatherForLocale.fetchUpdates)(storedLocales.locales, units);

              case 11:
                result = _context.sent;

              case 12:
                //Generate and populate list of fresh results
                newList = [];

                if (result.length) {
                  result.forEach(function (res) {
                    return newList.push((0, _manageQueryResults.parseResults)(res));
                  });
                }

                if (storedLocales.locales.length) {
                  dispatch((0, _localesSlice.mergeLocales)(newList));
                } else {
                  dispatch((0, _localesSlice.setLocales)(newList)); //Clear out notes, just in case

                  dispatch((0, _notesSlice.setNotes)([]));
                }

                setLoaded(true);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getWeatherList() {
        return _ref.apply(this, arguments);
      };
    }();

    getWeatherList();
    setLoaded(true);
  }, [storedLocales.locales, dispatch, firstVisit, units]);

  if (storedLocales.locales === undefined || storedLocales.locales.length === 0) {
    return <_emptyState.default />;
  }

  return <_homeBody.default items={storedLocales.locales} loaded={loaded} />;
};

var OfflineBody = function OfflineBody() {
  var storedLocales = (0, _reactRedux.useSelector)(_localesSlice.selectLocales);

  if (storedLocales.locales === undefined || storedLocales.locales.length === 0) {
    return <_emptyState.default />;
  }

  return <_homeBody.default items={storedLocales.locales} />;
};

var _default = function _default(_ref2) {
  var activeRoute = _ref2.activeRoute,
      allRoutes = _ref2.allRoutes;
  return <>
			<_reactDetectOffline.Online>
				<_navbarLayout.default Main={Body} activeRoute={activeRoute} allRoutes={allRoutes} />
			</_reactDetectOffline.Online>
			<_reactDetectOffline.Offline>
				<_navbarLayout.default Main={OfflineBody} activeRoute={activeRoute} allRoutes={allRoutes} />
			</_reactDetectOffline.Offline>
		</>;
};

exports.default = _default;