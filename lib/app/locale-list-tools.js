"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocaleByCity = exports.getLocaleById = exports.removeById = exports.reorderByFavorite = exports.generateListById = exports.sortLocaleList = exports.mergeLists = void 0;

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Merges two lists of WeatherItems, ensuring no duplicate entries are added
 * @param {[]} oldList
 * @param {[]} newList
 * @param {boolean} omitFavorites - prevents merging of favorites, used when merging newly-fetched data into existing store
 */
var mergeLists = function mergeLists(oldList, newList) {
  var omitFavorites = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  //Copy input arrays
  var oldCopy = oldList.slice();
  var newCopy = newList.slice(); //Begin by extracting exactly matching values and adding to the output array

  var output = (0, _lodash.intersectionWith)(oldCopy, newCopy, _lodash.isEqual); //Pull distinct values from both arrays

  var oldDifference = (0, _lodash.differenceWith)(oldCopy, newCopy, _lodash.isEqual);
  var newDifference = (0, _lodash.differenceWith)(newCopy, oldCopy, _lodash.isEqual); //Store the names of any cities with updated entries

  var copiedCities = []; //Compare the resulting arrays

  if (!(0, _lodash.isEmpty)(oldDifference)) {
    oldDifference.forEach(function (entry) {
      var idx = (0, _lodash.findIndex)(newDifference, function (o) {
        return o.city.localeCompare(entry.city) === 0;
      }); //If a matching index is not found, push the entry without changes

      if (idx === -1) {
        output.push(_objectSpread({}, entry));
      } else {
        //Else copy all relevant values to new object...
        var updatedEntry = _objectSpread({}, entry);

        updatedEntry.city = newList[idx].city;
        updatedEntry.country = newList[idx].country; //...omitting favorited field if appropriate

        updatedEntry.favorited = omitFavorites ? entry.favorited : newList[idx].favorited;
        updatedEntry.localTime = newList[idx].localTime;
        updatedEntry.observationTime = newList[idx].observationTime;
        updatedEntry.utcOffset = newList[idx].utcOffset;
        updatedEntry.temperature = newList[idx].temperature;
        updatedEntry.scale = newList[idx].scale;
        updatedEntry.iconUrl = newList[idx].iconUrl;
        updatedEntry.descriptions = newList[idx].descriptions;
        updatedEntry.windDirection = newList[idx].windDirection;
        updatedEntry.windSpeed = newList[idx].windSpeed;
        updatedEntry.pressure = newList[idx].pressure;
        updatedEntry.precipitation = newList[idx].precipitation;
        updatedEntry.humidity = newList[idx].humidity;
        updatedEntry.cloudCover = newList[idx].cloudCover;
        updatedEntry.feelsLike = newList[idx].feelsLike;
        updatedEntry.uvIndex = newList[idx].uvIndex;
        updatedEntry.visibility = newList[idx].visibility;
        updatedEntry.lat = newList[idx].lat;
        updatedEntry.long = newList[idx].long; //Add the updated entry to the output array

        output.push(updatedEntry); //Store the city name for faster checking against remaining values in new list

        copiedCities.push(entry.city);
      }
    });
  } //Remove any cities already in output array


  (0, _lodash.pullAllWith)(newDifference, copiedCities, function (a, b) {
    return (0, _lodash.isEqual)(a.city, b);
  });
  var concatenated = (0, _lodash.concat)(output, newDifference);
  return concatenated;
};
/**
 * Takes a list of WeatherItems and sorts that list alphabetically by city name
 * @param {[]} list 
 */


exports.mergeLists = mergeLists;

var sortLocaleList = function sortLocaleList(list) {
  return sortListByCity(list, 0, list.length - 1);
};
/**
 * Takes a list of WeatherItems and extracts only those found in a list of ids.
 * @param {[]} weatherItemList
 * @param {String} idList 
 */


exports.sortLocaleList = sortLocaleList;

var generateListById = function generateListById(weatherItemList, idList) {
  //If weatherItemList is not an array or is an object without an id field, throw error
  if (!isArray(weatherItemList) && weatherItemList.id === undefined) {
    throw TypeError("First parameter must be an array.");
  } //If only one entry and it exists in the list, return that entry


  if (!isArray(weatherItemList) || weatherItemList.length === 1) {
    if (weatherItemList.id !== undefined && idList.includes(weatherItemList.id)) {
      return [weatherItemList];
    }
  }

  return (0, _lodash.intersectionWith)(weatherItemList, idList, function (a, b) {
    return (0, _lodash.isEqual)(a.id, b);
  });
};
/**
 * Reorders a list of weatherItems to place all favourites at the front, still in alphabetical order.
 * @param {[]} list 
 */


exports.generateListById = generateListById;

var reorderByFavorite = function reorderByFavorite(list) {
  var sorted = sortListByCity(list, 0, list.length - 1);
  var fav = [];
  var normal = [];
  sorted.forEach(function (item) {
    if (item.favorited) {
      fav.push(item);
    } else {
      normal.push(item);
    }
  });
  return (0, _lodash.concat)(fav, normal);
};
/**
 * Takes a list of weatherItems and removes the entry with the provided id, if it exists.
 * @param {[]} list 
 * @param {String} id 
 */


exports.reorderByFavorite = reorderByFavorite;

var removeById = function removeById(list, id) {
  if (!isArray(list)) {
    throw TypeError("First parameter must be an array.");
  }

  var copy = list.slice();
  (0, _lodash.pullAllWith)(copy, id, function (a, b) {
    return a.id.localeCompare(b) === 0;
  });
  return copy;
};
/**
 * Selects the weatherItem associated with a given id
 * @param {[]} list 
 * @param {String} id 
 */


exports.removeById = removeById;

var getLocaleById = function getLocaleById(list, id) {
  if (!isArray(list)) {
    throw TypeError("First parameter must be an array.");
  }

  for (var i = 0; i < list.length; i++) {
    if (list[i].id.localeCompare(id) === 0) {
      return list[i];
    }
  }

  return undefined;
};
/**
 * Selects a weatherItem associated with a given city name
 * @param {[]} list 
 * @param {String} city 
 */


exports.getLocaleById = getLocaleById;

var getLocaleByCity = function getLocaleByCity(list, city) {
  if (!isArray(list)) {
    throw TypeError("First parameter must be an array.");
  }

  for (var i = 0; i < list.length; i++) {
    if (list[i].city.localeCompare(city) === 0) {
      return list[i];
    }
  }

  return undefined;
}; ///////////// HELPER FUNCTIONS ////////////

/**
 * Selects a pivot at the rough halfway point of a list and partitions that list,
 * plus swaps relevant elements to sort.
 * @param {[]} list - A list of WeatherItems (see /src/app/weather-item.js). 
 * @param {integer} left - The currently-selected left index
 * @param {integer} right - The currently-selected right index
 */


exports.getLocaleByCity = getLocaleByCity;

var partition = function partition(list, left, right) {
  if (!list || !list.length) {
    throw TypeError("Array parameter must not be empty or undefined.");
  }

  var pivot = list[Math.floor((right + left) / 2)];
  var i = left;
  var j = right;

  while (i <= j) {
    while (list[i].city.localeCompare(pivot.city) < 0) {
      i++;
    }

    while (list[j].city.localeCompare(pivot.city) > 0) {
      j--;
    }

    if (i <= j) {
      swap(list, i, j);
      i++;
      j--;
    }
  }

  return i;
};
/**
 * Swaps two elements in a list
 * @param {[]} items - A list of items 
 * @param {integer} left - The index of the first element 
 * @param {integer} right - The index of the second element
 */


var swap = function swap(items, left, right) {
  var temp = items[left];
  items[left] = items[right];
  items[right] = temp;
};
/**
 * Quicksort list by the name of the city, returns
 * the list in increasing alphabetical order.
 * @param {[]} items - A list of WeatherItems (see /src/app/weather-item.js) -- either the full list or a subset
 * @param {integer} left - The starting leftmost index
 * @param {integer} right - The starting rightmost index
 */


var sortListByCity = function sortListByCity(items, left, right) {
  if (!items || !items.length) {
    //Safety error check in case I've beefed something
    throw TypeError("Array parameter must not be empty or undefined.");
  }

  var idx = undefined;

  if (items.length > 1) {
    idx = partition(items, left, right); //If there are more elements on the left,

    if (left < idx - 1) {
      //Select that segment
      sortListByCity(items, left, idx - 1);
    } //Otherwise if there are more elements on the right,


    if (idx < right) {
      //Use that segment
      sortListByCity(items, idx, right);
    }
  } //If only one item is in the list, return the list as-is


  return items;
};

var isArray = Array.isArray;