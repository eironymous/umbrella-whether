"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _routerSlice = _interopRequireDefault(require("./router-slice"));

var _localesSlice = _interopRequireDefault(require("./locales-slice"));

var _notesSlice = _interopRequireDefault(require("./notes-slice"));

var _appSettingsSlice = _interopRequireDefault(require("./app-settings-slice"));

var _lodash = require("lodash");

var _saveLoad = require("./persistence/save-load");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    router: _routerSlice.default,
    locales: _localesSlice.default,
    notes: _notesSlice.default,
    settings: _appSettingsSlice.default
  },
  preloadedState: (0, _saveLoad.loadState)()
}); //Persist the current state tree to storage at most every 10 seconds

store.subscribe((0, _lodash.throttle)(function () {
  return (0, _saveLoad.saveState)(store.getState(), 10000);
}));
var _default = store;
exports.default = _default;