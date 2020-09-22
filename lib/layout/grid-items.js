"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = exports.Grid = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isArray = Array.isArray;

var Grid = _styledComponents.default.div.withConfig({
  displayName: "grid-items__Grid",
  componentId: "sc-185sg4m-0"
})(["position:relative;height:100%;width:100%;display:grid;margin:0;padding:0;box-sizing:border-box;grid-template-columns:", ";grid-template-rows:", ";grid-gap:", ";"], function (p) {
  switch (true) {
    case p.columns && isArray(p.columns):
      return p.columns.join(" ");

    case p.columns && !isArray(p.columns):
      return p.columns;

    default:
      return "auto";
  }
}, function (p) {
  switch (true) {
    case p.rows && isArray(p.rows):
      return p.rows.join(" ");

    case p.rows && !isArray(p.rows):
      return p.rows;

    default:
      return "auto";
  }
}, function (p) {
  return p.gridGap ? p.gridGap : "0";
});

exports.Grid = Grid;

var Cell = _styledComponents.default.div.withConfig({
  displayName: "grid-items__Cell",
  componentId: "sc-185sg4m-1"
})(["position:relative;grid-column:", ";grid-row:", ";height:100%;width:100%;margin:0;padding:0;box-sizing:border-box;"], function (p) {
  return p.col ? p.col : "1";
}, function (p) {
  return p.row ? p.row : "1";
});

exports.Cell = Cell;