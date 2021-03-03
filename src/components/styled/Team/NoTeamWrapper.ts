import styled from "styled-components";
import { theme } from "../theme";

// className="text-2xl font-bold  flex flex-col items-center p-4"
export const NoTeamWrapper = styled.div`
  font-size: ${theme.fontSize["2xl"]};
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  justify-content: center;
  padding: 1rem;
  @media (max-width: ${theme.screens.md}) {
    flex-direction: column;
    align-items: center;
  }
`;
