"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotesByLocale = exports.getNoteById = exports.sortById = exports.mergeNoteLists = void 0;

var _lodash = require("lodash");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isArray = Array.isArray;
/**
 * Used to merge arrays of notes. Each note should have:
 * 	- an id,
 *  - a body,
 *  - a city name
 * @param {[]} oldList 
 * @param {[]} newList 
 */

var mergeNoteLists = function mergeNoteLists(oldList, newList) {
  //Copy input arrays
  var oldCopy = oldList.slice();
  var newCopy = newList.slice(); //Extract any exactly-matching values

  var output = (0, _lodash.intersectionWith)(oldCopy, newCopy, _lodash.isEqual); //Pull distinct values from each array

  var oldDistinct = (0, _lodash.differenceWith)(oldCopy, newCopy, _lodash.isEqual);
  var newDistinct = (0, _lodash.differenceWith)(newCopy, oldCopy, _lodash.isEqual); //Initialize variable to store ids of any notes with updated values

  var copiedNotes = [];
  console.log(oldDistinct, newDistinct);

  if (!(0, _lodash.isEmpty)(oldDistinct)) {
    oldDistinct.forEach(function (entry) {
      var idx = (0, _lodash.findIndex)(newDistinct, function (o) {
        return o.id.localeCompare(entry.id) === 0;
      }); //If no match has been found for the current entry,

      if (idx === -1) {
        //Push entry without changes
        output.push(_objectSpread({}, entry));
      } else {
        //Else copy all values to new object and update where relevant
        var updated = _objectSpread({}, entry);

        updated.body = newDistinct[idx].body;
        updated.timeStamp = newDistinct[idx].timeStamp;
        output.push(updated);
        copiedNotes.push(entry.id);
      }
    });
  } //Remove any ids already copied to output array from newDistinct


  (0, _lodash.pullAllWith)(newDistinct, copiedNotes, function (a, b) {
    return (0, _lodash.isEqual)(a.id, b);
  });
  var concatenated = (0, _lodash.concat)(output, newDistinct);
  return concatenated;
};
/**
 * Sorts the given list in ascending order by id field
 * @param {[]} list 
 */


exports.mergeNoteLists = mergeNoteLists;

var sortById = function sortById(list) {
  return sortListById(list);
};
/**
 * Retrieves a single note from a list based on the note's id
 * @param {[]} list 
 * @param {String} id 
 */


exports.sortById = sortById;

var getNoteById = function getNoteById(list, id) {
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
 * Selects any notes associated with the given locale id from a list.
 * @param {[]} list 
 * @param {String} id 
 */


exports.getNoteById = getNoteById;

var getNotesByLocale = function getNotesByLocale(list, id) {
  if (!isArray(list)) {
    throw TypeError("First parameter must be an array.");
  } //Copy the input list


  var output = _toConsumableArray(list); //Remove all entries that don't match the given id


  (0, _lodash.pullAllWith)(output, id, function (o) {
    return o.localeId.localeCompare(id) !== 0;
  });
  return output;
}; /// HELPER FUNCTIONS ///

/**
 * Selects a pivot at the rough halfway point of a list and partitions that list,
 * plus swaps relevant elements.
 * @param {} list - A list of note items
 * @param {*} left - The currently-selected left index
 * @param {*} right - The currently-selected right index
 */


exports.getNotesByLocale = getNotesByLocale;

var partition = function partition(list, left, right) {
  if (!list || !list.length) {
    throw TypeError("Array parameter must not be empty or undefined.");
  }

  var pivot = list[Math.floor((right + left) / 2)];
  var i = left;
  var j = right;

  while (i <= j) {
    while (list[i].id.localeCompare(pivot.id) < 0) {
      i++;
    }

    while (list[j].id.localeCompare(pivot.id) > 0) {
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
 * @param {[]} items - The list of items
 * @param {integer} left - The index of the first element
 * @param {integer} right - The index of the second element
 */


var swap = function swap(items, left, right) {
  var temp = items[left];
  items[left] = items[right];
  items[right] = temp;
};
/**
 * Quicksort list by the id value.
 * @param {[]} items - The list of note items
 * @param {integer} left - The starting leftmost index
 * @param {integer} right - The starting rightmost index
 */


var sortListById = function sortListById(items, left, right) {
  if (!items || !items.length) {
    throw TypeError("Array parameter must not be empty or undefined.");
  }

  var idx = undefined;

  if (items.length > 1) {
    idx = partition(items, left, right); //If there are more elements on the left,

    if (left < idx - 1) {
      //Select that segment
      sortListById(items, left, idx - 1);
    } //Else if there are more elements on the right,


    if (idx < right) {
      //Use that segment
      sortListById(items, idx, right);
    }
  } //If only one item is in the list, return the list as-is


  return items;
};