import styled, { StyledFunction } from "styled-components";
import { theme } from "./theme";

interface Props {
  w: string;
  h: string;
}
const wrapper: StyledFunction<Props> = styled.span;

export const IconWrapper = wrapper`
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  width:${(props) => props.w};
  height:${(props) => props.h};
  border-radius: ${theme.borderRadius.md};
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

`;
