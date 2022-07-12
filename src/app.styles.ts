import styled from "styled-components";
import Loader from "./components/Loader";

export const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  background: #f0f0f0;
  padding: 10px;
  margin: 0;
`;

export const AppLoader = styled(Loader)`
  margin: 75px;
`;
