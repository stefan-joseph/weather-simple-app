import { useContext } from "react";
import { StateContext } from "../App";
import styled from "styled-components";

const SearchSuggestions = () => {
  const {
    dispatch,
    searchSuggestions,
    darkMode,
    recentlySearched,
    getWeatherByLatAndLon,
  } = useContext(StateContext);
  if (searchSuggestions.cities) {
    return (
      <Styles dark={darkMode}>
        <div>
          <h6>Suggestions</h6>
        </div>
        {searchSuggestions.cities.map(
          ({ name, state, country, coord }, index) => {
            const { lat, lon } = coord;
            const location = `${name}, ${country}`;
            return (
              <div
                key={index}
                className="suggestion-container border-top"
                onMouseDown={() => {
                  getWeatherByLatAndLon(lat, lon, location);
                }}
              >
                {state ? (
                  <p>
                    {name}, {state}, {country}
                  </p>
                ) : (
                  <p>
                    {name}, {country}
                  </p>
                )}
              </div>
            );
          }
        )}
      </Styles>
    );
  } else {
    return (
      <Styles dark={darkMode}>
        <div>
          <h6>Recently Searched</h6>
        </div>
        {recentlySearched.map(({ location, lat, lon }, index) => {
          return (
            <div
              key={index}
              className="suggestion-container border-top"
              onMouseDown={() => {
                getWeatherByLatAndLon(lat, lon, location);
              }}
            >
              <p>{location}</p>
            </div>
          );
        })}
      </Styles>
    );
  }
  return;
};

export default SearchSuggestions;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  width: 200px;
  top: 28px;
  left: 20px;
  z-index: 99;
  background-color: ${(props) =>
    props.dark
      ? "var(--background-color-dark)"
      : "var(--background-color-primary)"};
  color: ${(props) =>
    props.dark ? "var(--font-dark)" : "var(--font-primary)"};
  border: ${(props) =>
    props.dark ? "var(--border-dark)" : "var(--border-primary)"};

  p {
    margin: 0px;
    padding: 5px;
    font-size: 0.9rem;
    text-align: left;
  }

  h6 {
    margin: 0px;
    padding: 5px;
    font-size: 1.1rem;
    text-align: left;
  }

  .suggestion-container {
    width: 100%;
  }

  .suggestion-container:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.dark ? "var(--neutral-700)" : "var(--neutral-100)"};
  }

  .border-top {
    border-top: ${(props) =>
      props.dark ? "var(--border-dark)" : "var(--border-primary)"};
  }

  .title {
    font-weight: 500;
  }
`;
