import styled from "styled-components";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export const PreferencePanelCard = styled(Card)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border: 1px solid #eaeaea;
`;

export const PreferenceButtonGroup = styled(Box)`
  padding: 5px;
  border-radius: 0;
  border-right: 1px solid #eaeaea;
  flex-grow: 1;

  &:last-child {
    border-right: none;
  }
`;

export const PreferenceBoxTitle = styled.p`
  color: rgba(0, 0, 0, 0.54);
  text-transform: uppercase;
  font-size: 10px;
  padding: 0;
  margin: 0 0 3px;
`;
