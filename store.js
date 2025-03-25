// store.js 

import { createStore, combineReducers } from "redux";
// actions

export const fetchWeatherRequest = () => ({
  type: "FETCH_WEATHER_REQUEST",
});

export const fetchWeatherSuccess = (data) => ({
  type: "FETCH_WEATHER_SUCCESS",
  payload: data,
});

export const fetchWeatherFailure = (error) => ({
  type: "FETCH_WEATHER_FAILURE",
  payload: error,
});

// reducers/weatherReducer.js
const initialState = {
  weatherData: null,
  loading: false,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_WEATHER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_WEATHER_SUCCESS":
      return {
        ...state,
        loading: false,
        weatherData: action.payload,
      };
    case "FETCH_WEATHER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// store.js

const rootReducer = combineReducers({
  weather: weatherReducer,
  // Add more reducers if needed
});

const store = createStore(rootReducer);

export default store;
