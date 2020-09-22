"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _gridItems = require("../../layout/grid-items");

var _resultsTable = _interopRequireDefault(require("../../layout/results-table"));

var _localeListTools = require("../../app/locale-list-tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Body = (0, _styledComponents.default)(_gridItems.Grid).withConfig({
  displayName: "home-body__Body",
  componentId: "sc-184zvwd-0"
})(["padding:2em;position:relative;min-width:700px;"]);
var ListCell = (0, _styledComponents.default)(_gridItems.Cell).withConfig({
  displayName: "home-body__ListCell",
  componentId: "sc-184zvwd-1"
})(["overflow-y:auto;::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{opacity:0;}::-webkit-scrollbar-thumb{border-radius:10px;background:#4A4E69;}scrollbar-color:#4A4E69;scrollbar-width:4px;"]);

var WaitingText = _styledComponents.default.div.withConfig({
  displayName: "home-body__WaitingText",
  componentId: "sc-184zvwd-2"
})(["font-weight:800;text-align:left;font-size:1em;letter-spacing:2px;position:relative;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);"]);

var HomeList = function HomeList(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      loaded = _ref.loaded;

  var _React$useState = _react.default.useState(items),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      list = _React$useState2[0],
      setList = _React$useState2[1];

  _react.default.useEffect(function () {
    var updateList = function updateList() {
      var newList = [];

      if (items.length) {
        items.forEach(function (item) {
          newList.push(item);
        });
        var sorted = (0, _localeListTools.reorderByFavorite)(newList);
        setList(sorted);
      }
    };

    updateList();
  }, [items]);

  if (!items) return null;
  return <Body rows="80vh" columns="1fr">
			<ListCell>
				{loaded && <_resultsTable.default items={list} />}
				{!loaded && <WaitingText>Please wait while we poke our heads outside...</WaitingText>}
			</ListCell>
		</Body>;
};

var _default = HomeList;
exports.default = _default;