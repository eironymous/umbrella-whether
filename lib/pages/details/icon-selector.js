"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconForKeyword = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getIconForKeyword = function getIconForKeyword(keyword, observationTime) {
  switch (true) {
    case /clear/i.test(keyword) || /sunny/i.test(keyword):
      {
        if (beforeNight(observationTime)) {
          return <_reactFontawesome.FontAwesomeIcon icon={["far", "sun"]} className="weather-icon" />;
        } else {
          return <_reactFontawesome.FontAwesomeIcon icon="moon" className="weather-icon" />;
        }
      }

    case /partly cloudy/i.test(keyword):
      {
        if (beforeNight(observationTime)) {
          return <_reactFontawesome.FontAwesomeIcon icon="cloud-sun" className="weather-icon" />;
        } else {
          return <_reactFontawesome.FontAwesomeIcon icon="cloud-moon" className="weather-icon" />;
        }
      }

    case /cloudy/i.test(keyword) || /overcast/i.test(keyword):
      {
        return <_reactFontawesome.FontAwesomeIcon icon="cloud" className="weather-icon" />;
      }

    case /thundery/i.test(keyword):
      {
        return <_reactFontawesome.FontAwesomeIcon icon="bolt" className="weather-icon" />;
      }

    case /fog/i.test(keyword) || /haze/i.test(keyword):
      {
        return <_reactFontawesome.FontAwesomeIcon icon="smog" className="weather-icon" />;
      }

    case /blowing/i.test(keyword) || /blizzard/i.test(keyword):
      {
        return <_reactFontawesome.FontAwesomeIcon icon="wind" className="weather-icon" />;
      }

    case /snow/i.test(keyword):
      {
        return <_reactFontawesome.FontAwesomeIcon icon="snowflake" className="weather-icon" />;
      }

    case /drizzle/i.test(keyword):
      {
        if (beforeNight(observationTime)) {
          return <_reactFontawesome.FontAwesomeIcon icon="cloud-sun-rain" className="weather-icon" />;
        } else {
          return <_reactFontawesome.FontAwesomeIcon icon="cloud-moon-rain" className="weather-icon" />;
        }
      }

    case (/light/i.test(keyword) || /patchy/i.test(keyword)) && /rain/i.test(keyword):
      {
        if (beforeNight(observationTime)) {
          return <_reactFontawesome.FontAwesomeIcon icon="cloud-sun-rain" className="weather-icon" />;
        } else {
          return <_reactFontawesome.FontAwesomeIcon icon="cloud-moon-rain" className="weather-icon" />;
        }
      }

    case /moderate/i.test(keyword) && /rain/i.test(keyword):
      {
        return <_reactFontawesome.FontAwesomeIcon icon="cloud-rain" className="weather-icon" />;
      }

    case /rain/i.test(keyword) && /heavy/i.test(keyword):
      {
        return <_reactFontawesome.FontAwesomeIcon icon="cloud-showers-heavy" className="weather-icon" />;
      }

    default:
      return <_reactFontawesome.FontAwesomeIcon icon="umbrella" className="weather-icon" />;
  }
};

exports.getIconForKeyword = getIconForKeyword;

var beforeNight = function beforeNight(time) {
  return time.localeCompare("20:00") < 0 && time.localeCompare("6:00") > 0;
};