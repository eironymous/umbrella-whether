"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _weatherItem = require("../../../app/weather-item");

var MERGE_LIST_CONSTANTS = _interopRequireWildcard(require("../../test-data/merge-lists-constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Ensures getWeatherItem appropriately generates an object when input is
//correct.
test('weatheritem appropriately generated', function () {
  var expected = MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A;
  var actual = (0, _weatherItem.getWeatherItem)("1", true, "New York", "United States of America", "2019-09-07 08:14", "12:14 PM", "-4.0", 13, "m", "http://www.website.com", ["Sunny"], 0, "N", 0, 0, 90, 0, 13, 4, 16);
  expect(actual).toEqual(expected);
});