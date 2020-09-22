"use strict";

var _localeListTools = require("../../../app/locale-list-tools");

test('generateListById throws error on invalid input', function () {
  var input = {
    total: "nonsense"
  };
  expect(function () {
    return (0, _localeListTools.generateListById)(input);
  }).toThrow(TypeError);
});
test('generateListById with no matching ids returns empty array', function () {
  var inputList = [{
    id: "0"
  }, {
    id: "1"
  }, {
    id: "2"
  }, {
    id: "3"
  }];
  var idList = ["-1", "5", "10"];
  var actual = (0, _localeListTools.generateListById)(inputList, idList);
  expect(actual).toEqual([]);
});
test('generateListById correctly returns matching ids', function () {
  var inputList = [{
    id: "a"
  }, {
    id: "0"
  }, {
    id: "-1"
  }, {
    id: "."
  }, {
    id: "test-id-5"
  }];
  var idList = ["-1", ".", "test-id-5", "!!!"];
  var expected = [{
    id: "-1"
  }, {
    id: "."
  }, {
    id: "test-id-5"
  }];
  var actual = (0, _localeListTools.generateListById)(inputList, idList);
  expect(actual).toEqual(expected);
});