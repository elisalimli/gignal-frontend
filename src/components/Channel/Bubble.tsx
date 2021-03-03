import React from "react";
import styled from "styled-components";

const Green = styled.span`
  color: #38978d;
`;

interface Props {
  on?: boolean;
}

const Bubble: React.FC<Props> = ({ on = true }) => {
  return (
    <span style={{ marginRight: "0.25rem" }}>
      {on ? <Green>●</Green> : "○"}
    </span>
  );
};

export default Bubble;
