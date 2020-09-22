"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _localeListTools = require("../../../app/locale-list-tools");

var MERGE_LIST_CONSTANTS = _interopRequireWildcard(require("../../test-data/merge-lists-constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

test('mergeLists with invalid input', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A];
  var list2 = [1];

  var havingABadTime = function havingABadTime() {
    (0, _localeListTools.mergeLists)(list1, list2);
  };

  expect(havingABadTime).toThrow(TypeError);
}); //FAVORITES INCLUDED

test('mergeLists with favorites included, no changes', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var actual = (0, _localeListTools.mergeLists)(list1, list2);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites included, change to one existing entry', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A, MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL];
  var actual = (0, _localeListTools.mergeLists)(list1, list2);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites included, changes to some entries', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_2_AB_FAV_INCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var actual = (0, _localeListTools.mergeLists)(list1, list2);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites included, changes to all entries', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_B];
  var expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_2_AB_FAV_INCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_3_AB_FAV_INCL];
  var actual = (0, _localeListTools.mergeLists)(list1, list2);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites included, no change to existing entries, new entry', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var actual = (0, _localeListTools.mergeLists)(list1, list2);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites included, change to existing entry, and new entry', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var actual = (0, _localeListTools.mergeLists)(list1, list2);
  expect(actual).toEqual(expect.arrayContaining(expected));
}); // FAVORITES EXCLUDED

test('mergeLists with favorites excluded, no changes', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var actual = (0, _localeListTools.mergeLists)(list1, list2, true);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites excluded, change to one existing entry', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A, MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_EXCL];
  var actual = (0, _localeListTools.mergeLists)(list1, list2, true);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites excluded, changes to some entries', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_2_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var actual = (0, _localeListTools.mergeLists)(list1, list2, true);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites excluded, changes to all entries', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_B];
  var expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_2_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.MERGED_ITEM_3_AB_FAV_EXCL];
  var actual = (0, _localeListTools.mergeLists)(list1, list2, true);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites excluded, no change to existing entries, new entry', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var actual = (0, _localeListTools.mergeLists)(list1, list2, true);
  expect(actual).toEqual(expect.arrayContaining(expected));
});
test('mergeLists with favorites excluded, change to existing entry, and new entry', function () {
  var list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
  var list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_EXCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  var actual = (0, _localeListTools.mergeLists)(list1, list2, true);
  expect(actual).toEqual(expect.arrayContaining(expected));
});