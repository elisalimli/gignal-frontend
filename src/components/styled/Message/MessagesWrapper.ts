import styled from "styled-components";

export const MessagesWrapper = styled.div`
  background-color: #ffffff;
  grid-column: 3;
  grid-row: 2;
  overflow-y: auto;
  padding: 1.25rem;
  @media (max-width: 568px) {
    height: 100vh;
  }
` as any;
