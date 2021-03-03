import styled from "styled-components";
import { theme } from "./theme";

export const HeaderWrapper = styled.div`
  background-color: #ffffff;
  grid-column: 3;
  grid-row: 1;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const HeaderName = styled.h1`
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.xl};
  display: flex;
  flex-direction: row;
  align-items: center;
`;
