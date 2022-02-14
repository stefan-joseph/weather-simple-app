import { BsArrowUpCircle as Direction } from "react-icons/bs";
import styled from "styled-components";

const WindDirection = ({ windDegrees }) => {
  return (
    <Styles windDegree={windDegrees}>
      <Direction />
    </Styles>
  );
};

export default WindDirection;

const Styles = styled.span`
  display: inline-block;
  text-align: center;
  justify-content: center;
  padding: 3px;
  /* font-size: 0.9rem; */
  transform: ${(props) => `rotate(${props.windDegree}deg)`};
`;
