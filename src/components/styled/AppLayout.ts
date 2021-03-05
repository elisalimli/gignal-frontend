import styled from "styled-components";

export const AppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;

  @media (max-width: 568px) {
    min-height: 100vh;
  }

  @media (max-width: 800px) {
    grid-template-columns: 80px 170px 1fr;
  }
`;
