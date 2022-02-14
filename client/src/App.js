import "normalize.css";
import "./App.css";
import React, { useReducer, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import DetailsWeather from "./feed/DetailsWeather";
import DailyWeather from "./feed/DailyWeather";
import HourlyWeather from "./feed/HourlyWeather";
import Loader from "./components/Loader";

export const StateContext = React.createContext();

const initialState = {
  loading: true,
  error: false,
  data: {},
  searchQuery: "New York",
  location: "New York, US",
  units: "metric",
  details: 0,
  darkMode: false,
  searchSuggestions: "",
  recentlySearched: [],
  lat: 40.7143,
  lon: -74.006,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BEGIN":
      return { ...state, loading: true, searchSuggestions: "" };
    case "FETCH_SUCCESS":
      console.log(action.payload.data);
      const { data, location } = action.payload.data;
      const { lat, lon } = data;

      return {
        ...state,
        loading: false,
        error: false,
        data: data,
        location: location,
        lat: lat,
        lon: lon,
        searchSuggestions: "",
        recentlySearched: [...state.recentlySearched, { location, lat, lon }],
        details: 0,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true, location: "" };
    case "CHANGE_UNITS":
      return {
        ...state,
        units: state.units === "metric" ? "imperial" : "metric",
        loading: true,
      };
    case "CHANGE_DAY":
      return { ...state, details: action.value };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "SEARCH_SUGGESTIONS":
      return { ...state, searchSuggestions: action.payload };
    case "CLEAR_SUGGESTIONS":
      return { ...state, searchSuggestions: "" };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getWeatherByLatAndLon = async (lat, lon, location) => {
    const { units } = state;
    // dispatch({ type: "CLEAR_SUGGESTIONS" });
    dispatch({ type: "FETCH_BEGIN" });
    try {
      const { data } = await axios.get(
        `/api/v1/weather?lat=${lat}&lon=${lon}&units=${units}&location=${location}`
      );
      dispatch({
        type: "FETCH_SUCCESS",
        payload: { data },
      });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  const getWeatherByCity = async (searchQuery) => {
    const { units } = state;
    console.log(searchQuery);
    dispatch({ type: "CLEAR_SUGGESTIONS" });
    dispatch({ type: "FETCH_BEGIN" });
    try {
      const { data } = await axios.get(
        `/api/v1/weather?city=${searchQuery}&units=${units}`
      );
      console.log("try");
      dispatch({
        type: "FETCH_SUCCESS",
        payload: { data },
      });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
      console.log("catch");
    }
  };

  useEffect(() => {
    const { lat, lon, location } = state;
    getWeatherByLatAndLon(lat, lon, location);
  }, [state.units]);

  return (
    <StateContext.Provider
      value={{
        ...state,
        dispatch: dispatch,
        getWeatherByCity,
        getWeatherByLatAndLon,
      }}
    >
      <Styles dark={state.darkMode}>
        <Navbar />
        {state.loading && <Loader />}
        {state.error && !state.loading && (
          <h3>There was an error. Please try again.</h3>
        )}
        {!state.loading && !state.error && (
          <div className="weather-feed">
            <DetailsWeather />
            <DailyWeather />
            <div className="break"></div>
            <HourlyWeather />
            <div className="break"></div>
          </div>
        )}
      </Styles>
    </StateContext.Provider>
  );
}

export default App;

const Styles = styled.div`
  background-color: ${(props) =>
    props.dark ? "var(--neutral-700)" : "var(--neutral-300)"};
  text-align: center;
  min-height: 100vh;

  .weather-feed {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .break {
    flex-basis: 100%;
    height: 0;
  }
`;
