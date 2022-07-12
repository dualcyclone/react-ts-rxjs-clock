import styled from "styled-components";
import Loader from "../Loader";

export const StyledClock = styled.h1`
  font-size: 30px;
  font-family: Geneva, Verdana;
  font-weight: 100;
  letter-spacing: 0.1em;
  padding: 0;
  margin: 40px 0;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;

export const ClockLoader = styled(Loader)`
  margin: 40px;
`;
