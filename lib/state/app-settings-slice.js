"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectFirstVisit = exports.selectUnits = exports.setFirstVisit = exports.setUnits = exports.appSettingsSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var CONSTANTS = _interopRequireWildcard(require("../app/constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var appSettingsSlice = (0, _toolkit.createSlice)({
  name: "settings",
  initialState: {
    units: CONSTANTS.METRIC_SCALE,
    firstVisit: true
  },
  reducers: {
    setUnits: function setUnits(state, _ref) {
      var payload = _ref.payload;
      state.units = payload;
    },
    setFirstVisit: function setFirstVisit(state, _ref2) {
      var payload = _ref2.payload;
      state.firstVisit = payload;
    }
  }
});
exports.appSettingsSlice = appSettingsSlice;
var _appSettingsSlice$act = appSettingsSlice.actions,
    setUnits = _appSettingsSlice$act.setUnits,
    setFirstVisit = _appSettingsSlice$act.setFirstVisit;
exports.setFirstVisit = setFirstVisit;
exports.setUnits = setUnits;

var selectUnits = function selectUnits(state) {
  return state.settings.units;
};

exports.selectUnits = selectUnits;

var selectFirstVisit = function selectFirstVisit(state) {
  return state.settings.firstVisit;
};

exports.selectFirstVisit = selectFirstVisit;
var _default = appSettingsSlice.reducer;
exports.default = _default;