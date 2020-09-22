"use strict";

var _localeListTools = require("../../../app/locale-list-tools");

test('reorderByFavorite throws error with invalid input', function () {
  var input = [undefined, 1, "hello"];

  var makingAMistake = function makingAMistake() {
    (0, _localeListTools.reorderByFavorite)(input);
  };

  expect(makingAMistake).toThrow(TypeError);
});
test('reorderByFavorite with valid input', function () {
  var input = [{
    id: "1",
    city: "a",
    favorited: false
  }, {
    id: "2",
    city: "b",
    favorited: true
  }, {
    id: "3",
    city: "A",
    favorited: true
  }, {
    id: "4",
    city: "z",
    favorited: true
  }, {
    id: "5",
    city: "z",
    favorited: false
  }];
  var expected = [{
    id: "3",
    city: "A",
    favorited: true
  }, {
    id: "2",
    city: "b",
    favorited: true
  }, {
    id: "4",
    city: "z",
    favorited: true
  }, {
    id: "1",
    city: "a",
    favorited: false
  }, {
    id: "5",
    city: "z",
    favorited: false
  }];
  var actual = (0, _localeListTools.reorderByFavorite)(input);
  expect(actual).toEqual(expected);
});