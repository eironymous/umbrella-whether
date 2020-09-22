"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _routerSlice = require("./state/router-slice");

var _index = _interopRequireDefault(require("./pages/home/index"));

var _index2 = _interopRequireDefault(require("./pages/details/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  var currentRoute = (0, _reactRedux.useSelector)(_routerSlice.selectActive);
  var allRoutes = (0, _reactRedux.useSelector)(_routerSlice.selectAllRoutes);

  switch (true) {
    case currentRoute === allRoutes.home:
      return <_index.default activeRoute={currentRoute} allRoutes={allRoutes} />;

    case /^details/.test(currentRoute):
      {
        //Split the route into route + id
        var portions = currentRoute.split(/-(.+)/); //Isolate the id from the route pattern

        var id = portions[1]; //Use the id to fetch the correct details

        return <_index2.default activeRoute={currentRoute} allRoutes={allRoutes} id={id} />;
      }

    default:
      return <_index.default activeRoute={currentRoute} allRoutes={allRoutes} />;
  }
};

exports.default = _default;