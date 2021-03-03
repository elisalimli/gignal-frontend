import styled from "styled-components";
import { theme } from "../theme";

export const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-gap: 50px;
  @media (max-width: ${theme.screens.md}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${theme.screens.smormd}) {
    grid-template-columns: 1fr;
  }
`;
