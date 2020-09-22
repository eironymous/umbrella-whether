"use strict";

var _localeListTools = require("../../../app/locale-list-tools");

test('invalid input causes error', function () {
  var input = [1, 2, 3];

  var aSillyMistake = function aSillyMistake() {
    (0, _localeListTools.sortLocaleList)(input);
  };

  expect(aSillyMistake).toThrow(TypeError);
});
test('valid input is correctly sorted', function () {
  var input = [{
    city: "m"
  }, {
    city: "A"
  }, {
    city: "qw"
  }, {
    city: "a"
  }];
  var expected = [{
    city: "a"
  }, {
    city: "A"
  }, {
    city: "m"
  }, {
    city: "qw"
  }];
  var actual = (0, _localeListTools.sortLocaleList)(input);
  expect(actual).toEqual(expected);
});