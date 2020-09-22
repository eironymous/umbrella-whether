"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _navbarLayout = _interopRequireDefault(require("../../layout/navbar-layout"));

var _localesSlice = require("../../state/locales-slice");

var _detailCard = _interopRequireDefault(require("./detail-card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Body = function Body(_ref) {
  var locale = _ref.locale;
  return <_detailCard.default locale={locale} />;
};

var Details = function Details(_ref2) {
  var id = _ref2.id,
      activeRoute = _ref2.activeRoute,
      allRoutes = _ref2.allRoutes;
  var locale = (0, _reactRedux.useSelector)(function (state) {
    return (0, _localesSlice.selectLocaleById)(state, id);
  });
  return <_navbarLayout.default Main={function () {
    return <Body locale={locale} />;
  }} activeRoute={activeRoute} allRoutes={allRoutes} />;
};

var _default = Details;
exports.default = _default;