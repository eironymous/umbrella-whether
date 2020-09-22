"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectLocaleByCity = exports.selectLocaleById = exports.selectLocales = exports.deleteById = exports.setFavorite = exports.mergeLocales = exports.setLocales = exports.localesSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _lodash = require("lodash");

var _localeListTools = require("../app/locale-list-tools");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var localesSlice = (0, _toolkit.createSlice)({
  name: "locales",
  initialState: {
    locales: []
  },
  reducers: {
    //Overwrite the list of locales
    setLocales: function setLocales(state, _ref) {
      var payload = _ref.payload;
      var sorted = payload.length ? (0, _localeListTools.sortLocaleList)(payload) : payload;
      state.locales = sorted;
    },
    //Merge a list of locales with the extant list
    mergeLocales: function mergeLocales(state, _ref2) {
      var payload = _ref2.payload;

      var allLocales = _toConsumableArray(state.locales);

      if (allLocales.length === 0) {
        state.locales = [payload];
      } else {
        var merged = (0, _localeListTools.mergeLists)(allLocales, payload, true);
        var sorted = (0, _localeListTools.sortLocaleList)(merged);
        state.locales = sorted;
      }
    },
    //Set favorite
    setFavorite: function setFavorite(state, _ref3) {
      var payload = _ref3.payload;
      var allLocales = payload.allLocales; //Find the index of the locale in question

      var idx = (0, _lodash.findIndex)(allLocales, function (item) {
        return item.id === payload.id;
      });

      if (idx !== -1) {
        var item = _objectSpread({}, allLocales[idx]);

        item.favorited = payload.favorite;
        var merged = (0, _localeListTools.mergeLists)(allLocales, [item]);
        var sorted = (0, _localeListTools.sortLocaleList)(merged);
        state.locales = sorted;
      }
    },
    //Delete by id
    deleteById: function deleteById(state, _ref4) {
      var payload = _ref4.payload;
      var allLocales = payload.allLocales; //Find the index of the locale in question

      var idx = (0, _lodash.findIndex)(allLocales, function (item) {
        return item.id === payload.id;
      });

      if (idx !== -1) {
        var newList = allLocales.filter(function (_item, i) {
          return i !== idx;
        });
        state.locales = newList;
      }
    }
  }
});
exports.localesSlice = localesSlice;
var _localesSlice$actions = localesSlice.actions,
    setLocales = _localesSlice$actions.setLocales,
    mergeLocales = _localesSlice$actions.mergeLocales,
    setFavorite = _localesSlice$actions.setFavorite,
    deleteById = _localesSlice$actions.deleteById;
exports.deleteById = deleteById;
exports.setFavorite = setFavorite;
exports.mergeLocales = mergeLocales;
exports.setLocales = setLocales;

var selectLocales = function selectLocales(state) {
  return state.locales;
};

exports.selectLocales = selectLocales;

var selectLocaleById = function selectLocaleById(state, id) {
  return (0, _localeListTools.getLocaleById)(state.locales.locales, id);
};

exports.selectLocaleById = selectLocaleById;

var selectLocaleByCity = function selectLocaleByCity(state, city) {
  return (0, _localeListTools.getLocaleByCity)(state.locales.locales, city);
};

exports.selectLocaleByCity = selectLocaleByCity;
var _default = localesSlice.reducer;
exports.default = _default;