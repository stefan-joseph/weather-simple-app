import React, { useContext } from "react";
import { StateContext } from "../App";
import Units from "../components/Units";
import WeatherIcons from "../components/WeatherIcons";
import { handleDayOfWeek } from "../components/HandleDayOfWeek";
import styled from "styled-components";
import HandleSunCalc from "../components/HandleSunCalc";

import {
  BsThermometerHigh as High,
  BsThermometerLow as Low,
  BsSunrise as Sunrise,
  BsSunset as Sunset,
  BsCloudRain as Rain,
  BsDroplet as Drop,
  BsWind as Wind,
  BsThermometerHalf as Mid,
} from "react-icons/bs";

import POP from "../components/POP";
import WindDirection from "../components/WindDirection";

const renderTitle = (details, hourDifference) => {
  switch (details) {
    case 0:
      return "Today";
    case 1:
      return "Tomorrow";
    default:
      return handleDayOfWeek(details, hourDifference);
  }
};

function CurrentWeather() {
  const { data, location, units, details, darkMode } = useContext(StateContext);
  const hourDifference = data.timezone_offset / 3600;

  let dataPath = data.daily[details];
  if (details === 0) dataPath = data.current;
  return (
    <Styles dark={darkMode}>
      <h2>{renderTitle(details, hourDifference)}'s Forecast</h2>
      {details === 0 && <p className="now-tag">Now:</p>}
      <p className="capitalize">{dataPath.weather[0].description}</p>
      <WeatherIcons
        id={dataPath.weather[0].id}
        icon={dataPath.weather[0].icon}
      />
      <h1>
        {Math.round(details === 0 ? dataPath.temp : dataPath.temp.day)}
        <Units units={units} />
      </h1>
      <div className="details-row">
        <div className="details-column">
          <p className="value">
            {Math.round(data.daily[details].temp.max)}
            <Units units={units} />
          </p>
          <p className="icon">
            <High className="high" />
            High
          </p>
        </div>
        <div className="details-column">
          <p className="value">
            {Math.round(data.daily[details].temp.min)}
            <Units units={units} />
          </p>
          <p className="icon">
            <Low className="low" />
            Low
          </p>
        </div>
      </div>
      <div className="details-row">
        <div className="details-column">
          <HandleSunCalc
            unixTime={data.daily[details].sunrise}
            timezoneOffset={data.timezone_offset}
          />
          <p className="icon">
            <Sunrise className="sun" /> Sunrise
          </p>
        </div>
        <div className="details-column">
          <HandleSunCalc
            unixTime={data.daily[details].sunset}
            timezoneOffset={data.timezone_offset}
          />
          <p className="icon">
            <Sunset className="sun" /> Sunset
          </p>
        </div>
      </div>
      <div className="details-row">
        <div className="details-column">
          <p className="value">
            <POP pop={data.daily[details].pop} zero={true} />
          </p>
          <p className="icon">
            <Rain className="pop" /> Precipitation
          </p>
        </div>
        <div className="details-column">
          <p className="value">{dataPath.humidity}%</p>
          <p className="icon">
            <Drop className="humid" /> Humidity
          </p>
        </div>
      </div>
      <div className="details-row">
        <div className="details-column">
          <p className="value">
            <WindDirection windDegrees={dataPath.wind_deg} />
            {"    "}
            {Math.round(data.daily[details].wind_speed * 3.6)} km/h
          </p>
          <p className="icon">
            <Wind className="wind" /> Wind
          </p>
        </div>
        <div className="details-column">
          {details === 0 ? (
            <p className="value">
              {Math.round(data.current.feels_like)}
              <Units units={units} />
            </p>
          ) : (
            <p className="value">
              {Math.round(data.daily[details].feels_like.day)}
              <Units units={units} />
            </p>
          )}
          <p className="icon">
            <Mid className="feels" />
            Feels Like
          </p>
        </div>
      </div>
    </Styles>
  );
}

export default CurrentWeather;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2.5;
  align-items: center;
  border: ${(props) =>
    props.dark ? "var(--border-dark)" : "var(--border-primary)"};
  border-radius: var(--border-radius);

  margin: var(--margin-feed);
  color: ${(props) =>
    props.dark ? "var(--font-dark)" : "var(--font-primary)"};
  background-color: ${(props) =>
    props.dark
      ? "var(--background-color-dark)"
      : "var(--background-color-primary)"};

  p {
    margin: 5px;
  }

  .now-tag {
    font-weight: 700;
  }

  .details-row {
    display: flex;
    width: 100%;
    margin: 10px;
    flex: 1;
  }
  .details-column {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    flex: 1;
  }

  .value {
    font-weight: 700;
    font-size: 1.2rem;
  }

  .high {
    color: var(--orange-high);
  }

  .low {
    color: var(--blue-low);
  }

  .icon {
    color: ${(props) =>
      props.dark ? "var(--font-dark-2)" : "var(--font-primary-2)"};
  }

  .sun {
    color: orange;
  }

  .pop {
    color: var(--pop-color);
  }

  .humid {
    color: #14b8a6;
  }

  .wind {
    color: #22d3ee;
  }

  .feels {
    color: #64748b;
  }
`;
