// App.js

import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "./store";
import "./App.css";

const WeatherApp = ({ weatherData, loading, error, fetchWeather }) => {
  const [city, setCity] = useState("");

  const findHandle = async () => {
    await fetchWeather(city);
  };

  console.log(weatherData);
  return (
    <div id="App-wrapper">
      <div id="app">
        <div id="head">
          <img
            src="https://media.geeksforgeeks.org/gfg-gg-logo.svg"
            alt="gfg_logo"
          />
          <label>Enter City Name</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={findHandle}>Find</button>
        </div>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {weatherData && (
            <div>
              <div>
                <img src={weatherData?.current?.condition.icon} />
                <p>{weatherData?.current?.condition.text}</p>
              </div>
              <div>
                <p>
                  Temperature : <span>{weatherData?.current?.temp_c}c</span>
                </p>
                <p>
                  Humidity : <span>{weatherData?.current?.humidity}</span>
                </p>
                <p>
                  Wind Speed : <span>{weatherData?.current.wind_kph}kph</span>
                </p>
              </div>
              <div>
                {Object.keys(weatherData?.location).map((key) => (
                  <p key={key}>
                    {key} : <span>{weatherData.location[key]}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  weatherData: state.weather.weatherData,
  loading: state.weather.loading,
  error: state.weather.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeather: (city) => {
    dispatch(fetchWeatherRequest());
    fetchWeatherData(city)
      .then((data) => dispatch(fetchWeatherSuccess(data)))
      .catch((err) => dispatch(fetchWeatherFailure(err.message)));
  },
});

// feathermatch function

async function fetchWeatherData(city = "Delhi") {
  const API_KEY = "XXXXX-XXXXX-XXXXX";
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`
  );
  console.log(response);
  if (response.status != 200) {
    throw new Error("Failed to fetch weather data");
  }
  return response.data;
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherApp);
