import React, { useContext } from "react";
import { StateContext } from "../App";
import styled from "styled-components";
import Units from "../components/Units";
import POP from "../components/POP";
import WeatherIcons from "../components/WeatherIcons";
import {
  BsThermometerHigh as High,
  BsThermometerLow as Low,
} from "react-icons/bs";

const handleDayOfWeek = (index, hourDifference) => {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  const date = new Date();
  const utcDay = date.getUTCDay();
  const utcHour = date.getUTCHours();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = "";

  if (utcHour + hourDifference < 0) day = utcDay - 1;
  else if (utcHour + hourDifference > 23) day = utcDay + 1;
  else day = utcDay;

  let localDay = "";

  if (day < 0) localDay = day + 7 + index;
  else if (day > 6) localDay = day - 7 + index;
  else localDay = day + index;

  return localDay > 6 ? days[localDay - 7] : days[localDay];
};

function DailyWeather() {
  const { dispatch, data, units, details, darkMode } = useContext(StateContext);
  const hourDifference = data.timezone_offset / 3600;
  return (
    <Styles dark={darkMode}>
      {data.daily.map((day, index) => {
        return (
          <div key={index} className={index > 0 ? "breaker" : null}>
            <div
              className={
                index === details ? "daily-single selected" : "daily-single"
              }
              onClick={() => dispatch({ type: "CHANGE_DAY", value: index })}
            >
              <div className="daily-icon-pop">
                <div className="relative-container">
                  <WeatherIcons
                    id={day.weather[0].id}
                    icon={day.weather[0].icon}
                  />
                  <div className="pop-container">
                    <POP pop={day.pop} zero={false} />
                  </div>
                </div>
              </div>
              <div className="daily-days">
                <p className="title-day">
                  {handleDayOfWeek(index, hourDifference)}
                </p>
                <p className="capitalize">{day.weather[0].description}</p>
              </div>
              <div className="daily-temp-range">
                <div>
                  <p className="temp">
                    {Math.round(day.temp.max)}
                    <Units units={units} />
                  </p>
                  <div className="temp-icon">
                    <High className="high" />
                    <p>High</p>
                  </div>
                </div>
                <div>
                  <p className="temp">
                    {Math.round(day.temp.min)}
                    <Units units={units} />
                  </p>
                  <div className="temp-icon">
                    <Low className="low" />
                    <p>Low</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        return;
      })}
    </Styles>
  );
}

export default DailyWeather;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  border: ${(props) =>
    props.dark ? "var(--border-dark)" : "var(--border-primary)"};
  margin: var(--margin-feed);
  background-color: ${(props) =>
    props.dark
      ? "var(--background-color-dark)"
      : "var(--background-color-primary)"};
  color: ${(props) =>
    props.dark ? "var(--font-dark)" : "var(--font-primary)"};
  border-radius: var(--border-radius);
  @media (max-width: 650px) {
    order: 2;
  }

  p {
    margin: 5px;
  }

  .daily-single {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
    padding: 10px;
  }

  .daily-single > * {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .daily-icon-pop {
    flex: 0.7;
  }

  .daily-days {
    flex-direction: column;
  }

  .breaker {
    position: relative;
  }

  .breaker::after {
    content: "";
    background-color: ${(props) =>
      props.dark
        ? "var(--breaker-color-dark)"
        : "var(--breaker-color-primary);"};
    position: absolute;
    top: 0px;
    left: 25px;
    right: 25px;
    height: 1px;
  }

  .selected {
    background-color: ${(props) =>
      props.dark ? "var(--neutral-700)" : "var(--neutral-100)"};
    border-radius: var(--border-radius);
    box-shadow: ${(props) =>
      props.dark
        ? "inset 0px 0px 20px var(--neutral-800)"
        : "inset 0px 0px 20px var(--neutral-200)"};
    cursor: default;
  }

  .daily-icon-pop {
    display: flex;
    align-items: center;
  }

  .relative-container {
    position: relative;
  }

  .pop-container {
    color: var(--pop-color);
    position: absolute;
    top: 23px;
    left: 55px;
  }

  .title-day {
    font-size: 18px;
    font-weight: 700;
  }

  .daily-temp-range {
    display: flex;
    gap: 10px;
  }

  .temp {
    font-weight: 700;
    font-size: 1.1rem;
  }

  .temp-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .temp-icon p {
    color: ${(props) =>
      props.dark ? "var(--font-dark-2)" : "var(--font-primary-2)"};
  }

  .high {
    color: var(--orange-high);
  }

  .low {
    color: var(--blue-low);
  }
`;
