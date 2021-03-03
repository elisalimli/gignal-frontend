import styled from "styled-components";
import { theme } from "../theme";

export const TeamsWrapper = styled.div`
  background-color: #362233;
  overflow-y: hidden !important;
  grid-column: 1;
  grid-row: 1 / 4;
  padding: 0.5rem 0px;
  color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  width: 100%;
`;
