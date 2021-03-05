import styled from "styled-components";
import { theme } from "./theme";

export const FormHeader = styled.h1`
  font-size: ${theme.fontSize["3xl"]};
  cursor: pointer;
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
  color: ${theme.colors.gray[925]};
`;
