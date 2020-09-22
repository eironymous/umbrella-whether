"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadState = exports.saveState = void 0;

/**
 * Persists the current state tree to local storage.
 * Returns true if saving succeeds.
 * @param {obj} state 
 */
var saveState = function saveState(state) {
  try {
    var serialized = JSON.stringify(state);
    localStorage.setItem('umbrella-whether-state', serialized);
  } catch (err) {
    console.log(err);
    throw err;
  }

  return true;
};
/**
 * Loads stored state from localstorage.
 */


exports.saveState = saveState;

var loadState = function loadState() {
  try {
    var serialized = localStorage.getItem('umbrella-whether-state'); //If nothing is found, return undefined

    if (serialized === null) {
      return undefined;
    }

    return JSON.parse(serialized);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

exports.loadState = loadState;