"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectAllRoutes = exports.selectActive = exports.updateRoute = exports.routerSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

/**
 * routerSlice stores state information related to the current active route as well as all available routes.
 */
var routerSlice = (0, _toolkit.createSlice)({
  name: "router",
  initialState: {
    active: "home",
    allRoutes: {
      home: "home",
      details: "details-"
    }
  },
  reducers: {
    updateRoute: function updateRoute(state, _ref) {
      var payload = _ref.payload;
      state.active = payload;
    }
  }
});
exports.routerSlice = routerSlice;
var updateRoute = routerSlice.actions.updateRoute;
exports.updateRoute = updateRoute;

var selectActive = function selectActive(state) {
  return state.router.active;
};

exports.selectActive = selectActive;

var selectAllRoutes = function selectAllRoutes(state) {
  return state.router.allRoutes;
};

exports.selectAllRoutes = selectAllRoutes;
var _default = routerSlice.reducer;
exports.default = _default;