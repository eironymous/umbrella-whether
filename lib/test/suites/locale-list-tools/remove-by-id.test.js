"use strict";

var _localeListTools = require("../../../app/locale-list-tools");

test('removeById throws error on undefined input', function () {
  var input = [undefined];

  var screwingUp = function screwingUp() {
    (0, _localeListTools.removeById)(input, input);
  };

  expect(screwingUp).toThrow(TypeError);
});
test('removeById throws error when first parameter is not a list', function () {
  var beingAGoofball = function beingAGoofball() {
    (0, _localeListTools.removeById)(1, "1");
  };

  expect(beingAGoofball).toThrow(TypeError);
});
test('removeById returns correctly-filtered list', function () {
  var inputList = [{
    id: "1"
  }, {
    id: "2"
  }, {
    id: "3"
  }, {
    id: "4"
  }, {
    id: "10"
  }];
  var expected = [{
    id: "2"
  }, {
    id: "3"
  }, {
    id: "4"
  }, {
    id: "10"
  }];
  var actual = (0, _localeListTools.removeById)(inputList, "1");
  expect(actual).toEqual(expected);
});