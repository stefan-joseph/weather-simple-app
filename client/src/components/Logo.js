import { ReactComponent as Day } from "../images/weatherIcons/day.svg";
import styled from "styled-components";

function Logo() {
  return (
    <Styles>
      <Day className="sun" />
    </Styles>
  );
}

export default Logo;

const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #57a0ee;
  border-radius: 10px;
  /* border: 1px solid var(--neutral-400); */

  .sun {
    position: absolute;
  }
`;
