import { useContext } from "react";
import { StateContext } from "../App";

import styled from "styled-components";
import {
  BsFillSunFill as Day,
  BsFillMoonStarsFill as Night,
} from "react-icons/bs";

function DarkToggle() {
  const { darkMode, dispatch } = useContext(StateContext);
  return (
    <Styles dark={darkMode}>
      <div
        className="toggle-switch"
        onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
      >
        <Day className="sun" />
        <Night className="moon" />
        <div className="ball"></div>
      </div>
    </Styles>
  );
}

export default DarkToggle;

const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;

  * {
    box-sizing: border-box;
  }

  input {
    opacity: 0;
    position: absolute;
  }

  .toggle-switch {
    background-color: ${(props) =>
      props.dark ? "var(--neutral-600)" : "var(--neutral-700)"};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-radius: 50px;
    height: 26px;
    width: 50px;
    position: relative;
  }
  .sun {
    color: orange;
  }
  .moon {
    color: orange;
  }

  .ball {
    position: absolute;
    background-color: ${(props) =>
      props.dark ? "var(--font-dark)" : "var(--background-color-primary)"};
    border-radius: 50%;
    height: 22px;
    width: 22px;
    top: 2px;
    left: 2px;
    transform: ${(props) => !props.dark && "translateX(24px)"};
    transition: transform 0.2s linear;
  }
`;
