"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _router = _interopRequireDefault(require("./router"));

var _reactRedux = require("react-redux");

var _routerSlice = require("./state/router-slice");

require("./App.css");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _freeRegularSvgIcons = require("@fortawesome/free-regular-svg-icons");

var _state = _interopRequireDefault(require("./state/state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Add fontawesome import to library
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faUmbrella, _freeSolidSvgIcons.faSearch, _freeRegularSvgIcons.faEye, _freeSolidSvgIcons.faMinusCircle, _freeSolidSvgIcons.faHome, _freeSolidSvgIcons.faInfoCircle, _freeSolidSvgIcons.faQuestionCircle, _freeSolidSvgIcons.faHeart, _freeRegularSvgIcons.faHeart, _freeRegularSvgIcons.faSun, _freeSolidSvgIcons.faMoon, _freeSolidSvgIcons.faCloudSun, _freeSolidSvgIcons.faCloudMoon, _freeSolidSvgIcons.faCloudSunRain, _freeSolidSvgIcons.faCloudMoonRain, _freeSolidSvgIcons.faSmog, _freeSolidSvgIcons.faSnowflake, _freeSolidSvgIcons.faWind, _freeSolidSvgIcons.faCloudRain, _freeSolidSvgIcons.faBolt, _freeSolidSvgIcons.faCloudShowersHeavy, _freeSolidSvgIcons.faSurprise, _freeSolidSvgIcons.faStickyNote, _freeSolidSvgIcons.faEdit, _freeSolidSvgIcons.faEraser, _freeSolidSvgIcons.faPaperPlane, _freeSolidSvgIcons.faTrash);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var AppWrapper = function AppWrapper() {
  //Wrap app in a provider
  return <_reactRedux.Provider store={_state.default}>
      <App />
    </_reactRedux.Provider>;
};

function App() {
  var dispatch = (0, _reactRedux.useDispatch)();
  dispatch((0, _routerSlice.updateRoute)("home"));
  return <div className="App">
        <_router.default />
    </div>;
}

var _default = AppWrapper;
exports.default = _default;