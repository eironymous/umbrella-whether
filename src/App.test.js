import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { getWeatherItem } from "./app/weather-item";

test('weatheritem appropriately generated', () => {
  const expected = {
    id: "1",
    favorited: false,
    city: "New York",
    country: "United States of America",
    localTime: "2019-09-07 08:14",
    observationTime: "12:14 PM",
    temperature: 13,
    scale: "m",
    iconUrl: "http://www.website.com",
    descriptions: ["Sunny"],
    windSpeed: 0,
    windDirection: "N",
    pressure: 0,
    precipitation: 0,
    humidity: 90,
    cloudCover: 0,
    feelsLike: 13,
    uvIndex: 4,
    visibility: 16,
  };

  const actual = getWeatherItem(
    "1",
    false,
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

  expect(expected).toEqual(actual);
});
