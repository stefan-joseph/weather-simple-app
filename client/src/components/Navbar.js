import React, { useContext, useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { StateContext } from "../App";
import styled from "styled-components";
import { RiCelsiusFill as Celsius } from "react-icons/ri";
import { RiFahrenheitFill as Fahrenheit } from "react-icons/ri";
import { IoSearch as Search, IoMenu as Menu } from "react-icons/io5";
import useOnClickOutside from "../hooks/useOnClickOutside";
import DarkToggle from "./DarkToggle";
import axios from "axios";
import SearchSuggestions from "./SearchSuggestions";

function Navbar() {
  const { dispatch, units, location, darkMode, loading, getWeatherByCity } =
    useContext(StateContext);

  const [city, updateCity] = useState("");
  const [searchActive, activateSearch] = useState(false);
  const [dropMenu, handleDropMenu] = useState(false);

  useEffect(() => {
    if (city) {
      console.log(city, "city");
      axios
        .get(`/api/v1/cities?search=${city}`)
        .then((response) => {
          if (city !== "") {
            dispatch({ type: "SEARCH_SUGGESTIONS", payload: response.data });
          } else {
            console.log("ignore update");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, [city]);

  const ref = useRef();
  useOnClickOutside(ref, () => {
    activateSearch(false);
    dispatch({ type: "CLEAR_SUGGESTIONS" });
  });

  return (
    <Styles dark={darkMode} search={searchActive}>
      <div className="nav-section">
        <Logo />
        <h3 className="title">Weather Simple</h3>
      </div>
      <div
        className="search-bar nav-section"
        onClick={() => activateSearch(true)}
      >
        {searchActive ? (
          <div className="relative">
            <input
              ref={ref}
              autoFocus
              placeholder="Search for a city"
              onChange={(e) => updateCity(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  getWeatherByCity(city);
                  activateSearch(false);
                  updateCity("");
                }
              }}
            />
            <div className="search-icon">
              <Search
                onMouseDown={() => {
                  getWeatherByCity(city);
                  activateSearch(false);
                  updateCity("");
                }}
              />
            </div>
            <SearchSuggestions />
          </div>
        ) : (
          <div className="relative">
            {!loading && (
              <>
                <p className="city-banner capitalize nav-section">
                  {location ? location : "Search"}
                </p>{" "}
                <div className="search-icon">
                  <Search />
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="navbar-tools nav-section">
        <Menu
          className="cell-menu"
          onClick={() => handleDropMenu(dropMenu ? false : true)}
        />
        <div
          className="unit-selector collapse"
          onClick={() => dispatch({ type: "CHANGE_UNITS" })}
        >
          {units === "metric" ? (
            <>
              <Celsius /> / <Fahrenheit className="unit-unselected" />
            </>
          ) : (
            <>
              <Celsius className="unit-unselected" /> / <Fahrenheit />
            </>
          )}
        </div>
        <div className="dark-mode-selector collapse">
          <DarkToggle />
        </div>
      </div>
      <div className="break"></div>
      <div
        className={
          !dropMenu ? "unit-selector hide" : "unit-selector drop-menu-section"
        }
        onClick={() => {
          dispatch({ type: "CHANGE_UNITS" });
          handleDropMenu(false);
        }}
      >
        <p>Units:</p>
        {units === "metric" ? (
          <>
            <Celsius /> / <Fahrenheit className="unit-unselected" />
          </>
        ) : (
          <>
            <Celsius className="unit-unselected" /> / <Fahrenheit />
          </>
        )}
      </div>
      <div className="break"></div>
      <div
        className={
          !dropMenu
            ? "dark-mode-selector hide"
            : "dark-mode-selector drop-menu-section"
        }
      >
        <p>Dark Mode:</p>
        <div className="dark-toggle" onClick={() => handleDropMenu(false)}>
          <DarkToggle />
        </div>
      </div>
    </Styles>
  );
}

export default React.memo(Navbar);

const Styles = styled.div`
  background-color: ${(props) =>
    props.dark
      ? "var(--background-color-dark)"
      : "var(--background-color-primary)"};
  color: ${(props) =>
    props.dark ? "var(--font-dark)" : "var(--font-primary)"};
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  border-bottom: ${(props) =>
    props.dark ? "var(--border-dark)" : "var(--border-primary)"};
  /* height: 55px; */
  @media (max-width: 650px) {
  }
  flex-wrap: wrap;

  .nav-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    @media (max-width: 650px) {
      justify-content: space-between;
    }
    padding: 0px 10px;
  }

  .title {
    margin-left: 5px;
    @media (max-width: 650px) {
      display: none;
    }
    white-space: nowrap;
  }

  .search-bar {
    border: ${(props) =>
      props.dark
        ? "1px solid var(--font-dark)"
        : "1px solid var(--font-primary)"};
    border: ${(props) => (props.search ? "null" : "none")};
    border-radius: 15px;
    padding: 3px 25px 3px 15px;

    max-width: 198px;
    max-height: 25px;
    /* display: block; */
    justify-content: center;
    align-items: center;
  }

  .relative {
    position: relative;
  }

  .search-bar input {
    text-align: left;
    padding: 0px 10px;
    padding-left: 27px;
    border-radius: 15px;
    flex: 1;
    position: relative;
  }

  .search-bar input::placeholder {
    text-align: center;
  }
  .city-banner {
    margin: 0;
    padding: 0;
    white-space: nowrap;
    font-size: 25px;
    font-weight: 700;
    position: relative;
    cursor: pointer;
    justify-content: flex-end;
  }

  .search-icon {
    font-size: 20px;
    position: absolute;
    left: ${(props) => (props.search ? "3px" : "-25px")};
    top: ${(props) => (props.search ? "0px" : "17px")};
    cursor: pointer;
  }

  .suggestions-display {
    position: absolute;
  }

  .navbar-tools {
    gap: 20px;
    font-size: 20px;
  }

  .navbar-tools > * {
    cursor: pointer;
  }

  .unit-selector {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  .unit-unselected {
    color: var(--neutral-400);
  }

  .cell-menu {
    display: none;
    @media (max-width: 650px) {
      display: block;
      font-size: 40px;
      margin-left: auto;
    }
  }

  .collapse {
    @media (max-width: 650px) {
      display: none;
    }
  }

  .drop-menu-section {
    border-top: ${(props) =>
      props.dark ? "var(--border-dark)" : "var(--border-primary)"};
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 15px;
    opacity: 1;
    @media (min-width: 651px) {
      display: none;
    }
    transition: all 0.5s linear;
  }

  .drop-menu-section p {
    margin: 0;
  }

  .hide {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0px;
    opacity: 0;
    height: 0px;
    transition: all 0.5s, opacity 0.2s cubic-bezier(0.82, 0.01, 1, 1);
  }

  .dark-toggle {
    margin-left: 2px;
  }

  .break {
    flex-basis: 100%;
    height: 0;
  }
`;
