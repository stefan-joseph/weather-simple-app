import React, { useContext } from "react";
import { StateContext } from "../App";
import styled from "styled-components";
import Units from "../components/Units";
import WeatherIcons from "../components/WeatherIcons";
import POP from "../components/POP";

const handleHour = (index, localHour) => {
  let localMilitaryHour = "";

  if (localHour + index < 0) localMilitaryHour = localHour + index + 24;
  else if (localHour + index >= 0 && localHour + index < 24)
    localMilitaryHour = localHour + index;
  else localMilitaryHour = localHour + index - 24;

  let regularHour = "";

  if (localMilitaryHour >= 13) regularHour = `${localMilitaryHour - 12}pm`;
  else if (localMilitaryHour === 0) regularHour = `${localMilitaryHour + 12}am`;
  else if (localMilitaryHour === 12) regularHour = `${localMilitaryHour}pm`;
  else regularHour = `${localMilitaryHour}am`;

  return <p>{regularHour}</p>;
};

function HourlyWeather() {
  const { data, units, darkMode } = useContext(StateContext);
  const date = new Date();
  const utcHour = date.getUTCHours();
  const localHour = utcHour + data.timezone_offset / 3600;
  return (
    <Styles dark={darkMode}>
      {data.hourly.map((hour, index) => {
        if (index > 0 && index <= 24) {
          return (
            <div key={index} className="hourly-weather-cell breaker">
              {handleHour(index, localHour)}
              <div className="pop-container">
                <POP pop={hour.pop} zero={false} />
              </div>
              <WeatherIcons
                id={hour.weather[0].id}
                icon={hour.weather[0].icon}
              />
              <p>
                {Math.round(hour.temp)}
                <Units units={units} />
              </p>
            </div>
          );
        } else if (index === 0) {
          return (
            <div key={index} className="hourly-weather-cell">
              <p className="now">Now</p>
              <div className="pop-container">
                <POP pop={hour.pop} />
              </div>
              <WeatherIcons
                id={data.current.weather[0].id}
                icon={data.current.weather[0].icon}
              />
              <p>
                {Math.round(data.current.temp)}
                <Units units={units} />
              </p>
            </div>
          );
        } else return;
      })}
    </Styles>
  );
}

export default React.memo(HourlyWeather);

const Styles = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
  background-color: ${(props) =>
    props.dark
      ? "var(--background-color-dark)"
      : "var(--background-color-primary)"};
  color: ${(props) =>
    props.dark ? "var(--font-dark)" : "var(--font-primary)"};
  border-radius: var(--border-radius);
  margin: var(--margin-feed);
  border: ${(props) =>
    props.dark ? "var(--border-dark)" : "var(--border-primary)"};
  .hourly-weather-cell {
    position: relative;
  }
  .breaker::after {
    content: "";
    background-color: ${(props) =>
      props.dark
        ? "var(--breaker-color-dark)"
        : "var(--breaker-color-primary);"};
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 0px;
    width: 1px;
  }

  .pop-container {
    color: #38bdf8;
    position: absolute;
    left: 16px;
    top: 43px;
  }

  .now {
    font-weight: 700;
  }
`;
