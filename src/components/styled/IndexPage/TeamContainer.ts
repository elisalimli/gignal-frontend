import styled from "styled-components";
import { theme } from "../theme";

export const TeamContainer = styled.a`

  min-width:185px;
  min-height:175px;
  background: ${theme.colors.white};
  transition: all 1s;
  background-radius:${theme.borderRadius.md}
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius:${theme.borderRadius.md};
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  cursor:pointer;
  padding:1rem;
  color:${theme.colors.gray[900]};
  &:hover {
    background: ${theme.colors.gray[300]};
  }
  @media(max-width:${theme.screens.md}){
    min-width: 245px;
  }
  @media(max-width:${theme.screens.smormd}){
    width: 95%;
    margin: 0 auto;
  }
  `;
