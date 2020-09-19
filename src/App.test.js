import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { getWeatherItem } from "./app/weather-item";
import { mergeLists } from "./app/locale-list-tools";
import * as MERGE_LIST_CONSTANTS from "./test-data/merge-lists-constants";

//Ensures getWeatherItem appropriately generates an object when input is
//correct.
test('weatheritem appropriately generated', () => {
  const expected = MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A;

  const actual = getWeatherItem(
    "1",
    true,
    "New York",
    "United States of America",
    "2019-09-07 08:14",
    "12:14 PM",
    13,
    "m",
    "http://www.website.com",
    ["Sunny"],
    0,
    "N",
    0,
    0,
    90,
    0,
    13,
    4,
    16
  );

  expect(actual).toEqual(expected);
});

test('mergeLists with favorites included, no changes', () => {
  const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

  const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

  const actual = mergeLists(list1, list2);

  expect(actual).toEqual(
    expect.arrayContaining(expected)
  );
});

test('mergeLists with favorites included, some changes', () => {
  const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];
  const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

  const expected = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A, MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL];

  const actual = mergeLists(list1, list2);

  expect(actual).toEqual(
    expect.arrayContaining(expected)
  );
});

test('mergeLists with favorites included, new entry', () => {
  const list1 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A];
  const list2 = [MERGE_LIST_CONSTANTS.SAMPLE_ITEM_1_B, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

  const expected = [MERGE_LIST_CONSTANTS.MERGED_ITEM_1_AB_FAV_INCL, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_2_A, MERGE_LIST_CONSTANTS.SAMPLE_ITEM_3_A];

  const actual = mergeLists(list1, list2);

  expect(actual).toEqual(
    expect.arrayContaining(expected)
  );
});